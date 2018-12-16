import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import SelectedItem from "../../../src/components/items/selected_item";

const item = { id: 1, label: "Hi" };

describe("SelectedItem", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectedItem />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with valid item", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectedItem item={item} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with group item", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectedItem item={item} group />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with height", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectedItem height={20} />);
    expect(tree).toMatchSnapshot();
  });
});
