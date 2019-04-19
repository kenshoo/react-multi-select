import React from "react";
import renderer from "react-test-renderer";

import withSearch from "../../src/components/with_search.js";
import SourceList from "../../src/components/source_list";

const ListComponent = withSearch(SourceList);
const showSearch = true;
const messages = { searchPlaceholder: "Search" };

describe("With search", () => {
  test("renderer search", () => {
    const component = renderer.create(
      <ListComponent showSearch={showSearch} messages={messages} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test("renderer user search", () => {
    const UserSearch = props => <input type="text" {...props} />;

    const component = renderer.create(
      <ListComponent
        searchRenderer={UserSearch}
        showSearch={showSearch}
        messages={messages}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
