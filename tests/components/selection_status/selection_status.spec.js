import React from "react";
import { shallow } from "../Utils";

import SelectionStatus from "../../../src/components/selection_status/selection_status";

describe("SelectionStatus", () => {
  test("default snapshot", () => {
    const { tree } = shallow(<SelectionStatus />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with custom noneSelectedMessage", () => {
    const { tree } = shallow(
      <SelectionStatus noneSelectedMessage="custom no selection message" />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with selected item", () => {
    const { tree } = shallow(<SelectionStatus selected={[1, 2, 3]} />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with selected items and custom clearAllMessage", () => {
    const { tree } = shallow(
      <SelectionStatus selected={[1, 2, 3]} clearAllMessage="custom message" />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with selected items and custom selectedMessage", () => {
    const { tree } = shallow(
      <SelectionStatus
        selected={[1, 2, 3]}
        selectedMessage="custom selected message"
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
