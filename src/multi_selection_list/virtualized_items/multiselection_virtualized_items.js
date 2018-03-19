import React, { PureComponent } from "react";
import styles from "./multiselection_virtualized_items.scss";
import { AutoSizer, List } from "react-virtualized";
import PropTypes from "prop-types";

export const OVERSCAN_ROW_COUNT = 10;

export default class VirtualizedListItems extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      listHeight: this.props.listHeight,
      listRowHeight: this.props.listRowHeight,
      overscanRowCount: OVERSCAN_ROW_COUNT,
      rowCount: this.props.items.length,
      scrollToIndex: undefined,
      showScrollingPlaceholder: false,
      useDynamicRowHeight: false
    };

    this.noRowsRenderer = this.noRowsRenderer.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
  }
  triggerForceUpdateGrid() {
    this.listRef.forceUpdateGrid();
  }

  noRowsRenderer() {
    return <div className={styles.no_items}>{this.props.emptyText}</div>;
  }

  rowRenderer({ index, isScrolling, key, style }) {
    const item = this.props.items[index];

    return (
      <div className={styles.row} key={key} style={style}>
        {this.props.itemDisplayFn(item)}
      </div>
    );
  }

  render() {
    const { listHeight, listRowHeight, overscanRowCount } = this.state;

    const rowCount = this.props.items.length;

    return (
      <div>
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              ref={list => {
                this.listRef = list;
              }}
              className={styles.list_item}
              height={listHeight}
              overscanRowCount={overscanRowCount}
              noRowsRenderer={this.noRowsRenderer}
              rowCount={rowCount}
              rowHeight={listRowHeight}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

VirtualizedListItems.propTypes = {
  listHeight: PropTypes.number.isRequired,
  listRowHeight: PropTypes.number.isRequired
};

VirtualizedListItems.defaultProps = {
  items: []
};
