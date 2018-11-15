import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import MultiSelectHeightResponsive from "../../src/components/multi_select_height_responsive";

describe("MultiSelectHeightResponsive", () => {
  test("without responsiveHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelectHeightResponsive />);
    expect(tree).toMatchSnapshot();
  });
  test("with responsiveHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelectHeightResponsive responsiveHeight={"70%"} />
    );
    expect(tree).toMatchSnapshot();
  });
});
