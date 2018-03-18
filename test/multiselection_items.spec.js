import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";

import ListItems from "../../../src/components/multiselectionlist/multiselection_items";
import ListGroup from "../../../src/components/multiselectionlist/multiselection_group";

describe("ListItems component", () => {
  test("renders without items", () => {
    const inputItems = [];
    const inputEmptyText = "testEmptyText";
    const component = renderer.create(
      <ListItems emptyText={inputEmptyText} searchTerm="" items={inputItems} />
    );
    expect(component).toMatchSnapshot();
  });

  test("renders without items and with search term", () => {
    const inputItems = [];
    const inputFilterResultsText = "testFilterResultsText";
    const component = renderer.create(
      <ListItems
        filterResultsText={inputFilterResultsText}
        searchTerm="Abc"
        items={inputItems}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("renders with items", () => {
    const inputItems = ["first", "second"];
    const itemDisplayFn = item => (
      <span className="test-item">{`processed-${item}`}</span>
    );
    const component = renderer.create(
      <ListItems
        itemDisplayFn={itemDisplayFn}
        searchTerm=""
        items={inputItems}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test("renders with items of group", () => {
    const inputItems = [{ id: 1, label: "first" }, { id: 2, label: "second" }];
    const inputGroups = [{ id: 3, label: "Group 1", itemIds: [1, 2] }];
    const itemDisplayFn = item => (
      <span className="test-item">{`processed-${item.label}`}</span>
    );
    const component = renderer.create(
      <ListItems
        itemDisplayFn={itemDisplayFn}
        searchTerm=""
        items={inputItems}
        groups={inputGroups}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("renders right amount of groups", () => {
    const items = [{ id: 1, label: "first" }];
    const itemDisplayFn = item => (
      <span className="test-item">{item.label}</span>
    );
    const groups = [
      { id: 3, label: "Group 1", itemIds: [1] },
      { id: 4, label: "Group 2", itemIds: [] }
    ];

    const inputProps = { items, groups, itemDisplayFn, searchTerm: "" };
    const component = renderer.create(<ListItems {...inputProps} />);
    expect(component).toMatchSnapshot();
  });

  test("passes prop to group case no group items selected", () => {
    const items = [{ id: 1, label: "first" }];
    const groups = [{ id: 3, label: "Group 1", itemIds: [1] }];
    const itemDisplayFn = item => item.label;
    const inputProps = {
      itemDisplayFn,
      items,
      groups,
      searchTerm: ""
    };

    const component = renderer.create(<ListItems {...inputProps} />);
    expect(component).toMatchSnapshot();
  });

  test("passes prop to group case several group items selected", () => {
    const items = [{ id: 1, label: "first" }, { id: 2, label: "second" }];
    const groups = [{ id: 3, label: "Group 1", itemIds: [1, 2] }];
    const itemDisplayFn = item => item.label;
    const inputProps = {
      items,
      groups,
      itemDisplayFn,
      searchTerm: "",
      selected: [1]
    };

    const component = renderer.create(<ListItems {...inputProps} />);
    expect(component).toMatchSnapshot();
  });

  test("passes prop to group case all group items selected", () => {
    const items = [{ id: 1, label: "first" }, { id: 2, label: "second" }];
    const groups = [{ id: 3, label: "Group 1", itemIds: [1, 2] }];
    const itemDisplayFn = item => item.label;
    const inputProps = {
      itemDisplayFn,
      items,
      groups,
      searchTerm: "",
      selected: [1, 2]
    };

    const component = renderer.create(<ListItems {...inputProps} />);
    expect(component).toMatchSnapshot();
  });

  test("handles onGroupLinkClick right", () => {
    const inputItems = [{ id: 1, label: "first" }];
    const inputGroups = [{ id: 3, label: "Group 1", itemIds: [1] }];
    const itemDisplayFn = item => item.label;

    let isOnSelectGroupClickCalled = false;
    const onSelectGroupClick = () => (isOnSelectGroupClickCalled = true);

    const listItems = mount(
      <ListItems
        onSelectGroupClick={onSelectGroupClick}
        itemDisplayFn={itemDisplayFn}
        searchTerm=""
        items={inputItems}
        groups={inputGroups}
      />
    );

    const group = listItems.find(ListGroup);
    group.props().onGroupLinkClick();
    expect(isOnSelectGroupClickCalled).toBe(true);
  });
});
