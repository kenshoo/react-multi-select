import {
  filterUnselectedByIds,
  getSelectedByAllItems,
  getSelectedItemsOutsideInterval,
  getAvailableIntervalForSelection
} from "../../src/components/multi_select_state_utils";

const items = [
  { id: 0, label: "item-0" },
  { id: 1, label: "item-1" },
  { id: 2, label: "item-2" },
  { id: 3, label: "item-3" }
];

const ids = [0, 1];

const itemsToSelect = [{ id: 0, label: "item-0" }, { id: 1, label: "item-1" }];

const selectedItems = [
  { id: 0, label: "item-0" },
  { id: 1, label: "item-1" },
  { id: 2, label: "item-2" }
];
const disabledItems = [
  { id: 4, label: "item-4", disabled: true },
  { id: 5, label: "item-5", disabled: true }
];

describe("testing utils for multi select state", () => {
  test("filter items by id", () => {
    const isLocked = item => item.disabled;
    const filterItems = filterUnselectedByIds(items, ids, isLocked);
    expect(filterItems).toEqual([items[2], items[3]]);
  });

  test("testing all items select", () => {
    const allSelectedItems = getSelectedByAllItems(
      itemsToSelect,
      selectedItems,
      items
    );
    expect(allSelectedItems).toEqual(selectedItems);
  });

  test("testing all select case items have disabled", () => {
    const allSelectedItems = getSelectedByAllItems(
      itemsToSelect,
      selectedItems,
      [...items, ...disabledItems]
    );
    expect(allSelectedItems).toEqual(selectedItems);
  });

  test("not itemsToSelect", () => {
    const allSelectedItems = getSelectedByAllItems([], selectedItems, items);
    expect(allSelectedItems).toEqual(selectedItems);
  });

  test("not selectedItems", () => {
    const allSelectedItems = getSelectedByAllItems(itemsToSelect, [], items);
    expect(allSelectedItems).toEqual(itemsToSelect);
  });

  test("itemsToSelect is disabled", () => {
    const allSelectedItems = getSelectedByAllItems(
      disabledItems,
      selectedItems,
      items
    );
    expect(allSelectedItems).toEqual(selectedItems);
  });

  test("not itemsToSelect and not selectedItems", () => {
    const allSelectedItems = getSelectedByAllItems(
      [],
      [],
      [...items, ...disabledItems]
    );
    expect(allSelectedItems).toEqual([]);
  });

  test("filter selectedItems that not in interval", () => {
    const selectedItemsOutsideInterval = getSelectedItemsOutsideInterval(
      items,
      selectedItems,
      { minIndex: 1, maxIndex: 3 }
    );
    expect(selectedItemsOutsideInterval.length).toEqual(1);
    expect(selectedItemsOutsideInterval[0]).toEqual(selectedItems[0]);
  });

  test("filter itemsToSelect that not in interval", () => {
    const selectedItemsOutsideInterval = getSelectedItemsOutsideInterval(
      items,
      itemsToSelect,
      { minIndex: 0, maxIndex: 3 }
    );
    expect(selectedItemsOutsideInterval.length).toEqual(0);
  });

  test("available interval when minIndex == firstItemShiftSelected", () => {
    const initialInterval = { minIndex: 0, maxIndex: 3 };
    const maxSelectedItems = 3;
    const selectedItemsOutsideInterval = 0;
    const firstItemShiftSelected = 0;
    const availableInterval = getAvailableIntervalForSelection(
      initialInterval,
      selectedItemsOutsideInterval,
      maxSelectedItems,
      firstItemShiftSelected
    );
    expect(availableInterval).toEqual({ minIndex: 0, maxIndex: 2 });
  });

  test("available interval when maxIndex == firstItemShiftSelected", () => {
    const initialInterval = { minIndex: 1, maxIndex: 3 };
    const maxSelectedItems = 3;
    const selectedItemsOutsideInterval = 1;
    const firstItemShiftSelected = 3;

    const availableInterval = getAvailableIntervalForSelection(
      initialInterval,
      selectedItemsOutsideInterval,
      maxSelectedItems,
      firstItemShiftSelected
    );
    expect(availableInterval).toEqual({ minIndex: 2, maxIndex: 3 });
  });
});
