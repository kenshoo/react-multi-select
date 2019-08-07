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

const notContainsId = (ids, item) =>
  ids.find(id => id === item.id) === undefined;

export const filterUnselectedByIds = (items, ids, isLocked) =>
  items.filter(item => notContainsId(ids, item) || isLocked(item));

export const getSelectedByAllItems = (itemsToSelect, selectedItems, items) => {
  const sourceItems = getSourceItems(itemsToSelect, selectedItems, items);
  const destinationItems = getDestinationItems(
    itemsToSelect,
    selectedItems,
    items
  );

  return [...destinationItems, ...sourceItems];
};

export const getMinMaxIndexes = (
  currentIndex,
  firstItemShiftSelected,
  items,
  selectedItems,
  maxSelected
) => {
  const outsideSelected = getSelectedItemsOutsideInterval(
    currentIndex,
    firstItemShiftSelected,
    items,
    selectedItems
  ).length;
  const shouldBeSelect =
    outsideSelected + Math.abs(firstItemShiftSelected - currentIndex) + 1;

  if (maxSelected && maxSelected <= shouldBeSelect) {
    const availableToSelect = maxSelected - outsideSelected - 1;
    return firstItemShiftSelected > currentIndex
      ? {
          minIndex: firstItemShiftSelected - availableToSelect,
          maxIndex: firstItemShiftSelected
        }
      : {
          minIndex: firstItemShiftSelected,
          maxIndex: firstItemShiftSelected + availableToSelect
        };
  }
  return getInputInterval(currentIndex, firstItemShiftSelected);
};

const getInputInterval = (currentIndex, firstItemShiftSelected) =>
  firstItemShiftSelected > currentIndex
    ? { minIndex: currentIndex, maxIndex: firstItemShiftSelected }
    : { minIndex: firstItemShiftSelected, maxIndex: currentIndex };

export const getSelectedItemsOutsideInterval = (
  currentIndex,
  firstItemShiftSelected,
  sourceItems,
  selectedItems
) => {
  const interval = getInputInterval(currentIndex, firstItemShiftSelected);
  return selectedItems.filter(selectedItem => {
    const index = sourceItems.findIndex(item => item.id === selectedItem.id);
    return !isWithin(index, interval) || selectedItem.disabled;
  });
};

export const isWithin = (index, { minIndex, maxIndex }) =>
  index >= minIndex && index <= maxIndex;

export const getNewSelectedItems = (itemId, items, selectedItems) => {
  const sourceItems = items.filter(
    item => item.id === itemId || findItem(item, selectedItems)
  );
  const destinationItems = selectedItems.filter(
    selectedItem => !findItem(selectedItem, items)
  );
  return [...destinationItems, ...sourceItems];
};
