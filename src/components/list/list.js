import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List } from "react-virtualized/dist/commonjs/List";

import styles from "./list.scss";
import Item from "../items/item";
import NoItems from "../items/no_items";

class InnerList extends PureComponent {
  static propTypes = {
    renderer: PropTypes.any,
    listRenderer: PropTypes.any,
    noItemsRenderer: PropTypes.any,
    itemHeight: PropTypes.number,
    height: PropTypes.number,
    offset: PropTypes.number,
    onClick: PropTypes.func,
    selectGroup: PropTypes.func,
    withGroupClick: PropTypes.bool,
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    items: PropTypes.array,
    disabled: PropTypes.bool,
    disabledItemsTooltip: PropTypes.string,
    isLocked: PropTypes.func
  };

  static defaultProps = {
    renderer: Item,
    listRenderer: List,
    noItemsRenderer: NoItems,
    itemHeight: 40,
    height: 400,
    offset: 0,
    selectedIds: [],
    items: [],
    disabled: false
  };

  constructor(props) {
    super(props);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.noRowsRenderer = this.noRowsRenderer.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event, id, disabled) {
    const { onClick, selectedIds } = this.props;
    const checked = selectedIds.includes(id);
    if ((disabled && checked) || !disabled) {
      onClick(event, id);
    }
  }

  rowRenderer({ index, key, style }) {
    const {
      renderer,
      itemHeight,
      items,
      withGroupClick,
      onClickGroup,
      selectedIds,
      disabledItemsTooltip,
      isLocked
    } = this.props;
    const Renderer = renderer;
    const item = items[index];
    const checked = selectedIds.includes(item.id);
    const disabled = (this.props.disabled && !checked) || isLocked(item);

    return (
      <div
        key={key}
        style={style}
        className={`${styles.list_item} rms-list_item`}
        onClick={event =>
          item.isGroup && withGroupClick
            ? onClickGroup(item.id)
            : this.onClick(event, item.id, disabled)
        }
        title={disabled ? disabledItemsTooltip : undefined}
      >
        <Renderer
          withGroupClick={withGroupClick}
          item={item}
          group={item.isGroup}
          height={itemHeight}
          checked={checked}
          disabled={disabled}
        />
      </div>
    );
  }

  noRowsRenderer() {
    const { noItemsMessage, noItemsRenderer } = this.props;
    const NoItemsRenderer = noItemsRenderer;
    return <NoItemsRenderer noItemsMessage={noItemsMessage} />;
  }

  render() {
    const {
      height,
      itemHeight,
      items,
      offset,
      width,
      getlistRef,
      listRenderer
    } = this.props;
    const ListRenderer = listRenderer;
    return (
      <ListRenderer
        ref={getlistRef}
        className={`${styles.list} rms-list`}
        rowRenderer={this.rowRenderer}
        noRowsRenderer={this.noRowsRenderer}
        width={width - offset}
        rowHeight={itemHeight}
        height={height}
        items={items}
        rowCount={items.length}
      />
    );
  }
}

export default InnerList;
