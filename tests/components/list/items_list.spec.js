import React from "react";
import { create } from "react-test-renderer";
import { shallow } from "../Utils";

import ItemsList from "../../../src/components/list/items_list";
import InnerList from "../../../src/components/list/list";

describe("ItemsList", () => {
  test("default snapshot", () => {
    const { tree } = shallow(<ItemsList width={400} />);
    expect(tree).toMatchSnapshot();
  });

  test("update will trigger forceUpdateGrid", () => {
    const forceUpdateGrid = jest.fn();
    const { instance } = shallow(<ItemsList width={100} />);
    instance.listRef = { forceUpdateGrid };
    instance.update();
    expect(forceUpdateGrid).toHaveBeenCalledTimes(1);
  });

  test("componentDidUpdate will trigger update", () => {
    const forceUpdateGrid = jest.fn();
    const { instance } = shallow(<ItemsList width={100} />);
    instance.listRef = { forceUpdateGrid };
    instance.componentDidUpdate();
    expect(forceUpdateGrid).toHaveBeenCalledTimes(1);
  });

  test("getlistRef will populate listRef", () => {
    const { instance } = shallow(<ItemsList width={100} />);
    instance.getlistRef("test");
    expect(instance.listRef).toBe("test");
  });

  test("calls for inner list", () => {
    const instance = create(<ItemsList width={100} />);
    const innerList = instance.root.findByType(InnerList);
    expect(innerList).not.toBe(null);
  });

  test("disabledItemsTooltip property injected", () => {
    const instance = create(
      <ItemsList disabledItemsTooltip={"You can select up to 4 items"} />
    );
    const innerList = instance.root.findByType(InnerList);
    expect(innerList.props["disabledItemsTooltip"]).toBe(
      "You can select up to 4 items"
    );
  });
});
