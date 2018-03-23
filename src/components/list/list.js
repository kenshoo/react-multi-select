import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";
import { List } from "react-virtualized/dist/commonjs/List";

import styles from "./list.scss";
import Item from "../items/item";
import NoItems from "../items/no_items";

class ItemsList extends PureComponent {
  static propTypes = {
    renderer: PropTypes.any,
    noItemsRenderer: PropTypes.any,
    itemHeight: PropTypes.number,
    height: PropTypes.number,
    offset: PropTypes.number,
    onClick: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.number),
    items: PropTypes.array
  };

  static defaultProps = {
    renderer: Item,
    noItemsRenderer: NoItems,
    itemHeight: 40,
    height: 400,
    offset: 0,
    selectedIds: [],
    items: []
  };

  constructor(props) {
    super(props);
    this.rowRenderer = this.rowRenderer.bind(this);
    this.noRowsRenderer = this.noRowsRenderer.bind(this);
    this.update = this.update.bind(this);
  }

  update() {
    this.listRef.forceUpdateGrid();
  }

  rowRenderer({ index, isScrolling, key, style }) {
    const { renderer, itemHeight, onClick, items, selectedIds } = this.props;
    const Renderer = renderer;
    const item = items[index];
    const checked = selectedIds.includes(item.id);
    return (
      <div
        key={key}
        style={style}
        className={styles.list_item}
        onClick={() => onClick(item.id)}
      >
        <Renderer item={item} height={itemHeight} checked={checked} />
      </div>
    );
  }

  noRowsRenderer() {
    const { noItemsMessage, noItemsRenderer } = this.props;
    const NoItemsRenderer = noItemsRenderer;
    return <NoItemsRenderer noItemsMessage={noItemsMessage} />;
  }

  render() {
    const { height, itemHeight, items, offset } = this.props;
    return (
      <AutoSizer>
        {({ width }) => (
          <List
            ref={ref => (this.listRef = ref)}
            className={styles.list}
            rowRenderer={this.rowRenderer}
            noRowsRenderer={this.noRowsRenderer}
            width={width - offset}
            rowHeight={itemHeight}
            height={height}
            rowCount={items.length}
          />
        )}
      </AutoSizer>
    );
  }
}

export default ItemsList;
