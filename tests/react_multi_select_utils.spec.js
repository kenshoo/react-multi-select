import {
  filterItems,
  unionItemsForListToList
} from "../src/components/react_multi_select_utils";

describe("react_multi_select_utils", () => {
  describe("filterItems", () => {
    const TEST_VALUE = "test value";
    const ANOTHER_VALUE = "another value";
    const EMPTY_VALUE = "";
    const ITEM_WITH_VALUE = { value: TEST_VALUE };
    const ITEM_WITH_ANOTHER_LABEL = { label: ANOTHER_VALUE };
    const ITEM_WITH_ANOTHER_VALUE = { value: ANOTHER_VALUE };
    const ITEM_WITH_LABEL = { label: TEST_VALUE };
    const EMPTY_ITEM = {};
    const ITEM_WITH_LABEL_AND_VALUE = { value: TEST_VALUE, label: TEST_VALUE };
    const ITEM_WITH_ANOTHER_LABEL_AND_VALUE = {
      value: ANOTHER_VALUE,
      label: ANOTHER_VALUE
    };
    const ITEM_WITH_MIXED_LABEL_AND_VALUE = {
      value: TEST_VALUE,
      label: ANOTHER_VALUE
    };
    const ITEM_WITH_MIXED_VALUE_AND_LABEL = {
      value: ANOTHER_VALUE,
      label: TEST_VALUE
    };

    test("return true when value is a substring of item.value", () => {
      const filterFunction = filterItems(TEST_VALUE);
      expect(filterFunction(ITEM_WITH_VALUE)).toBe(true);
    });

    test("return true when value is a substring of item.label", () => {
      const filterFunction = filterItems(TEST_VALUE);
      expect(filterFunction(ITEM_WITH_LABEL)).toBe(true);
    });

    test("return true when value is a substring of item.label and item.value", () => {
      const filterFunction = filterItems(TEST_VALUE);
      expect(filterFunction(ITEM_WITH_LABEL_AND_VALUE)).toBe(true);
    });

    test("return true when value is a substring of item.value and not item.label", () => {
      const filterFunction = filterItems(TEST_VALUE);
      expect(filterFunction(ITEM_WITH_MIXED_LABEL_AND_VALUE)).toBe(true);
    });

    test("return false when item is an empty object", () => {
      const filterFunction = filterItems(TEST_VALUE);
      expect(filterFunction(EMPTY_ITEM)).toBe(false);
    });

    test("return false when value is not a substring of item.label", () => {
      const filterFunction = filterItems(TEST_VALUE);
      expect(filterFunction(ITEM_WITH_ANOTHER_LABEL)).toBe(false);
    });

    test("return false when value is not a substring of item.value", () => {
      const filterFunction = filterItems(TEST_VALUE);
      expect(filterFunction(ITEM_WITH_ANOTHER_VALUE)).toBe(false);
    });

    test("return false when value is not a substring of item.value and item.label", () => {
      const filterFunction = filterItems(TEST_VALUE);
      expect(filterFunction(ITEM_WITH_ANOTHER_LABEL_AND_VALUE)).toBe(false);
    });

    test("return false when value is not a substring of item.label and item.value", () => {
      const filterFunction = filterItems(TEST_VALUE);
      expect(filterFunction(ITEM_WITH_MIXED_VALUE_AND_LABEL)).toBe(false);
    });

    test("return true if value is an empty string", () => {
      const filterFunction = filterItems(EMPTY_VALUE);
      expect(filterFunction(ITEM_WITH_ANOTHER_LABEL_AND_VALUE)).toBe(true);
    });
  });

  describe("unionItemsForListToList", () => {
    const ITEMS = [
      { label: "one", id: 1 },
      { label: "two", id: 2 },
      { label: "three", id: 3 }
    ];

    const SELECTED_ITEMS = [
      { label: "four", id: 4 },
      { label: "five", id: 5 },
      { label: "six", id: 6 }
    ];

    test("Return an empty array if nothing is selected", () => {
      const something = unionItemsForListToList([], SELECTED_ITEMS, ITEMS);
      expect(something).toEqual([]);
    });

    test("Return an array from the items array", () => {
      const something = unionItemsForListToList([1], SELECTED_ITEMS, ITEMS);
      expect(something).toEqual([{ label: "one", id: 1 }]);
    });

    test("Return an array from the selectedItems array", () => {
      const something = unionItemsForListToList([4], SELECTED_ITEMS, ITEMS);
      expect(something).toEqual([{ label: "four", id: 4 }]);
    });

    test("Return an array from both items and selectedItems array", () => {
      const something = unionItemsForListToList([1, 4], SELECTED_ITEMS, ITEMS);
      expect(something).toEqual([
        { label: "one", id: 1 },
        { label: "four", id: 4 }
      ]);
    });
  });
});
