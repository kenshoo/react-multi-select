import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { shallow } from "enzyme";

import SelectionStatus from "../../../src/components/selection_status/selection_status";
import styles from "../../../src/components/selection_status/selection_status.scss";

describe("SelectionStatus", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectionStatus />);
    expect(tree).toMatchSnapshot();
  });
  test("snapshot with custom noneSelectedMessage", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SelectionStatus noneSelectedMessage="custom no selection message" />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with selected item", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<SelectionStatus selected={[1, 2, 3]} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with selected items and custom clearAllMessage", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SelectionStatus selected={[1, 2, 3]} clearAllMessage="custom message" />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with selected items and custom selectedMessage", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <SelectionStatus
        selected={[1, 2, 3]}
        selectedMessage="custom selected message"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  test("click will trigger onClick", () => {
    const onClick = jest.fn();
    const selectionStatus = shallow(<SelectionStatus clearAll={onClick} />);
    const actionText = selectionStatus.find(".clear_all");
    actionText.simulate("click");
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
