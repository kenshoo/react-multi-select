import React from "react";
import { shallow } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";

import DestinationList from "../../src/components/destination_list";
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
  clearAllMessage: "Uncheck all"
};

const unselectItems = jest.fn().mockName("unselectItems");
const clearAll = jest.fn().mockName("clearAll");

describe("DestinationList", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<DestinationList />);
    expect(tree).toMatchSnapshot();
  });

  test("custom selectionStatusRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <DestinationList selectionStatusRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom selectedItemRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <DestinationList selectedItemRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom noItemsRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <DestinationList noItemsRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom messages", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <DestinationList messages={custom_messages} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("passed unselectItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <DestinationList unselectItems={unselectItems} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("passed clearAll", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<DestinationList clearAll={clearAll} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedIds", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<DestinationList selectedIds={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<DestinationList selectedItems={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedItems", () => {
    const onClick = jest.fn();
    const component = shallow(<DestinationList unselectItems={onClick} />);
    const list = component.find(List).at(0);
    list.simulate("click", {});
    expect(onClick).toHaveBeenCalledWith([{}]);
  });
});
