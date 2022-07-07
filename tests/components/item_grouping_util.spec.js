import { groupItems } from "../../src/components/item_grouping_util";

describe("Item grouping util", () => {
  it("items undefined", () => {
    const items = undefined;
    const result = groupItems(items);
    expect(result).toBe(undefined);
  });

  it("items empty", () => {
    const items = [];
    const result = groupItems(items);
    expect(result).toBeEmpty;
  });

  it("with 3 items 2 groups", () => {
    const items = [
      { id: 1, label: "item1", group: "group1" },
      { id: 2, label: "item2", group: "group2" },
      { id: 3, label: "item3", group: "group1" },
    ];
    const expected = [
      { disabled: true, id: "group1", isGroup: true, label: "group1" },
      { group: "group1", id: 1, label: "item1" },
      { group: "group1", id: 3, label: "item3" },
      { disabled: true, id: "group2", isGroup: true, label: "group2" },
      { group: "group2", id: 2, label: "item2" },
    ];
    const result = groupItems(items);
    expect(result).toEqual(expected);
  });

  it("with 3 items 3 groups", () => {
    const items = [
      { id: 1, label: "item1", group: "group1" },
      { id: 2, label: "item2", group: "group2" },
      { id: 3, label: "item3", group: "group3" },
    ];
    const expected = [
      { disabled: true, id: "group1", isGroup: true, label: "group1" },
      { group: "group1", id: 1, label: "item1" },
      { disabled: true, id: "group2", isGroup: true, label: "group2" },
      { group: "group2", id: 2, label: "item2" },
      { disabled: true, id: "group3", isGroup: true, label: "group3" },
      { group: "group3", id: 3, label: "item3" },
    ];
    const result = groupItems(items);
    expect(result).toEqual(expected);
  });

  it("with 3 items 1 group", () => {
    const items = [
      { id: 1, label: "item1", group: "group1" },
      { id: 2, label: "item2", group: "group1" },
      { id: 3, label: "item3", group: "group1" },
    ];
    const expected = [
      { disabled: true, id: "group1", isGroup: true, label: "group1" },
      { group: "group1", id: 1, label: "item1" },
      { group: "group1", id: 2, label: "item2" },
      { group: "group1", id: 3, label: "item3" },
    ];
    const result = groupItems(items);
    expect(result).toEqual(expected);
  });
});
