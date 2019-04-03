import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List } from "react-virtualized/dist/commonjs/List";

import Column from "./column/column";
import ItemsList from "./list/items_list";
import NoItems from "./items/no_items";
import SelectedItem from "./items/selected_item";
import SelectionStatus from "./selection_status/selection_status";
import { groupItems } from "./item_grouping_util";
import Search from "./search/search";

const DestinationList = ({
  selectionStatusRenderer,
  selectedIds,
  clearAll,
  messages,
  itemHeight,
  height,
  unselectItems,
  selectedItemRenderer,
  noItemsRenderer,
  withGrouping,

  showRightSearch,
  searchIcon,
  selectedItems,
  serchRightValue,
  serchRightValueChange,
  filterRightSearch
}) => {
  const SelectionStatusRenderer = selectionStatusRenderer;

  let filterSelectitems = selectedItems;
  if (serchRightValue && serchRightValue.length > -1) {
    filterSelectitems = filterRightSearch(selectedItems, serchRightValue);
  }

  const updatedSelectedItems = withGrouping
    ? groupItems(filterSelectitems)
    : filterSelectitems;

  return (
    <Column>
      {showRightSearch && (
        <Search
          onChange={serchRightValueChange}
          searchIcon={searchIcon}
          value={serchRightValue}
          searchPlaceholder={messages.searchPlaceholder}
        />
      )}
      <SelectionStatusRenderer
        showRightSearch={showRightSearch}
        selected={selectedIds}
        clearAll={clearAll}
        clearAllMessage={messages.clearAllMessage}
        selectedMessage={messages.selectedMessage}
        noneSelectedMessage={messages.noneSelectedMessage}
      />
      <ItemsList
        items={updatedSelectedItems}
        itemHeight={itemHeight}
        height={height - 45}
        onClick={(event, id) => unselectItems([id])}
        renderer={selectedItemRenderer}
        noItemsRenderer={noItemsRenderer}
        noItemsMessage={messages.noItemsMessage}
      />
    </Column>
  );
};

DestinationList.propTypes = {
  selectionStatusRenderer: PropTypes.any,
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  clearAll: PropTypes.func,
  messages: PropTypes.object,
  selectedItems: PropTypes.array,
  itemHeight: PropTypes.number,
  height: PropTypes.number,
  unselectItems: PropTypes.func,
  selectedItemRenderer: PropTypes.any,
  noItemsRenderer: PropTypes.any,
  withGrouping: PropTypes.bool,
  showRightSearch: PropTypes.bool,
  searchIcon: PropTypes.object,
  selectedItems: PropTypes.array,
  serchRightValue: PropTypes.string,
  serchRightValueChang: PropTypes.func
};

DestinationList.defaultProps = {
  filterRightSearch: (selectedItems, serchRightValue) =>
    selectedItems.filter(item =>
      item.label.toLowerCase().match(serchRightValue)
    ),
  listRenderer: List,
  selectionStatusRenderer: SelectionStatus,
  selectedIds: [],
  messages: {},
  selectedItems: [],
  itemHeight: 40,
  height: 400,
  selectedItemRenderer: SelectedItem,
  noItemsRenderer: NoItems,
  withGrouping: false
};

export default DestinationList;
