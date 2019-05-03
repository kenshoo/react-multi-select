export const findItem = ({ id }, items) => items.find(item => id === item.id);

const shouldSelectItem = (item, itemsToSelect) =>
  !item.disabled && findItem(item, itemsToSelect);

const getSourceItems = (itemsToSelect, selectedItems, items) =>
  items.filter(
    item =>
      shouldSelectItem(item, itemsToSelect) || findItem(item, selectedItems)
  );

const getDestinationItems = (itemsToSelect, selectedItems, items) =>
  selectedItems.filter(
    selectedItem =>
      !findItem(selectedItem, itemsToSelect) && !findItem(selectedItem, items)
  );

const containsId = (ids, item) => ids.find(id => id === item.id) === undefined;

export const filterByIds = (items, ids) =>
  items.filter(item => containsId(ids, item));

export const getSelectedByAllItems = (itemsToSelect, selectedItems, items) => {
  const sourceItems = getSourceItems(itemsToSelect, selectedItems, items);
  const destinationItems = getDestinationItems(
    itemsToSelect,
    selectedItems,
    items
  );

  return [...destinationItems, ...sourceItems];
};
