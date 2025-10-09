import React from "react";
import { shallow } from "enzyme";

import withMultiSelectState from "../../src/components/multi_select_state";

const CustomComponent = props => <div {...props} />;

const ITEM_1 = { id: 0, label: "item 0" };
const ITEM_2 = { id: 1, label: "item 1" };
const ITEM_3 = { id: 2, label: "item 2" };
const ITEM_4 = { id: 3, label: "item 3" };
const ITEM_12 = { id: 12, label: "item 12" };
const ITEM_22 = { id: 22, label: "item 22" };
const DISABLED_ITEM_23 = { id: 23, label: "item 23", disabled: true };
const EVENT = { shiftKey: false };
const EVENT_WITH_SHIFT = { keyCode: 16, shiftKey: true };
const EVENT_WITH_CTRL = { keyCode: 17, shiftKey: true };

const items = [ITEM_1, ITEM_2, ITEM_3];
const manyItems = [ITEM_1, ITEM_2, ITEM_3, ITEM_4, ITEM_12, ITEM_22];
const itemsWithDisabled = [ITEM_1, ITEM_2, DISABLED_ITEM_23, ITEM_3];

describe("withMultiSelectState", () => {
  window.addEventListener = jest.fn();
  window.removeEventListener = jest.fn();

  test("default initial state", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent />);
    expect(wrapper.prop("selectedItems")).toEqual([]);
    expect(wrapper.prop("filteredItems")).toEqual([]);
  });

  test("initial state with items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    expect(wrapper.prop("selectedItems")).toEqual([]);
    expect(wrapper.prop("filteredItems")).toEqual(items);
  });

  test("can select all items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual(items);
  });

  test("can select all items except disabled", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={itemsWithDisabled} />);
    const expected = itemsWithDisabled.filter(({ disabled }) => !disabled);
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual(expected);
  });

  test("select all triggers onChange", () => {
    const onChange = jest.fn();
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={items} onChange={onChange} />
    );
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(items);
  });

  test("can unselect select all items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectAllItems();
    wrapper.update();
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([]);
  });

  test("can unselect select all items when there are disabled", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={itemsWithDisabled} />);
    wrapper.props().selectAllItems();
    wrapper.update();
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([]);
  });

  test("unselect from select all will trigger onChange", () => {
    const onChange = jest.fn();
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={items} onChange={onChange} />
    );
    wrapper.props().selectAllItems();
    wrapper.update();
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  test("can clear all items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT, ITEM_2.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    wrapper.props().clearAll();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([]);
  });

  test("clear all will trigger onChange", () => {
    const onChange = jest.fn();
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={items} onChange={onChange} />
    );
    wrapper.props().selectItem(EVENT, ITEM_2.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    wrapper.props().clearAll();
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  test("can select one item", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_1]);
  });

  test("select one item will trigger onChange", () => {
    const onChange = jest.fn();
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={items} onChange={onChange} />
    );
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([ITEM_1]);
  });

  test("can remove one item on 2nd click", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([]);
  });

  test("remove one item on 2nd click will trigger onChange", () => {
    const onChange = jest.fn();
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={items} onChange={onChange} />
    );
    wrapper.props().selectItem(ITEM_1.id);
    wrapper.update();
    wrapper.props().selectItem(ITEM_1.id);
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  test("sorts selection", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT, ITEM_2.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_3.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_1, ITEM_2, ITEM_3]);
  });

  test("keep selection order", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={manyItems} keepSelectionOrder />
    );
    wrapper.props().selectItem(EVENT, ITEM_2.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_3.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_22.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_12.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([
      ITEM_2,
      ITEM_1,
      ITEM_3,
      ITEM_22,
      ITEM_12
    ]);
  });

  test("select some items with selection order and then click on select all", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={manyItems} keepSelectionOrder />
    );
    wrapper.props().selectItem(EVENT, ITEM_2.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_22.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_3.id);
    wrapper.update();
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([
      ITEM_1,
      ITEM_2,
      ITEM_3,
      ITEM_4,
      ITEM_12,
      ITEM_22
    ]);
  });

  test("can filter items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().filterItems({ target: { value: "2" } });
    wrapper.update();
    expect(wrapper.prop("filteredItems")).toEqual([ITEM_3]);
  });

  test("can define selected items externally", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={items} selectedItems={[ITEM_2]} />
    );
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_2]);
    wrapper.setProps({ selectedItems: [ITEM_3] });
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_3]);
  });

  test("getList populates list", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent />);
    wrapper.props().getList("testRef");
    wrapper.update();
    expect(wrapper.instance().list).toBe("testRef");
  });

  test("handle Change tirggers update list and onChange", () => {
    const onChange = jest.fn();
    const update = jest.fn();
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent onChange={onChange} />);
    wrapper.props().getList({ update });
    wrapper.props().selectItem(EVENT, ITEM_2.id);
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledTimes(1);
  });

  test("componentWillReceiveProps will call setState when selectedItems change", () => {
    const state1 = [ITEM_3];
    const state2 = [ITEM_3];
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent selectedItems={state1} />);
    wrapper.setProps({ selectedItems: state2 });
    wrapper.update();
    expect(wrapper.state().selectedItems).toBe(state2);
    expect(wrapper.state().selectedItems).not.toBe(state1);
  });

  test("componentWillReceiveProps will call setState when items change", () => {
    const state1 = [ITEM_3];
    const state2 = [ITEM_4];
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={state1} />);
    wrapper.setProps({ items: state2 });
    wrapper.update();
    expect(wrapper.state().items).toBe(state2);
    expect(wrapper.state().items).not.toBe(state1);
  });

  test("componentWillReceiveProps will not call setState when items is the same", () => {
    const state1 = [ITEM_3];
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent selectedItems={state1} />);
    wrapper.setProps({ selectedItems: state1 });
    wrapper.update();
    expect(wrapper.state().selectedItems).toBe(state1);
  });

  test("componentWillReceiveProps will not call setState when selectedItems is the same", () => {
    const state1 = [ITEM_3];
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={state1} />);
    wrapper.setProps({ items: state1 });
    wrapper.update();
    expect(wrapper.state().items).toBe(state1);
  });

  test("can select with shift next items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const newItems = items.concat(ITEM_4);
    const wrapper = shallow(<ConditionalComponent items={newItems} />);
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_1.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_1]);
    expect(wrapper.state("firstItemShiftSelected")).toEqual(ITEM_1.id);
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_4.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([
      ITEM_1,
      ITEM_2,
      ITEM_3,
      ITEM_4
    ]);
  });

  test("can select with shift previous items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const newItems = items.concat(ITEM_4);
    const wrapper = shallow(<ConditionalComponent items={newItems} />);
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_4.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_4]);
    expect(wrapper.state("firstItemShiftSelected")).toEqual(ITEM_4.id);
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_2.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_2, ITEM_3, ITEM_4]);
  });

  test("can select with shift and filter", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const newItems = items.concat([ITEM_4, ITEM_12, ITEM_22]);
    const wrapper = shallow(<ConditionalComponent items={newItems} />);
    wrapper.props().filterItems({ target: { value: "2" } });
    wrapper.update();
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_3.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_22.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_3, ITEM_12, ITEM_22]);
  });

  test("selected item should not be removed if it doesn't exist in the filtered available items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT, ITEM_3.id);
    wrapper.update();
    wrapper.setProps({ items: [ITEM_1, ITEM_2] });
    wrapper.update();
    expect(wrapper.prop("items")).toEqual([ITEM_1, ITEM_2]);
    wrapper.props().selectItem(EVENT, ITEM_1.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_3, ITEM_1]);
  });

  test("selected item is removed when it 's being filtered from the available items and later click the select all", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT, ITEM_3.id);
    wrapper.update();
    wrapper.setProps({ items: [ITEM_1, ITEM_2] });
    wrapper.update();
    expect(wrapper.prop("items")).toEqual([ITEM_1, ITEM_2]);
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_3, ITEM_1, ITEM_2]);
  });

  test("selected item is removed when it 's being filtered from the available items and later click the un select all", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT, ITEM_3.id);
    wrapper.update();
    wrapper.setProps({ items: [ITEM_1, ITEM_2] });
    wrapper.update();
    expect(wrapper.prop("items")).toEqual([ITEM_1, ITEM_2]);
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_3, ITEM_1, ITEM_2]);
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_3]);
  });

  test("remove shiftKey in the middle ", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const newItems = items.concat([ITEM_4, ITEM_12, ITEM_22]);
    const wrapper = shallow(<ConditionalComponent items={newItems} />);
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_3.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT, ITEM_22.id);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_3, ITEM_22]);
  });

  test("add event listener when component mounted ", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    shallow(<ConditionalComponent />);
    expect(window.addEventListener).toHaveBeenCalled();
  });

  test("remove event listener when component unmount ", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent />);
    wrapper.unmount();
    expect(window.removeEventListener).toHaveBeenCalled();
  });

  test("simulate shift key up ", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_1.id);
    wrapper.update();
    wrapper.instance().onKeyUp(EVENT_WITH_SHIFT);
    expect(wrapper.state("firstItemShiftSelected")).toEqual(undefined);
  });

  test("simulate ctrl key up ", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_1.id);
    wrapper.update();
    wrapper.instance().onKeyUp(EVENT_WITH_CTRL);
    expect(wrapper.state("firstItemShiftSelected")).toEqual(ITEM_1.id);
  });

  test("set firstItemShiftSelected just with shift key", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT, ITEM_4.id);
    wrapper.update();
    expect(wrapper.state("firstItemShiftSelected")).toEqual(undefined);
  });

  test("select all items with filter", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(<ConditionalComponent items={items} />);
    wrapper.props().selectItem(EVENT, ITEM_3.id);
    wrapper.update();
    wrapper.props().filterItems({ target: { value: "0" } });
    wrapper.update();
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_1, ITEM_3]);
  });

  test("unselect all items with filter", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent items={items} selectedItems={items} />
    );
    wrapper.props().filterItems({ target: { value: "0" } });
    wrapper.update();
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([ITEM_2, ITEM_3]);
  });

  test("items are filtered on searchValue change", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const wrapper = shallow(
      <ConditionalComponent
        items={items}
        selectedItems={items}
        searchValue=""
      />
    );
    expect(wrapper.state("filteredItems")).toEqual(items);
    wrapper.setProps({ searchValue: ITEM_1.label });
    wrapper.update();
    expect(wrapper.state("filteredItems")).toEqual([ITEM_1]);
  });

  test("selected items  are filtered on searchValue trigger onChange ", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const searchSelectedItemsChanged = jest.fn();
    const selectedItems = [ITEM_1, ITEM_2, ITEM_3];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        searchSelectedItemsChanged={searchSelectedItemsChanged}
        selectedItems={selectedItems}
      />
    );

    wrapper.props().filterSelectedItems({ target: { value: "2" } });
    expect(searchSelectedItemsChanged).toHaveBeenCalledWith("2");
    expect(wrapper.prop("filteredSelectedItems")).toEqual([ITEM_3]);
  });

  test("unselected selected items for state filteredSelectedItems", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const searchSelectedItemsChanged = jest.fn();
    const items = [ITEM_1, ITEM_2, ITEM_3];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        searchSelectedItemsChanged={searchSelectedItemsChanged}
        items={items}
      />
    );

    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("filteredSelectedItems")).toEqual([
      ITEM_1,
      ITEM_2,
      ITEM_3
    ]);
  });

  test("select all items and filter selected items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const searchSelectedItemsChanged = jest.fn();
    const items = [ITEM_1, ITEM_2, ITEM_3];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        searchSelectedItemsChanged={searchSelectedItemsChanged}
        items={items}
      />
    );

    wrapper.props().selectAllItems();
    wrapper.props().filterSelectedItems({ target: { value: "item 1" } });
    wrapper.update();
    expect(wrapper.prop("filteredSelectedItems")).toEqual([ITEM_2]);
  });

  test("select all items change value and unselect all items for state filteredSelectedItems", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const searchSelectedItemsChanged = jest.fn();
    const items = [ITEM_1, ITEM_2, ITEM_3, ITEM_4];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        searchSelectedItemsChanged={searchSelectedItemsChanged}
        items={items}
      />
    );

    wrapper.props().selectAllItems();
    wrapper.update();
    wrapper.props().filterSelectedItems({ target: { value: "2" } });
    wrapper.update();
    wrapper.props().selectAllItems();
    wrapper.update();
    expect(wrapper.prop("filteredSelectedItems")).toEqual([]);
  });

  test("Use user search select all items change value for state filteredSelectedItems", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const searchSelectedItemsChanged = jest.fn();
    const items = [ITEM_1, ITEM_2, ITEM_3, ITEM_4];
    const UserSearch = props => <input type="text" {...props} />;

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        searchSelectedItemsChanged={searchSelectedItemsChanged}
        searchRenderer={UserSearch}
        items={items}
      />
    );

    wrapper.props().selectAllItems();
    wrapper.props().filterSelectedItems({ target: { value: "item 1" } });
    wrapper.update();
    expect(wrapper.prop("filteredSelectedItems")).toEqual([ITEM_2]);
  });

  test("selected item does not match for search value", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const searchSelectedItemsChanged = jest.fn();
    const items = [ITEM_1, ITEM_2, ITEM_3, ITEM_4];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        searchSelectedItemsChanged={searchSelectedItemsChanged}
        items={items}
      />
    );

    wrapper.props().selectItem(EVENT, ITEM_2.id);
    wrapper.update();
    wrapper.props().filterSelectedItems({ target: { value: "4" } });
    wrapper.update();
    expect(wrapper.prop("filteredSelectedItems")).toEqual([]);
  });

  test("items are filtered on searchSelectedItemsValue change", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const items = [ITEM_1, ITEM_2, ITEM_3, ITEM_4];
    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        items={items}
        searchSelectedItemsValue=""
      />
    );
    wrapper.props().selectAllItems();
    expect(wrapper.state("filteredSelectedItems")).toEqual(items);

    wrapper.props().filterSelectedItems({ target: { value: ITEM_1.label } });
    wrapper.update();
    expect(wrapper.state("filteredSelectedItems")).toEqual([ITEM_1]);
  });

  test("select all for locked items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const items = [ITEM_1, DISABLED_ITEM_23];
    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        items={items}
        selectedItems={[DISABLED_ITEM_23]}
        searchSelectedItemsValue=""
      />
    );
    wrapper.props().selectAllItems();
    expect(wrapper.state("filteredSelectedItems")).toEqual([
      ITEM_1,
      DISABLED_ITEM_23
    ]);
  });

  test("unselect locked items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const items = [ITEM_1, DISABLED_ITEM_23];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        items={items}
        selectedItems={[DISABLED_ITEM_23]}
        searchSelectedItemsValue=""
      />
    );

    wrapper.props().selectAllItems();
    expect(wrapper.state("filteredSelectedItems")).toEqual([
      ITEM_1,
      DISABLED_ITEM_23
    ]);

    wrapper.props().unselectItems([ITEM_1.id, DISABLED_ITEM_23.id]);
    expect(wrapper.state("selectedItems")).toEqual([DISABLED_ITEM_23]);
  });

  test("unselect all items for locked items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const items = [ITEM_1, ITEM_2, ITEM_3, ITEM_4, DISABLED_ITEM_23];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        items={items}
        selectedItems={items}
        searchSelectedItemsValue=""
      />
    );

    wrapper.props().selectAllItems();
    expect(wrapper.state("selectedItems")).toEqual([DISABLED_ITEM_23]);
  });

  test("filter locked items in source list", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const items = [ITEM_1, ITEM_2, ITEM_3, ITEM_4, DISABLED_ITEM_23];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        items={items}
        selectedItems={[DISABLED_ITEM_23]}
        searchSelectedItemsValue=""
      />
    );

    wrapper.props().filterItems({ target: { value: DISABLED_ITEM_23.label } });
    wrapper.update();
    expect(wrapper.state("filteredItems")).toEqual([DISABLED_ITEM_23]);
  });

  test("unselect locked items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const items = [ITEM_1, DISABLED_ITEM_23];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        items={items}
        selectedItems={[DISABLED_ITEM_23]}
        searchSelectedItemsValue=""
      />
    );

    wrapper.props().unselectItems([DISABLED_ITEM_23.id]);
    expect(wrapper.state("selectedItems")).toEqual([DISABLED_ITEM_23]);
  });

  test("filter in destination list locked items", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const items = [ITEM_1, ITEM_2, ITEM_3, ITEM_4, DISABLED_ITEM_23];

    const wrapper = shallow(
      <ConditionalComponent
        showSelectedItemsSearch={true}
        items={items}
        selectedItems={items}
        searchSelectedItemsValue=""
      />
    );

    wrapper
      .props()
      .filterSelectedItems({ target: { value: DISABLED_ITEM_23.label } });
    wrapper.update();
    expect(wrapper.state("filteredSelectedItems")).toEqual([DISABLED_ITEM_23]);
  });

  test("case select with shift items for (selected & disabled) and disabled", () => {
    const ConditionalComponent = withMultiSelectState(CustomComponent);
    const items = [
      ITEM_1,
      { id: 1, label: "item 1", disabled: true },
      ITEM_3,
      { id: 3, label: "item 3", disabled: true },
      { id: 4, label: "item 4" }
    ];

    const selectedItems = [{ id: 1, label: "item 1", disabled: true }];

    const wrapper = shallow(
      <ConditionalComponent items={items} selectedItems={selectedItems} />
    );
    wrapper.props().selectItem(EVENT_WITH_SHIFT, ITEM_1.id);
    wrapper.update();
    wrapper.props().selectItem(EVENT_WITH_SHIFT, 4);
    wrapper.update();
    expect(wrapper.prop("selectedItems")).toEqual([
      items[0],
      items[1],
      items[2],
      items[4]
    ]);
  });
});
