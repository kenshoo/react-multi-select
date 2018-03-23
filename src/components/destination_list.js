import React from "react";
import PropTypes from "prop-types";

import Column from "./column/column";
import List from "./list/items_list";
import NoItems from "./items/no_items";
import SelectedItem from "./items/selected_item";
import SelectionStatus from "./selection_status/selection_status";

const DestinationList = ({
  selectionStatusRenderer,
  selectedIds,
  clearAll,
  messages,
  selectedItems,
  itemHeight,
  height,
  unselectItem,
  selectedItemRenderer,
  noItemsRenderer
}) => {
  const SelectionStatusRenderer = selectionStatusRenderer;
  return (
    <Column>
      <SelectionStatusRenderer
        selected={selectedIds}
        clearAll={clearAll}
        clearAllMessage={messages.clearAllMessage}
        selectedMessage={messages.selectedMessage}
        noneSelectedMessage={messages.noneSelectedMessage}
      />
      <List
        items={selectedItems}
        itemHeight={itemHeight}
        height={height - 45}
        onClick={unselectItem}
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
  unselectItem: PropTypes.func,
  selectedItemRenderer: PropTypes.any,
  noItemsRenderer: PropTypes.any
};

DestinationList.defaultProps = {
  selectionStatusRenderer: SelectionStatus,
  selectedIds: [],
  messages: {},
  selectedItems: [],
  itemHeight: 40,
  height: 400,
  selectedItemRenderer: SelectedItem,
  noItemsRenderer: NoItems
};

export default DestinationList;
