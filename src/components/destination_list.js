import React from "react";
import PropTypes from "prop-types";
import { List } from "react-virtualized/dist/commonjs/List";

import Column from "./column/column";
import ItemsList from "./list/items_list";
import NoItems from "./items/no_items";
import SelectedItem from "./items/selected_item";
import SelectionStatus from "./selection_status/selection_status";
import { groupItems } from "./item_grouping_util";
import Search from "./search/search";
import withDestenation from "./with_search_destenation";
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
  onChange,
  searchValue
}) => {
  const SelectionStatusRenderer = selectionStatusRenderer;

  const updatedSelectedItems = withGrouping
    ? groupItems(selectedItems)
    : selectedItems;

  return (
    <Column>
      {showRightSearch && (
        <Search
          onChange={onChange}
          searchIcon={searchIcon}
          value={searchValue}
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
        onClick={id => unselectItems([id])}
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
  searchIcon: PropTypes.string,
  selectedItems: PropTypes.array
};

DestinationList.defaultProps = {
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

export default withDestenation(DestinationList);
