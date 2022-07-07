import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import SelectAll from "../../../src/components/items/select_all";

describe("SelectAll", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectAll />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with selectAllMessage", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SelectAll selectAllMessage="some test message" />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with isSelectAll", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectAll isSelectAll={true} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with isSelectAll false", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectAll isSelectAll={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with empty selectedIds with select all", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SelectAll selectedIds={[]} isSelectAll={true} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with selectedIds with select all should be indeterminate", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SelectAll selectedIds={[1]} isSelectAll={true} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with empty selectedIds without select all", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SelectAll selectedIds={[]} isSelectAll={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with selectedIds without select all should be indeterminate", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SelectAll selectedIds={[1]} isSelectAll={false} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with height", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectAll height={20} />);
    expect(tree).toMatchSnapshot();
  });
});
