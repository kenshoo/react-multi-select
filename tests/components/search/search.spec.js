import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { shallow } from "../Utils";
import Search from "../../../src/components/search/search";

const event = { target: { value: "new value" } };

describe("Search", () => {
  test("default snapshot", () => {
    const { tree } = shallow(<Search />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with placeholder", () => {
    const { tree } = shallow(
      <Search searchPlaceholder="new placeholder text" />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with custom search icon", () => {
    const Icon = () => <div>Some Icon</div>;
    const { tree } = shallow(<Search searchIcon={Icon} />);
    expect(tree).toMatchSnapshot();
  });

  test("typing will trigger onChange", () => {
    const onChange = jest.fn();
    const { container } = render(<Search onChange={onChange} />);
    fireEvent.change(container.querySelector("input"), event);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
