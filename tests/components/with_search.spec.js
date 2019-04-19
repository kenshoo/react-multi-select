import React from "react";

import ShallowRenderer from "react-test-renderer/shallow";
import withSearch from "../../src/components/with_search.js";
import SourceList from "../../src/components/source_list";

const ListComponent = withSearch(SourceList);
const messages = { searchPlaceholder: "Search" };
const UserSearch = props => (
  <input type="text" placeholder={messages.searchPlaceholder} {...props} />
);

const testParameters = {
  selectAllRenderer: true,
  noItemsRenderer: false,
  showSelectAll: true,
  selectItem: () => {},
  selectAllItems: () => {},
  itemHeight: 50,
  isAllSelected: false,
  itemRenderer: () => <span>Test</span>,
  filterItems: () => {},
  selectAllHeight: 400,
  calculatedHeight: 50,
  filteredItems: [
    { id: 1, label: "item-1", disabled: true },
    { id: 2, label: "item-2", disabled: false },
    { id: 3, label: "item-3", withGrouping: true },
    { id: 4, label: "item-4" }
  ],
  selectedIds: [1, 2],
  getList: () => {},
  listRenderer: () => {}
};

describe("With search", () => {
  test("Case default search component", () => {
    const renderer = new ShallowRenderer();
    const component = renderer.render(
      <ListComponent
        showSearch={true}
        messages={messages}
        {...testParameters}
      />
    );
    expect(component).toMatchSnapshot();
  });
  test("Case custom search component", () => {
    const searchValue = "1";
    const renderer = new ShallowRenderer();

    const component = renderer.render(
      <ListComponent
        searchRenderer={UserSearch}
        showSearch={true}
        messages={messages}
        searchValue={searchValue}
        {...testParameters}
      />
    );
    expect(component).toMatchSnapshot();
  });
  test("Case show search false", () => {
    const renderer = new ShallowRenderer();
    const component = renderer.render(
      <ListComponent
        showSearch={false}
        messages={messages}
        {...testParameters}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
