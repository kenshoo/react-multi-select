export const custom_messages = {
  searchPlaceholder: "Find...",
  noItemsMessage: "No entries available...",
  noneSelectedMessage: "Nothing",
  selectedMessage: "Checked",
  selectAllMessage: "Check all",
  clearAllMessage: "Uncheck all"
};

const generateItems = (size, numberDisabled) =>
  Array.apply(null, { length: size }).map((i, index) => ({
    id: index,
    label: `Item ${index}`,
    disabled: index < numberDisabled && true
  }));

const generateItemsWithGroups = (size, groupSize) =>
  Array.apply(null, { length: size }).map((i, index) => ({
    id: index,
    label: `Item ${index}`,
    group: `Group ${Math.floor(index / groupSize)}`
  }));

const generateImages = size =>
  Array.apply(null, { length: size }).map((i, index) => ({
    id: index,
    label: `Item ${index}`,
    img: `https://picsum.photos/600/400?image=${index * 10}`
  }));

export const items = generateItems(50);

export const images = generateImages(10);

export const manyItems = generateItems(7000);

export const withDisabledItems = generateItems(10).map((i, index) => ({
  ...i,
  disabled: index % 5 === 0
}));

export const itemsWithGroups = generateItemsWithGroups(30, 4);

export const manyItemsWithGroups = generateItemsWithGroups(7000, 4);

export const disbaledItems = generateItems(50, 4);
