import intersectionBy from "lodash/intersectionBy";

export const PARTIAL = "partial";

export const isAllSelected = (selected, items) => {
  const intersection = intersectionBy(
    selected,
    items,
    item => (typeof item === "object" ? item.id : item)
  );

  if (!intersection.length) {
    return false;
  } else if (intersection.length === items.length) {
    return true;
  } else {
    return PARTIAL;
  }
};
