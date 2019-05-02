import {
  findItemByIds,
  getSelectAllItems
} from "../../src/components/multi_select_state_utils";

const items = [
  { id: 0, label: "item-0" },
  { id: 1, label: "item-1" },
  { id: 2, label: "item-2" },
  { id: 3, label: "item-3" }
];

const ids = [0, 1];

const filteredItems = [{ id: 0, label: "item-0" }, { id: 1, label: "item-1" }];

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
    const filterItems = items.filter(findItemByIds(ids));
    expect(filterItems).toEqual([items[2], items[3]]);
  });

  test("testing all items select", () => {
    const allSelectedItems = getSelectAllItems(
      filteredItems,
      selectedItems,
      items
    );
    expect(allSelectedItems).toEqual(selectedItems);
  });

  test("testing all select case items have disabled", () => {
    const allSelectedItems = getSelectAllItems(filteredItems, selectedItems, [
      ...items,
      ...disabledItems
    ]);
    expect(allSelectedItems).toEqual(selectedItems);
  });

  test("not filteredItems", () => {
    const allSelectedItems = getSelectAllItems([], selectedItems, items);
    expect(allSelectedItems).toEqual(selectedItems);
  });

  test("not selectedItems", () => {
    const allSelectedItems = getSelectAllItems(filteredItems, [], items);
    expect(allSelectedItems).toEqual(filteredItems);
  });

  test("filteredItems is disabled", () => {
    const allSelectedItems = getSelectAllItems(
      disabledItems,
      selectedItems,
      items
    );
    expect(allSelectedItems).toEqual(selectedItems);
  });

  test("not filteredItems and not selectedItems", () => {
    const allSelectedItems = getSelectAllItems(
      [],
      [],
      [...items, ...disabledItems]
    );
    expect(allSelectedItems).toEqual([]);
  });
});
