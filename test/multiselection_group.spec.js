import React from "react";
import { shallow, mount } from "enzyme";

import ListGroup from "../../../src/components/multiselectionlist/multiselection_group";
import ShallowRenderer from "react-test-renderer/shallow";

const renderer = new ShallowRenderer();

describe("ListGroup component", () => {
  test("renders by default", () => {
    const component = renderer.render(<ListGroup/>);
    expect(component).toMatchSnapshot();
  });

  test("renders by input props", () => {
    const inputProps = {
      label: "testLabel",
      groupLink: "testSelectGroupLabel"
    };
    const component = renderer.render(<ListGroup {...inputProps} />);
    expect(component).toMatchSnapshot();
  });

  test("handles onGroupLinkClick right", () => {
    let isOnGroupLinkClick = false;
    const onGroupLinkClick = () => (isOnGroupLinkClick = true);
    const listGroup = mount(<ListGroup onGroupLinkClick={onGroupLinkClick} />);

    listGroup
      .find("a")
      .props()
      .onClick();
    expect(isOnGroupLinkClick).toBe(true);
  });
});
