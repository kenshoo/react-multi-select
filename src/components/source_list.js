import React from "react";
import PropTypes from "prop-types";
import { List } from "react-virtualized/dist/commonjs/List";

import Column from "./column/column";
import ItemsList from "./list/items_list";
import NoItems from "./items/no_items";
import Search from "./search/search";
import SelectAll from "./items/select_all";
import Item from "./items/item";
import { groupItems } from "./item_grouping_util";

const SourceList = ({
  searchRenderer,
  selectAllRenderer,
  showSearch,
  filterItems,
  searchIcon,
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
  searchValue,
  withGrouping,
  listRenderer
}) => {
  const SearchRenderer = searchRenderer;
  const SelectAllRenderer = selectAllRenderer;
  const updatedFilteredItems = withGrouping
    ? groupItems(filteredItems)
    : filteredItems;
  return (
    <Column>
      {showSearch && (
        <SearchRenderer
          onChange={filterItems}
          searchIcon={searchIcon}
          value={searchValue}
          searchPlaceholder={messages.searchPlaceholder}
        />
      )}
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
    </Column>
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

export default SourceList;
