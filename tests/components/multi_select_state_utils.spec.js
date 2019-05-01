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

describe("testing utils for multi select state", () => {
  test("filter items by id", () => {
    const filterItems = items.filter(findItemByIds(ids));
    expect(filterItems).toEqual([
      { id: 2, label: "item-2" },
      { id: 3, label: "item-3" }
    ]);
  });

  test("testing all items select", () => {
    const allSelectedItems = getSelectAllItems(
      filteredItems,
      selectedItems,
      items
    );
    expect(allSelectedItems).toEqual(selectedItems);
  });
});
