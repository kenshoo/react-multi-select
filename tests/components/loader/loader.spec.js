import React from "react";
import { shallow } from "../Utils";

import Loader from "../../../src/components/loader/loader";

describe("Loader", () => {
  test("default snapshot", () => {
    const { tree } = shallow(<Loader />);
    expect(tree).toMatchSnapshot();
  });
});
