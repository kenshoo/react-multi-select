const matchItemById = id => item => id === item.id;

const getItemById = (id, selectedItems) =>
  selectedItems.find(matchItemById(id));

const isFilteredEnabled = (item, filteredItems) =>
  filteredItems.find(
    filteredItem => item.id === filteredItem.id && !item.disabled
  );

const getSourceItems = (filteredItems, selectedItems, items) =>
  items.filter(
    item =>
      isFilteredEnabled(item, filteredItems) ||
      getItemById(item.id, selectedItems)
  );

const getDestinationItems = (filteredItems, selectedItems, items) =>
  selectedItems.filter(
    selectedItem =>
      !getItemById(selectedItem.id, filteredItems) &&
      !getItemById(selectedItem.id, items)
  );

export const findItemByIds = ids => item =>
  ids.find(id => id === item.id) === undefined;

export const getSelectAllItems = (filteredItems, selectedItems, items) => {
  const sourceItems = getSourceItems(filteredItems, selectedItems, items);
  const destinationItems = getDestinationItems(
    filteredItems,
    selectedItems,
    items
  );

  return [...destinationItems, ...sourceItems];
};
