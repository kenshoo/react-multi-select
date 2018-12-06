import React from "react";
import { expect } from "chai";

import { buildItemGrouping } from "../../src/components/item_grouping_util";

describe("Item grouping util", () => {
  it("items undefined", () => {
    const items = undefined;
    const result = buildItemGrouping(items);
    expect(result).to.be.an("undefined");
  });

  it("items empty", () => {
    const items = [];
    const result = buildItemGrouping(items);
    expect(result).to.be.empty;
  });
});
