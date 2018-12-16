export const custom_messages = {
  searchPlaceholder: "Find...",
  noItemsMessage: "No entries available...",
  noneSelectedMessage: "Nothing",
  selectedMessage: "Checked",
  selectAllMessage: "Check all",
  clearAllMessage: "Uncheck all"
};

const generateItems = size =>
  Array.apply(null, { length: size }).map((i, index) => ({
    id: index,
    label: `Item ${index}`
  }));

const generateItemsWithGroups = (size, groupSize) =>
  Array.apply(null, { length: size }).map((i, index) => ({
    id: index,
    label: `Item ${index}`,
    group: `Group ${Math.floor(index / groupSize)}`
  }));

export const items = generateItems(50);

export const manyItems = generateItems(7000);

export const withDisabledItems = generateItems(10).map((i, index) => ({
  ...i,
  disabled: index % 5 === 0
}));

export const itemsWithGroups = generateItemsWithGroups(30, 4);

export const manyItemsWithGroups = generateItemsWithGroups(7000, 4);
