import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";

import InnerList from "./list";

class ItemsList extends PureComponent {
  static propTypes = {
    renderer: PropTypes.any,
    noItemsRenderer: PropTypes.any,
    itemHeight: PropTypes.number,
    height: PropTypes.number,
    offset: PropTypes.number,
    onClick: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    items: PropTypes.array,
    disabled: PropTypes.bool
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
    this.listRef.forceUpdateGrid();
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
      selectedIds,
      onClick,
      disabled
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
            itemHeight={itemHeight}
            onClick={onClick}
            items={items}
            selectedIds={selectedIds}
            disabled={disabled}
          />
        )}
      </AutoSizer>
    );
  }
}

export default ItemsList;
