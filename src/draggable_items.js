import React, { PureComponent } from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import DragDropContext from "../dragndropcontext/dragndrop_context";
import DraggableItem from "../draggableitem/draggable_item";
import { PLACEHOLDER_ID } from "./multiselection_list.constants";

import styles from "./draggable_items.scss";

class DraggableItems extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { placeholderIndex: null };

    this.isForbiddenIndex = this.isForbiddenIndex.bind(this);
    this.onHoverLoose = this.onHoverLoose.bind(this);
    this.onItemEndDrag = this.onItemEndDrag.bind(this);
    this.onItemDragHover = this.onItemDragHover.bind(this);
    this.onItemDragDrop = this.onItemDragDrop.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ placeholderIndex: null });
  }

  onItemDragHover(dragIndex, hoverIndex) {
    const { placeholderIndex } = this.state;
    if (!this.isForbiddenIndex(hoverIndex) && placeholderIndex !== hoverIndex) {
      this.setState({ placeholderIndex: hoverIndex });
    }
  }

  onItemEndDrag() {
    this.setState({ placeholderIndex: null });
  }

  onItemDragDrop() {
    const hoverIndex = this.state.placeholderIndex;
    if (hoverIndex != null) {
      this.props.dragSelectedItems(hoverIndex);
    }
  }

  onHoverLoose(index) {
    const hoverIndex = this.state.placeholderIndex;
    if (hoverIndex == index) {
      this.setState({ placeholderIndex: null });
    }
  }

  isForbiddenIndex(targetIndex) {
    const { items, isItemLockedFn } = this.props;
    const lockedItemsCount = items.filter(isItemLockedFn).length;

    if (targetIndex < lockedItemsCount) {
      return true;
    }

    const forbiddenIndeces = this.getForbiddenHoverIndexes();
    return forbiddenIndeces.includes(targetIndex);
  }

  getForbiddenHoverIndexes() {
    const { selected, items } = this.props;

    const selectionNeighbors = selected.reduce((result, itemId) => {
      const selectedIndex = items.findIndex(item => item.id == itemId);
      return result.concat(selectedIndex, selectedIndex + 1);
    }, []);

    return Array.from(new Set(selectionNeighbors));
  }

  placeholderDisplayFn() {
    return <li key={PLACEHOLDER_ID} className={styles.item_placeholder} />;
  }

  renderItem(item, index) {
    const { itemDisplayFn, isItemLockedFn } = this.props;
    const isDraggable = !isItemLockedFn(item);
    const displayFn = item.isPlaceholder
      ? this.placeholderDisplayFn
      : itemDisplayFn;

    return (
      <DraggableItem
        key={item.id}
        item={item}
        index={index}
        displayFn={displayFn}
        isDraggable={isDraggable}
        onItemDragHover={this.onItemDragHover}
        onItemEndDrag={this.onItemEndDrag}
        onItemDragDrop={this.onItemDragDrop}
        onHoverLoose={this.onHoverLoose}
        isForbiddenIndex={this.isForbiddenIndex}
      />
    );
  }

  renderItems() {
    const itemsToShow = [...this.props.items];

    if (this.state.placeholderIndex) {
      const { placeholderIndex } = this.state;
      const placeholder = { id: PLACEHOLDER_ID, isPlaceholder: true };
      itemsToShow.splice(placeholderIndex, 0, placeholder);
    }

    return itemsToShow.map((item, index) => this.renderItem(item, index));
  }

  render() {
    return <ul className={styles.list_items}>{this.renderItems()}</ul>;
  }
}

export default DragDropContext(DraggableItems);
