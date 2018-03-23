import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { shallow } from "enzyme";

import Search from "../../../src/components/search/search";

const event = { target: { value: "new value" } };

describe("Search", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Search />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with placeholder", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <Search searchPlaceholder="new placeholder text" />
    );
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with custom search icon", () => {
    const Icon = () => <div>Some Icon</div>;
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Search searchIcon={Icon} />);
    expect(tree).toMatchSnapshot();
  });

  test("typing will trigger onChange", () => {
    const onChange = jest.fn();
    const search = shallow(<Search onChange={onChange} />);
    const input = search.find("input");

    input.simulate("change", event);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("onChange will be called with the right params", () => {
    const onChange = jest.fn();
    const search = shallow(<Search onChange={onChange} />);
    const input = search.find("input");

    input.simulate("change", event);

    expect(onChange).toHaveBeenCalledWith(event);
  });
});
