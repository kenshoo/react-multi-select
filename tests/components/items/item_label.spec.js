import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import ItemLabel from "../../../src/components/items/item_label";

describe("ItemLabel", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<ItemLabel />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with label text", () => {
    const label = "hi";
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<ItemLabel label={label} />);
    expect(tree).toMatchSnapshot();
  });
});
