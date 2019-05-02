export const getSelectAllItems = (filteredItems, selectedItems, items) => {
  const sourceItems = items.filter(
    item =>
      filteredItems.find(
        filteredItem => item.id === filteredItem.id && !item.disabled
      ) || selectedItems.find(selectedItem => item.id === selectedItem.id)
  );
  const destinationItems = selectedItems.filter(
    selectedItem =>
      !filteredItems.find(
        filteredItem => selectedItem.id === filteredItem.id
      ) && !items.find(item => selectedItem.id === item.id)
  );

  return [...destinationItems, ...sourceItems];
};
