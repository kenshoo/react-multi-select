import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { shallow, mount } from "enzyme";

import ItemsList from "../../../src/components/list/items_list";
import InnerList from "../../../src/components/list/list";

describe("ItemsList", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<ItemsList width={400} />);
    expect(tree).toMatchSnapshot();
  });

  test("update will trigger forceUpdateGrid", () => {
    const forceUpdateGrid = jest.fn();
    const wrapper = shallow(<ItemsList width={100} />);
    const instance = wrapper.instance();
    instance.listRef = { forceUpdateGrid };
    instance.update();
    expect(forceUpdateGrid).toHaveBeenCalledTimes(1);
  });

  test("componentDidUpdate will trigger update", () => {
    const forceUpdateGrid = jest.fn();
    const wrapper = shallow(<ItemsList width={100} />);
    const instance = wrapper.instance();
    instance.listRef = { forceUpdateGrid };
    instance.componentDidUpdate();
    expect(forceUpdateGrid).toHaveBeenCalledTimes(1);
  });

  test("getlistRef will populate listRef", () => {
    const wrapper = shallow(<ItemsList width={100} />);
    const instance = wrapper.instance();
    instance.getlistRef("test");
    expect(instance.listRef).toBe("test");
  });

  test("calls for inner list", () => {
    const wrapper = mount(<ItemsList width={100} />);
    const innerList = wrapper.find(InnerList);
    expect(innerList.length).toBe(1);
  });
});
