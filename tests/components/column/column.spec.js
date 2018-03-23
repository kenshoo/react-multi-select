import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Column from "../../../src/components/column/column";

describe("Column", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Column />);
    expect(tree).toMatchSnapshot();
  });

  test("snapshot with children", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <Column>
        <div>Some kind of child</div>
      </Column>
    );
    expect(tree).toMatchSnapshot();
  });
});
