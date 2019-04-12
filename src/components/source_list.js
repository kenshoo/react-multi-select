import React from "react";
import PropTypes from "prop-types";
import { List } from "react-virtualized/dist/commonjs/List";

import Search from "./search/search";
import ItemsList from "./list/items_list";
import NoItems from "./items/no_items";

import SelectAll from "./items/select_all";
import Item from "./items/item";
import { groupItems } from "./item_grouping_util";
import withSearch from "./with_search";
const SourceList = ({
  searchRenderer,
  selectAllRenderer,
  messages,
  showSelectAll,
  itemHeight,
  selectAllHeight,
  selectAllItems,
  isAllSelected,
  selectedIds,
  itemRenderer,
  getList,
  filteredItems,
  calculatedHeight,
  selectItem,
  noItemsRenderer,
  disabled,
  withGrouping,
  listRenderer
}) => {
  const SelectAllRenderer = selectAllRenderer;
  const updatedFilteredItems = withGrouping
    ? groupItems(filteredItems)
    : filteredItems;
  return (
    <>
      {showSelectAll && (
        <SelectAllRenderer
          height={selectAllHeight ? selectAllHeight : itemHeight}
          onClick={selectAllItems}
          isAllSelected={isAllSelected}
          selectedIds={selectedIds}
          renderer={itemRenderer}
          selectAllMessage={messages.selectAllMessage}
        />
      )}
      <ItemsList
        ref={getList}
        offset={1}
        items={updatedFilteredItems}
        itemHeight={itemHeight}
        height={calculatedHeight}
        onClick={selectItem}
        selectedIds={selectedIds}
        renderer={itemRenderer}
        listRenderer={listRenderer}
        noItemsRenderer={noItemsRenderer}
        noItemsMessage={messages.noItemsMessage}
        disabled={disabled}
        disabledItemsTooltip={messages.disabledItemsTooltip}
      />
    </>
  );
};

SourceList.propTypes = {
  searchRenderer: PropTypes.any,
  selectAllRenderer: PropTypes.any,
  noItemsRenderer: PropTypes.any,
  itemRenderer: PropTypes.any,
  searchIcon: PropTypes.any,
  showSearch: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  isAllSelected: PropTypes.bool,
  filterItems: PropTypes.func,
  messages: PropTypes.object,
  itemHeight: PropTypes.number,
  selectAllHeight: PropTypes.number,
  calculatedHeight: PropTypes.number,
  filteredItems: PropTypes.array,
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  selectAllItems: PropTypes.func,
  getList: PropTypes.func,
  selectItem: PropTypes.func,
  disabled: PropTypes.bool,
  withGrouping: PropTypes.bool,
  listRenderer: PropTypes.func
};

SourceList.defaultProps = {
  searchRenderer: Search,
  selectAllRenderer: SelectAll,
  noItemsRenderer: NoItems,
  itemRenderer: Item,
  listRenderer: List,
  showSearch: true,
  showSelectAll: true,
  isAllSelected: false,
  calculatedHeight: 400,
  itemHeight: 40,
  selectedIds: [],
  filteredItems: [],
  messages: {},
  disabled: false,
  withGrouping: false
};

export default withSearch(SourceList);
