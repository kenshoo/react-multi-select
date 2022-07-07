import React from "react";
import { shallow } from "./Utils";

import WithSourceList, { SourceList } from "../../src/components/source_list";

const CustomComponent = jest
  .fn(() => <div>Custom Component</div>)
  .mockName("mockedComponent");

const custom_messages = {
  searchPlaceholder: "Find...",
  noItemsMessage: "No entries available...",
  noneSelectedMessage: "Nothing",
  selectedMessage: "Checked",
  selectAllMessage: "Check all",
  clearAllMessage: "Uncheck all",
};

const selectAllItems = jest.fn().mockName("selectAllItems");
const filterItems = jest.fn().mockName("filterItems");
const selectItem = jest.fn().mockName("selectItem");

describe("SourceList", () => {
  test("default snapshot", () => {
    const { tree } = shallow(<SourceList />);
    expect(tree).toMatchSnapshot();
  });

  test("custom selectAllRenderer", () => {
    const { tree } = shallow(
      <SourceList selectAllRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom searchRenderer", () => {
    const { tree } = shallow(<SourceList searchRenderer={CustomComponent} />);
    expect(tree).toMatchSnapshot();
  });

  test("custom noItemsRenderer", () => {
    const { tree } = shallow(<SourceList noItemsRenderer={CustomComponent} />);
    expect(tree).toMatchSnapshot();
  });

  test("custom itemRenderer", () => {
    const { tree } = shallow(<SourceList itemRenderer={CustomComponent} />);
    expect(tree).toMatchSnapshot();
  });

  test("custom messages", () => {
    const { tree } = shallow(<SourceList messages={custom_messages} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedIds", () => {
    const { tree } = shallow(<SourceList selectedIds={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedItems", () => {
    const { tree } = shallow(<SourceList selectedItems={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectAllItems", () => {
    const { tree } = shallow(<SourceList selectAllItems={selectAllItems} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed filterItems", () => {
    const { tree } = shallow(<SourceList selectAllItems={filterItems} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectItem", () => {
    const { tree } = shallow(<SourceList selectAllItems={selectItem} />);
    expect(tree).toMatchSnapshot();
  });

  test("can remove select all", () => {
    const { tree } = shallow(<SourceList showSelectAll={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("can remove search", () => {
    const { tree } = shallow(<SourceList showSearch={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("show max selection tooltip", () => {
    const { tree } = shallow(
      <SourceList
        messages={{ disabledItemsTooltip: "You can select up to 4 items" }}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  test("will pass itemHeight", () => {
    const { tree } = shallow(<SourceList itemHeight={10} />);
    expect(tree).toMatchSnapshot();
  });

  test("will pass selectAllHeight", () => {
    const { tree } = shallow(
      <SourceList itemHeight={10} selectAllHeight={60} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("will pass selectAllHeight without itemHeight", () => {
    const { tree } = shallow(<SourceList selectAllHeight={60} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed filteredItems with group", () => {
    const { tree } = shallow(
      <SourceList
        filteredItems={[
          { id: 1, label: "item1", group: "group1" },
          { id: 2, label: "item2", group: "group2" },
          { id: 3, label: "item3", group: "group1" },
        ]}
        withGrouping
      />
    );
    expect(tree).toMatchSnapshot();
  });
  test("passed source_list wrapped up to HOC withSearch", () => {
    const { tree } = shallow(
      <WithSourceList
        selectAllHeight={60}
        itemHeight={10}
        filterItems={filterItems}
        showSearch={true}
        filteredItems={[{ id: 1, label: "item1", group: "group1" }]}
        searchValue="1"
        selectAllItems={selectAllItems}
        withGrouping
        selectedIds={[1]}
        selectedItems={[1]}
        itemRenderer={CustomComponent}
        messages={custom_messages}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
