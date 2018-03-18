import React, { PureComponent } from "react";
import ListGroup from "./multiselection_group";
import DraggableItems from "./draggable_items";
import PropTypes from "prop-types";

import styles from "./multiselection_items.scss";

class ListItems extends PureComponent {
  itemsWithGroupsReducer(accumulator, group) {
    const {
      items,
      itemDisplayFn,
      selected,
      onSelectGroupClick,
      onDeselectGroupClick
    } = this.props;

    const groupItems = items.filter(({ id }) => group.itemIds.includes(id));
    if (groupItems.length === 0) {
      return accumulator;
    }

    const notSelectedItems = groupItems.filter(
      item => !selected.includes(item.id)
    );
    const isGroupSelected = notSelectedItems.length == 0;
    const groupLink = isGroupSelected
      ? this.props.deselectGroupLabel
      : this.props.selectGroupLabel;
    const onGroupLinkClick = isGroupSelected
      ? onDeselectGroupClick
      : onSelectGroupClick;

    return accumulator.concat([
      <ListGroup
        key={`group-${group.id}`}
        label={group.label}
        groupLink={groupLink}
        groupItemIds={group.itemIds}
        onGroupLinkClick={onGroupLinkClick}
      />,
      ...groupItems.map(item => itemDisplayFn(item))
    ]);
  }

  emptyList() {
    const { filterResultsText, emptyText, searchTerm } = this.props;
    const hasFilter = searchTerm.length;
    return (
      <div className={styles.no_items}>
        {hasFilter ? filterResultsText : emptyText}
      </div>
    );
  }

  renderListItems() {
    const { groups, itemDisplayFn } = this.props;
    if (groups && groups.length) {
      return groups.reduce(
        (accumulator, group) => this.itemsWithGroupsReducer(accumulator, group),
        []
      );
    }

    const { items } = this.props;
    return items.map(itemDisplayFn);
  }

  render() {
    const { items } = this.props;
    if (!items.length) {
      return this.emptyList();
    }

    const { withNavigation, searchTerm } = this.props;
    if (withNavigation && !searchTerm) {
      return (
        <DraggableItems
          items={items}
          selected={this.props.selected}
          dragSelectedItems={this.props.dragSelectedItems}
          itemDisplayFn={this.props.itemDisplayFn}
          itemPreviewDisplayFn={this.props.itemPreviewDisplayFn}
          isItemLockedFn={this.props.isItemLockedFn}
        />
      );
    }

    return <ul className={styles.list_items}>{this.renderListItems()}</ul>;
  }
}

ListItems.propTypes = {
  selected: PropTypes.array
};

ListItems.defaultProps = {
  selected: []
};

export default ListItems;
