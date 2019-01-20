import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { mount } from "enzyme";

import MultiSelectWithState, {
  MultiSelect
} from "../../src/components/multi_select";
import { SearchWithValue } from "../../src/components/search/search";
import { createGenerateClassName } from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
  productionPrefix: "c"
});

const CustomComponent = jest
  .fn(() => <div>Custom Component</div>)
  .mockName("mockedComponent");

const custom_messages = {
  searchPlaceholder: "Find...",
  noItemsMessage: "No entries available...",
  noneSelectedMessage: "Nothing",
  selectedMessage: "Checked",
  selectAllMessage: "Check all",
  clearAllMessage: "Uncheck all"
};

const selectAllItems = jest.fn().mockName("selectAllItems");
const filterItems = jest.fn().mockName("filterItems");
const selectItem = jest.fn().mockName("selectItem");
const unselectItems = jest.fn().mockName("unselectItems");
const clearAll = jest.fn().mockName("clearAll");

describe("MultiSelect", () => {
  test("default snapshot", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect />);
    expect(tree).toMatchSnapshot();
  });

  test("custom selectAllRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect selectAllRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom searchRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect searchRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom noItemsRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect noItemsRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom itemRenderer", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect itemRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("custom messages", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect messages={custom_messages} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedIds", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect selectedIds={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectedItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect selectedItems={[1, 2]} />);
    expect(tree).toMatchSnapshot();
  });

  test("passes disabled if maxSelectedItem has passed", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect selectedItems={[1, 2]} maxSelectedItems={2} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("does not pass disabled if maxSelectedItem has passed", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect selectedItems={[1, 2]} maxSelectedItems={4} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("passed selectAllItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect selectAllItems={selectAllItems} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("passed filterItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect selectAllItems={filterItems} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed selectItem", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect selectAllItems={selectItem} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed unselectItems", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect unselectItems={unselectItems} />);
    expect(tree).toMatchSnapshot();
  });

  test("passed clearAll", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect clearAll={clearAll} />);
    expect(tree).toMatchSnapshot();
  });

  test("can remove select all", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect showSelectAll={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("can remove search", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect showSearch={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("displays Loader when loading", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect loading={true} />);
    expect(tree).toMatchSnapshot();
  });

  test("displays custom Loader when loading", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect loading={true} loaderRenderer={CustomComponent} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("can remove selected items", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect showSelectedItems={false} />);
    expect(tree).toMatchSnapshot();
  });

  test("will pass itemHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect itemHeight={60} />);
    expect(tree).toMatchSnapshot();
  });

  test("will pass selectAllHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect itemHeight={60} selectAllHeight={40} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("will pass selectAllHeight without itemHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelect selectAllHeight={20} />);
    expect(tree).toMatchSnapshot();
  });

  test("searchValueChanged will be called on controlled search value", () => {
    const newValueString = "new value";
    const searchValueChanged = jest.fn();
    const tree = mount(
      <MultiSelectWithState
        searchRenderer={SearchWithValue}
        searchValue=""
        searchValueChanged={searchValueChanged}
        searchIcon="div"
      />
    );

    tree
      .find('input[type="text"]')
      .simulate("change", { target: { value: newValueString } });
    expect(searchValueChanged).toHaveBeenCalledWith(newValueString);
  });

  test("without responsiveHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<MultiSelectWithState />);
    expect(tree).toMatchSnapshot();
  });
  test("with responsiveHeight", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelectWithState responsiveHeight={"70%"} />
    );
    expect(tree).toMatchSnapshot();
  });

  test("with generateClassName", () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <MultiSelect generateClassName={generateClassName} />
    );
    expect(tree).toMatchSnapshot();
  });
});
