import React from "react";
import { shallow } from "enzyme";

import withMultiSelectState from "../../src/components/multi_select_state";

const CustomComponent = props => <div {...props} />;

const ITEM_1 = { id: 0, label: "item 0" };
const ITEM_2 = { id: 1, label: "item 1" };
const ITEM_3 = { id: 2, label: "item 2" };

const items = [ITEM_1, ITEM_2, ITEM_3];

describe("withMultiSelectState", () => {
  test("default initial state", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent />);
    expect(wrapper.prop("selectedItems")).toEqual([]);
    expect(wrapper.prop("filteredItems")).toEqual([]);
  });

  test("initial state with items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    expect(wrapper.prop("selectedItems")).toEqual([]);
    expect(wrapper.prop("filteredItems")).toEqual(items);
  });

  test("can select all items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual(items);
  });

  test("can unselect select all items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectAllItems();
    wrapper.update();
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([]);
  });

  test("can clear all items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(ITEM_2.id);
    wrapper.update();
    wrapper.props().selectItem(ITEM_1.id);
    wrapper.update();
    wrapper.props().clearAll();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([]);
  });

  test("can select one item", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(ITEM_1.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_1]);
  });

  test("sorts selection", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(ITEM_2.id);
    wrapper.update();
    wrapper.props().selectItem(ITEM_1.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_1, ITEM_2]);
  });

  test("can filter items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().filterItems({ target: { value: "2" } });
    wrapper.update();
    expect(wrapper.prop("filteredItems")).toEqual([ITEM_3]);
  });

  test("can define selected items externally", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={items} selectedItems={[ITEM_2]} />
    );
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_2]);
    wrapper.setProps({ selectedItems: [ITEM_3] });
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_3]);
  });
});
