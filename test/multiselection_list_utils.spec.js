import {
  isAllSelected,
  PARTIAL
} from "../../../src/components/multiselectionlist/multiselection_list_utils";

describe("multiselection_list_utils isAllSelected tests:", () => {
  test("both undefined", () => {
    const result = isAllSelected(undefined, undefined);

    expect(result).toBe(false);
  });

  test("both empty", () => {
    const result = isAllSelected([], []);

    expect(result).toBe(false);
  });

  test("partial for ids", () => {
    const result = isAllSelected([1], [1, 2, 3]);

    expect(result).toBe(PARTIAL);
  });

  test("false for ids", () => {
    const result = isAllSelected([], [1, 2, 3]);

    expect(result).toBe(false);
  });

  test("true for ids", () => {
    const result = isAllSelected([3, 2, 1], [1, 2, 3]);

    expect(result).toBe(true);
  });

  test("partial for objects", () => {
    const result = isAllSelected(
      [{ id: 2 }],
      [{ id: 1 }, { id: 2 }, { id: 3 }]
    );

    expect(result).toBe(PARTIAL);
  });

  test("false for objects", () => {
    const result = isAllSelected([], [{ id: 1 }, { id: 2 }, { id: 3 }]);

    expect(result).toBe(false);
  });

  test("true for objects", () => {
    const result = isAllSelected(
      [{ id: 2 }, { id: 3 }, { id: 1 }],
      [{ id: 1 }, { id: 2 }, { id: 3 }]
    );

    expect(result).toBe(true);
  });
});
