import React from "react";
import { mount } from "enzyme";
import ShallowRenderer from "react-test-renderer/shallow";
import withSearch from "../../src/components/with_search.js";

const CustomComponent = props => <div {...props} />;
const ListComponent = withSearch(CustomComponent);
const messages = { searchPlaceholder: "Search" };
const UserSearch = props => (
  <input type="text" placeholder={messages.searchPlaceholder} {...props} />
);

describe("With search", () => {
  test("Case default search component", () => {
    const renderer = new ShallowRenderer();
    const filterItems = jest.fn();
    const filteredItems = [{ id: 1, label: "item-1" }];

    const component = renderer.render(
      <ListComponent
        showSearch={true}
        searchValue="1"
        searchIcon={<img src="custom_icon" alt="" />}
        messages={messages}
        filterItems={filterItems}
        filteredItems={filteredItems}
      />
    );
    expect(component).toMatchSnapshot();
  });
  test("Case custom search component", () => {
    const renderer = new ShallowRenderer();
    const filterItems = jest.fn();
    const filteredItems = [{ id: 11, label: "item-11" }];
    const component = renderer.render(
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
    expect(component).toMatchSnapshot();
  });

  test("Case not search component", () => {
    const renderer = new ShallowRenderer();
    const filterItems = jest.fn();
    const component = renderer.render(
      <ListComponent
        showSearch={false}
        searchRenderer={UserSearch}
        searchIcon={<img src="custom_icon" alt="" />}
        searchValue="11"
        messages={messages}
        filterItems={filterItems}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("Case messages are passed ok", () => {
    const filterItems = jest.fn();
    const component = mount(
      <ListComponent
        showSearch={false}
        searchRenderer={UserSearch}
        searchIcon={<img src="custom_icon" alt="" />}
        searchValue="11"
        messages={messages}
        filterItems={filterItems}
      />
    );
    const listComponent = component.find(ListComponent);
    expect(listComponent.props().messages).toEqual(messages);
  });
});
