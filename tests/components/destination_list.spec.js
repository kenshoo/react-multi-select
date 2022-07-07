import React from "react";
import { shallow } from "./Utils";
import WithDestinationList, {
  DestinationList,
} from "../../src/components/destination_list";
import List from "../../src/components/list/items_list";

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

const unselectItems = jest.fn().mockName("unselectItems");
const clearAll = jest.fn().mockName("clearAll");
const ID = 1;

describe("DestinationList", () => {
  test("default snapshot", () => {
    const { tree } = shallow(<DestinationList />);
    expect(tree).toMatchSnapshot();
  });

  test("custom selectionStatusRenderer", () => {
    const { tree } = shallow(
      <DestinationList selectionStatusRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom selectedItemRenderer", () => {
    const { tree } = shallow(
      <DestinationList selectedItemRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom noItemsRenderer", () => {
    const { tree } = shallow(
      <DestinationList noItemsRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom messages", () => {
    const { tree } = shallow(<DestinationList messages={custom_messages} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed unselectItems", () => {
    const { tree } = shallow(<DestinationList unselectItems={unselectItems} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed clearAll", () => {
    const { tree } = shallow(<DestinationList clearAll={clearAll} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedIds", () => {
    const { tree } = shallow(<DestinationList selectedIds={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedItems", () => {
    const { tree } = shallow(<DestinationList selectedItems={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedItems with grouping", () => {
    const { tree } = shallow(
      <DestinationList
        selectedItems={[
          { id: 1, label: "item1", group: "group1" },
          { id: 2, label: "item2", group: "group2" },
          { id: 3, label: "item3", group: "group1" },
        ]}
        withGrouping
      />
    );
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedItems with grouping and empty items", () => {
    const { tree } = shallow(
      <DestinationList selectedItems={[]} withGrouping />
    );
    expect(tree).toMatchSnapshot();
  });

  test("Case include search with destination list", () => {
    const custom_messages = { messages: { searchPlaceholder: "Search" } };
    const { tree } = shallow(
      <WithDestinationList
        showSearch={true}
        messages={custom_messages}
        searchIcon="custom_path_icon"
        searchValue="1"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  test("Case disabled search with destination list", () => {
    const custom_messages = { messages: { searchPlaceholder: "Search" } };
    const { tree } = shallow(
      <WithDestinationList
        showSearch={false}
        messages={custom_messages}
        searchIcon="custom_path_icon"
        searchValue="1"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
