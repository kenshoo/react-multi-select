import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import SourceList from "../../src/components/source_list";

const CustomComponent = jest
  .fn(() => <div>Custom Component</div>)
  .mockName("mockedComponent");

const custom_messages = {
  searchPlaceholder: "Find...",
  noItemsMessage: "No entries available...",
  noneSelectedMessage: "Nothing",
  selectedMessage: "Checked",
  selectAllMessage: "Check all",
  clearAllMessage: "Uncheck all"
};

const selectAllItems = jest.fn().mockName("selectAllItems");
const filterItems = jest.fn().mockName("filterItems");
const selectItem = jest.fn().mockName("selectItem");

describe("SourceList", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList />);
    expect(tree).toMatchSnapshot();
  });

  test("custom selectAllRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SourceList selectAllRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom searchRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SourceList searchRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom noItemsRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SourceList noItemsRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom itemRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList itemRenderer={CustomComponent} />);
    expect(tree).toMatchSnapshot();
  });

  test("custom messages", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList messages={custom_messages} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedIds", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList selectedIds={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList selectedItems={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectAllItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SourceList selectAllItems={selectAllItems} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("passed filterItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList selectAllItems={filterItems} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectItem", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList selectAllItems={selectItem} />);
    expect(tree).toMatchSnapshot();
  });

  test("can remove select all", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList showSelectAll={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("can remove search", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList showSearch={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("show max selection tooltip", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SourceList
        messages={{ disabledItemsTooltip: "You can select up to 4 items" }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  test("will pass itemHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList itemHeight={10} />);
    expect(tree).toMatchSnapshot();
  });

  test("will pass selectAllHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SourceList itemHeight={10} selectAllHeight={60} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("will pass selectAllHeight without itemHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SourceList selectAllHeight={60} />);
    expect(tree).toMatchSnapshot();
  });
});
