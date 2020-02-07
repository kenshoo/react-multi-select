import React from "react";
import PropTypes from "prop-types";
import { List } from "react-virtualized/dist/commonjs/List";

import Column from "./column/column";
import ItemsList from "./list/items_list";
import NoItems from "./items/no_items";
import SelectedItem from "./items/selected_item";
import SelectionStatus from "./selection_status/selection_status";
import { groupItems } from "./item_grouping_util";
import withSearch from "./with_search";

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
  unselectGroup,
  withGroupClick,
  filteredItems,
  children,
  isLocked
}) => {
  const SelectionStatusRenderer = selectionStatusRenderer;
  const updatedSelectedItems = withGrouping
    ? groupItems(filteredItems, withGroupClick)
    : filteredItems;

  return (
    <Column>
      {children}
      <SelectionStatusRenderer
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
        onClickGroup={unselectGroup}
        renderer={selectedItemRenderer}
        withGroupClick={withGroupClick}
        noItemsRenderer={noItemsRenderer}
        noItemsMessage={messages.noItemsMessage}
        isLocked={isLocked}
      />
    </Column>
  );
};

DestinationList.propTypes = {
  selectionStatusRenderer: PropTypes.any,
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  clearAll: PropTypes.func,
  messages: PropTypes.object,
  itemHeight: PropTypes.number,
  height: PropTypes.number,
  unselectItems: PropTypes.func,
  selectedItemRenderer: PropTypes.any,
  noItemsRenderer: PropTypes.any,
  withGrouping: PropTypes.bool,
  filteredItems: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  isLocked: PropTypes.func
};

DestinationList.defaultProps = {
  listRenderer: List,
  selectionStatusRenderer: SelectionStatus,
  selectedIds: [],
  messages: {},
  itemHeight: 40,
  height: 400,
  selectedItemRenderer: SelectedItem,
  noItemsRenderer: NoItems,
  withGrouping: false,
  filteredItems: []
};

export { DestinationList };
export default withSearch(DestinationList);
