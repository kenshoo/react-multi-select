import React from "react";
import PropTypes from "prop-types";

import Column from "./column/column";
import List from "./list/list";
import NoItems from "./items/no_items";
import Search from "./search/search";
import SelectAll from "./items/select_all";
import Item from "./items/item";

const SourceList = ({
  searchRenderer,
  selectAllRenderer,
  showSearch,
  filterItems,
  searchIcon,
  messages,
  showSelectAll,
  itemHeight,
  selectAllItems,
  isAllSelected,
  selectedIds,
  itemRenderer,
  getList,
  filteredItems,
  calculatedHeight,
  selectItem,
  noItemsRenderer
}) => {
  const SearchRenderer = searchRenderer;
  const SelectAllRenderer = selectAllRenderer;
  return (
    <Column>
      {showSearch && (
        <SearchRenderer
          onChange={filterItems}
          searchIcon={searchIcon}
          searchPlaceholder={messages.searchPlaceholder}
        />
      )}
      {showSelectAll && (
        <SelectAllRenderer
          height={itemHeight}
          onClick={selectAllItems}
          isAllSelected={isAllSelected}
          selectedIds={selectedIds}
          renderer={itemRenderer}
          selectAllMessage={messages.selectAllMessage}
        />
      )}
      <List
        ref={getList}
        offset={1}
        items={filteredItems}
        itemHeight={itemHeight}
        height={calculatedHeight}
        onClick={selectItem}
        selectedIds={selectedIds}
        renderer={itemRenderer}
        noItemsRenderer={noItemsRenderer}
        noItemsMessage={messages.noItemsMessage}
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
  calculatedHeight: PropTypes.number,
  filteredItems: PropTypes.array,
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  selectAllItems: PropTypes.func,
  getList: PropTypes.func,
  selectItem: PropTypes.func
};

SourceList.defaultProps = {
  searchRenderer: Search,
  selectAllRenderer: SelectAll,
  noItemsRenderer: NoItems,
  itemRenderer: Item,
  showSearch: true,
  showSelectAll: true,
  isAllSelected: false,
  calculatedHeight: 400,
  itemHeight: 40,
  selectedIds: [],
  filteredItems: []
};

export default SourceList;
