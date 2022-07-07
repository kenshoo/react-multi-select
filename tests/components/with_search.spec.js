import React from "react";
import withSearch from "../../src/components/with_search.js";
import { shallow } from "./Utils.js";

const CustomComponent = (props) => <div {...props} />;
const ListComponent = withSearch(CustomComponent);
const messages = { searchPlaceholder: "Search" };
const UserSearch = (props) => (
  <input type="text" placeholder={messages.searchPlaceholder} {...props} />
);

describe("With search", () => {
  test("Case default search component", () => {
    const filterItems = jest.fn();
    const filteredItems = [{ id: 1, label: "item-1" }];

    const { tree } = shallow(
      <ListComponent
        showSearch={true}
        searchValue="1"
        searchIcon={<img src="custom_icon" alt="" />}
        messages={messages}
        filterItems={filterItems}
        filteredItems={filteredItems}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  test("Case custom search component", () => {
    const filterItems = jest.fn();
    const filteredItems = [{ id: 11, label: "item-11" }];
    const { tree } = shallow(
      <ListComponent
        showSearch={true}
        searchRenderer={UserSearch}
        searchIcon={<img src="custom_icon" alt="" />}
        searchValue="11"
        messages={messages}
        filteredItems={filteredItems}
        filterItems={filterItems}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  test("Case not search component", () => {
    const filterItems = jest.fn();
    const { tree } = shallow(
      <ListComponent
        showSearch={false}
        searchRenderer={UserSearch}
        searchIcon={<img src="custom_icon" alt="" />}
        searchValue="11"
        messages={messages}
        filterItems={filterItems}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
