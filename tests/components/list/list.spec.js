import React from "react";
import { create } from "react-test-renderer";
import { fireEvent, render, screen } from "@testing-library/react";

import List from "../../../src/components/list/list";
import Item from "../../../src/components/items/item";
import NoItems from "../../../src/components/items/no_items";
import { shallow } from "../Utils";

const items = [
  { id: 5, label: "item 0" },
  { id: 12, label: "item 1" },
];
const itemsWithDisabled = [
  { id: 5, label: "item 0", disabled: true },
  { id: 12, label: "item 1" },
];
const CUSTOM_MESSAGE = "custom message";
const CustomComponent = () => <div>Custom Component</div>;
const isLocked = (item) => item.disabled;

describe("List", () => {
  test("default snapshot", () => {
    const { tree } = shallow(<List width={100} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with height", () => {
    const { tree } = shallow(<List width={100} height={200} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with rowHeight", () => {
    const { tree } = shallow(<List width={100} rowHeight={200} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with offset", () => {
    const { tree } = shallow(<List width={100} offset={4} />);
    expect(tree).toMatchSnapshot();
  });

  test("shows NoItems by default if no items present", () => {
    const instance = create(<List width={100} />).root;
    const noItems = instance.findByType(NoItems);
    expect(noItems).not.toBe(null);
  });

  test("shows NoItems with default message", () => {
    render(<List width={100} />);
    expect(screen.queryByText("No Items...")).not.toBe(null);
  });

  test("shows NoItems with custom message", () => {
    render(<List width={100} noItemsMessage={CUSTOM_MESSAGE} />);
    expect(screen.queryByText(CUSTOM_MESSAGE)).not.toBe(null);
  });

  test("can display custom NoItems component", () => {
    const instance = create(
      <List width={100} noItemsRenderer={CustomComponent} />
    ).root;
    const noItems = instance.findByType(CustomComponent);
    expect(noItems).not.toBe(null);
  });

  test("does not shows NoItems if items are present", () => {
    const instance = create(
      <List width={100} items={items} isLocked={isLocked} />
    ).root;
    const noItems = instance.findAllByType(NoItems);
    expect(noItems.length).toBe(0);
  });

  test("shows Items if items are present", () => {
    const instance = create(
      <List width={100} items={items} isLocked={isLocked} />
    );
    const elements = instance.root.findAllByType(Item);
    expect(elements.length).toBe(2);
  });

  test("shows checked Items if items are present", () => {
    const instance = create(
      <List width={100} items={items} selectedIds={[12]} isLocked={isLocked} />
    ).root;
    const elements = instance.findAllByType(Item);
    expect(elements.at(0).props.checked).toBe(false);
    expect(elements.at(1).props.checked).toBe(true);
  });

  test("shows Custom Item Component", () => {
    const instance = create(
      <List
        width={100}
        items={items}
        renderer={CustomComponent}
        isLocked={isLocked}
      />
    ).root;
    const itemsWrapper = instance.findAllByType(CustomComponent);
    expect(itemsWrapper.length).toBe(2);
  });

  test("click will trigger onClick", () => {
    const onClick = jest.fn();
    const { container } = render(
      <List width={100} items={items} onClick={onClick} isLocked={isLocked} />
    );
    fireEvent.click(container.querySelector("div.item"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("click will trigger onClick with id param", () => {
    const onClick = jest.fn();
    const { container } = render(
      <List width={100} items={items} onClick={onClick} isLocked={isLocked} />
    );
    fireEvent.click(container.querySelector("div.item"));
    expect(onClick).toHaveBeenCalledWith(expect.anything(), 5);
  });

  test("click will not trigger onClick if disabled", () => {
    const onClick = jest.fn();
    const { container } = render(
      <List width={100} items={items} onClick={onClick} disabled={true} />
    );
    fireEvent.click(container.querySelector("div.item"));
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test("click will not trigger onClick for disabled item", () => {
    const onClick = jest.fn();
    const { container } = render(
      <List
        width={100}
        items={itemsWithDisabled}
        onClick={onClick}
        isLocked={isLocked}
      />
    );
    fireEvent.click(container.querySelector("div.item"));
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test("click will trigger onClick if disabled but also checked", () => {
    const onClick = jest.fn();
    const { container } = render(
      <List
        width={100}
        items={items}
        selectedIds={[5]}
        onClick={onClick}
        disabled={true}
        isLocked={isLocked}
      />
    );
    fireEvent.click(container.querySelector("div.item"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("should display disable items tooltip", () => {
    const { container } = render(
      <List
        width={100}
        items={items.slice(0, 1)}
        disabledItemsTooltip={"You can select up to 4 items"}
        disabled={true}
      />
    );
    const row = container.querySelector(".list_item");
    expect(row.title).toBe("You can select up to 4 items");
  });

  test("should not display disable items tooltip", () => {
    const { container } = render(
      <List
        width={100}
        items={items.slice(0, 1)}
        disabledItemsTooltip={"You can select up to 4 items"}
        disabled={false}
        isLocked={isLocked}
      />
    );
    const row = container.querySelector(".list_item");
    expect(row.title).toBe("");
  });

  test("show Item is checked & disabled", () => {
    const instance = create(
      <List
        width={100}
        items={[{ id: 13, label: "item 13", disabled: true }, ...items]}
        selectedIds={[12, 13]}
        selectedItems={[{ id: 13, label: "item 13", disabled: true }]}
        isLocked={isLocked}
      />
    ).root;

    const elements = instance.findAllByType(Item);
    expect(elements[0].props.disabled).toBe(true);
    expect(elements[0].props.checked).toBe(true);
  });

  test("show Item is disabled but not checked", () => {
    const instance = create(
      <List
        width={100}
        items={[{ id: 13, label: "item 13", disabled: true }, ...items]}
        isLocked={isLocked}
      />
    ).root;

    const elements = instance.findAllByType(Item);
    expect(elements[0].props.disabled).toBe(true);
    expect(elements[0].props.checked).toBe(false);
  });

  test("show Item not disabled and not checked", () => {
    const instance = create(
      <List width={100} items={items} isLocked={isLocked} />
    ).root;

    const elements = instance.findAllByType(Item);
    expect(elements[0].props.disabled).toBe(false);
    expect(elements[0].props.checked).toBe(false);
  });
});
