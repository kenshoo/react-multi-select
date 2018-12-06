import React from "react";

import { buildItemGrouping } from "../../src/components/item_grouping_util";

describe("Item grouping util", () => {
  it("items undefined", () => {
    const items = undefined;
    const result = buildItemGrouping(items);
    expect(result).toBe(undefined);
  });

  it("items empty", () => {
    const items = [];
    const result = buildItemGrouping(items);
    expect(result).toBeEmpty;
  });
});
