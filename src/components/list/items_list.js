import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";

import InnerList from "./list";

class ItemsList extends PureComponent {
  static propTypes = {
    renderer: PropTypes.any,
    listRenderer: PropTypes.any,
    noItemsRenderer: PropTypes.any,
    itemHeight: PropTypes.number,
    height: PropTypes.number,
    offset: PropTypes.number,
    onClick: PropTypes.func,
    onClickGroup: PropTypes.func,
    withGroupClick: PropTypes.bool,
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    items: PropTypes.array,
    disabled: PropTypes.bool,
    disabledItemsTooltip: PropTypes.string,
    isLocked: PropTypes.func
  };

  static defaultProps = {
    itemHeight: 40,
    height: 400,
    offset: 0,
    selectedIds: [],
    items: [],
    disabled: false
  };

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.getlistRef = this.getlistRef.bind(this);
  }

  update() {
    if (this.listRef) {
      this.listRef.forceUpdateGrid();
    }
  }

  componentDidUpdate() {
    this.update();
  }

  getlistRef(ref) {
    this.listRef = ref;
  }

  render() {
    const {
      height,
      itemHeight,
      items,
      offset,
      noItemsMessage,
      noItemsRenderer,
      renderer,
      listRenderer,
      selectedIds,
      onClickGroup,
      withGroupClick,
      onClick,
      disabled,
      disabledItemsTooltip,
      isLocked
    } = this.props;
    return (
      <AutoSizer>
        {({ width }) => (
          <InnerList
            getlistRef={this.getlistRef}
            rowRenderer={this.rowRenderer}
            noRowsRenderer={this.noRowsRenderer}
            width={width - offset}
            rowHeight={itemHeight}
            height={height}
            rowCount={items.length}
            noItemsMessage={noItemsMessage}
            noItemsRenderer={noItemsRenderer}
            renderer={renderer}
            listRenderer={listRenderer}
            itemHeight={itemHeight}
            onClick={onClick}
            onClickGroup={onClickGroup}
            withGroupClick={withGroupClick}
            items={items}
            selectedIds={selectedIds}
            disabled={disabled}
            disabledItemsTooltip={disabledItemsTooltip}
            isLocked={isLocked}
          />
        )}
      </AutoSizer>
    );
  }
}

export default ItemsList;
