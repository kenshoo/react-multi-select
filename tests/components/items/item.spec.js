import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { fireEvent, render } from "@testing-library/react";

import Item from "../../../src/components/items/item";

const item = { id: 1, label: "Hi" };

describe("Item", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with valid item", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item item={item} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with item without id", () => {
    const itemWithoutId = { label: "Hi" };

    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item item={itemWithoutId} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with checked status", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item checked={true} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with indeterminate status", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item indeterminate={true} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with indeterminate and checked status", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item indeterminate={true} checked={true} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with border", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item withBorder={true} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with disabled", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item disabled={true} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with height", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item height={20} />);
    expect(tree).toMatchSnapshot();
  });

  test("click will trigger onClick", () => {
    const onClick = jest.fn();
    const { container } = render(<Item onClick={onClick} />);
    fireEvent.click(container.querySelector("div.item"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("snapshot with group item", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Item item={item} group />);
    expect(tree).toMatchSnapshot();
  });
});
