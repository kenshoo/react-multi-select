import unionBy from "lodash/unionBy";

export const filterItems = value => {
  return item =>
    (item.value ? item.value : item.label ? item.label : "")
      .toLowerCase()
      .includes(value.toLowerCase());
};

export const unionItemsForListToList = (selectedIds, items, selectedItems) => {
  const allItems = selectedItems ? unionBy(selectedItems, items, "id") : items;
  return allItems.filter(item => selectedIds.includes(item.id));
};
