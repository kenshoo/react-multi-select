import React from "react";
import { mount } from "enzyme";

import List from "../../../src/components/list/list";
import Item from "../../../src/components/items/item";
import NoItems from "../../../src/components/items/no_items";
import ShallowRenderer from "react-test-renderer/shallow";

const items = [{ id: 5, label: "item 0" }, { id: 12, label: "item 1" }];
const CUSTOM_MESSAGE = "custom message";
const CustomComponent = () => <div>Custom Component</div>;

describe("ItemsList", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<List width={100} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with height", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<List width={100} height={200} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with rowHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<List width={100} rowHeight={200} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with offset", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<List width={100} offset={4} />);
    expect(tree).toMatchSnapshot();
  });

  test("shows NoItems by default if no items present", () => {
    const wrapper = mount(<List width={100} />);
    const noItems = wrapper.find(NoItems);
    expect(noItems.length).toBe(1);
  });

  test("shows NoItems with default message", () => {
    const wrapper = mount(<List width={100} />);
    const noItems = wrapper.find(NoItems);
    expect(noItems.text()).toBe("No Items...");
  });

  test("shows NoItems with custom message", () => {
    const wrapper = mount(<List width={100} noItemsMessage={CUSTOM_MESSAGE} />);
    const noItems = wrapper.find(NoItems);
    expect(noItems.text()).toBe(CUSTOM_MESSAGE);
  });

  test("can display custom NoItems component", () => {
    const wrapper = mount(
      <List width={100} noItemsRenderer={CustomComponent} />
    );
    const noItems = wrapper.find(CustomComponent);
    expect(noItems.length).toBe(1);
  });

  test("does not shows NoItems if items are present", () => {
    const wrapper = mount(<List width={100} items={items} />);
    const noItems = wrapper.find(NoItems);
    expect(noItems.length).toBe(0);
  });

  test("shows Items if items are present", () => {
    const wrapper = mount(<List width={100} items={items} />);
    const itemsWrapper = wrapper.find(Item);
    expect(itemsWrapper.length).toBe(2);
  });

  test("shows checked Items if items are present", () => {
    const wrapper = mount(
      <List width={100} items={items} selectedIds={[12]} />
    );
    const itemsWrapper = wrapper.find(Item);
    expect(itemsWrapper.at(0).prop("checked")).toBe(false);
    expect(itemsWrapper.at(1).prop("checked")).toBe(true);
  });

  test("shows Custom Item Component", () => {
    const wrapper = mount(
      <List width={100} items={items} renderer={CustomComponent} />
    );
    const itemsWrapper = wrapper.find(CustomComponent);
    expect(itemsWrapper.length).toBe(2);
  });

  test("click will trigger onClick", () => {
    const onClick = jest.fn();
    const wrapper = mount(<List width={100} items={items} onClick={onClick} />);
    const itemsWrapper = wrapper.find(Item);
    itemsWrapper.at(0).simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("click will trigger onClick with id param", () => {
    const onClick = jest.fn();
    const wrapper = mount(<List width={100} items={items} onClick={onClick} />);
    const itemsWrapper = wrapper.find(Item);
    itemsWrapper.at(0).simulate("click");
    expect(onClick).toHaveBeenCalledWith(5);
  });
});
