import React from 'react';
import { shallow, mount } from 'enzyme';

import MultiSelectionList, {DEFAULT_MS_DELAY_ONCHANGE_FOR_LAZY_LOADING} from '../../../src/components/multiselectionlist/multiselection_list';
import ListNavigation from '../../../src/components/multiselectionlist/multiselection_navigation';
import ListItems from '../../../src/components/multiselectionlist/multiselection_items';
import Input from '../../../src/components/input/input_text';
import styles from '../../../src/components/multiselectionlist/multiselection_list.scss';
import {MOVE} from '../../../src/components/multiselectionlist/multiselection_list.constants';

describe('MultiSelectionList tests:', () => {

  test('contains style', () => {
    const component = shallow(<MultiSelectionList />);
    const cmp = component.find(`.${styles.multi_selection_list}`);
    expect(cmp.length).toBe(1);
  });

  test('contains input filter', () => {
    const component = shallow(<MultiSelectionList />);
    const elm = component.find(Input);
    expect(elm.length).toBe(1);
  });

  test('doesnt contain navigation by default', () => {
    const component = shallow(<MultiSelectionList />);
    const elm = component.find(ListNavigation);
    expect(elm.length).toBe(0);
    expect(component.props().className).not.toContain('navigation_list');
  });

  it('renders list items by default', () => {
    const component = shallow(<MultiSelectionList/>);

    const listItems = component.find(ListItems);
    expect(listItems.length).toBe(1);
  });

  it('passes right props to list items', () => {
    const inputProps = {
      groups: [{id: 1}],
      filterResultsText: 'testFilterResultsText',
      emptyText: 'testEmptyText'
    };
    const component = shallow(<MultiSelectionList {...inputProps}/>);

    const listItems = component.find(ListItems);
    expect(listItems.props().groups).toEqual(inputProps.groups);
    expect(listItems.props().filterResultsText).toEqual(inputProps.filterResultsText);
    expect(listItems.props().emptyText).toEqual(inputProps.emptyText);
  });

  it.skip('passes search term to list items', () => {
    const searchTerm = 'testSearch';
    const component = shallow(<MultiSelectionList/>);

    const listFilter = component.find(Input);
    listFilter.props().onChange({target: {value: searchTerm}});

    const listItems = component.find(ListItems);
    expect(listItems.props().searchTerm).toEqual(searchTerm);
  });

  it('handles onSelectGroupClick right', () => {
    const items = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

    const component = shallow(<MultiSelectionList items={items}/>);
    component.state().selected = [4];

    const listItems = component.find(ListItems);
    listItems.props().onSelectGroupClick([1, 3]);

    expect(component.state().selected.length).toBe(3);
    expect(component.state().selected).toEqual([4, 1, 3]);
  });

    it('handles onDeselectGroupClick right', () => {
        const items = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];

        const component = shallow(<MultiSelectionList items={items}/>);
        component.state().selected = [1, 4, 3];

        const listItems = component.find(ListItems);
        listItems.props().onDeselectGroupClick([1, 3]);

        expect(component.state().selected.length).toBe(1);
        expect(component.state().selected).toEqual([4]);
    });

  it('handles moveItem UP right', () => {
    const item1 = {id: 1};
    const item2 = {id: 2};
    const item3 = {id: 3};
    let isOnOrderChangedCalled = false;

    const component = shallow(<MultiSelectionList
        items={[item1, item2, item3]}
        withNavigation={true}
        onOrderChanged={()=>isOnOrderChangedCalled=true}
    />);
    component.setState({selected: [2]});

    const listNavigation = component.find(ListNavigation);
    listNavigation.props().onNavigationClick(MOVE.UP)();

    expect(isOnOrderChangedCalled).toBe(true);
    expect(component.state().items.length).toBe(3);
    expect(component.state().items[0].id).toBe(item2.id);
    expect(component.state().items[1].id).toBe(item1.id);
    expect(component.state().items[2].id).toBe(item3.id);
  });

  it('handles moveItem DOWN right', () => {
      const item1 = {id: 1};
      const item2 = {id: 2};
      const item3 = {id: 3};
      let isOnOrderChangedCalled = false;

      const component = shallow(<MultiSelectionList
          items={[item1, item2, item3]}
          withNavigation={true}
          onOrderChanged={()=>isOnOrderChangedCalled=true}
      />);
      component.setState({selected: [2]});

      const listNavigation = component.find(ListNavigation);
      listNavigation.props().onNavigationClick(MOVE.DOWN)();

      expect(isOnOrderChangedCalled).toBe(true);
      expect(component.state().items.length).toBe(3);
      expect(component.state().items[0].id).toBe(item1.id);
      expect(component.state().items[1].id).toBe(item3.id);
      expect(component.state().items[2].id).toBe(item2.id);
  });

  it('marks locked item with specific class', () => {
      const items = [{id: 1, locked: true}];
      const isItemLockedFn = (item) => item.locked;

      const component = mount(<MultiSelectionList
          items={items}
          isItemLockedFn={isItemLockedFn}
      />);

      const listItems = component.find('li');
      expect(listItems.length).toBe(1);

      const lockedItem = listItems.get(0);
      expect(lockedItem.props.className.includes(styles.locked)).toBe(true);
  });

  it('disables up navigation for first after locked item', () => {
      const lockedItem = {id: 1, locked: true};
      const simpleItem = {id: 2};
      const isItemLockedFn = (item) => item.locked;

      const component = mount(<MultiSelectionList
          items={[lockedItem, simpleItem]}
          withNavigation = {true}
          isItemLockedFn={isItemLockedFn}
      />);
      component.setState({selected: [simpleItem.id]});

      const navigation = component.find(ListNavigation);
      expect(navigation.props().disabledNavigation.up).toBe(true);
  });

  it('disables navigation when search term is entered', () => {
      const lockedItem = {id: 1, locked: true};
      const simpleItem = {id: 2};
      const isItemLockedFn = (item) => item.locked;

      const component = mount(<MultiSelectionList
          searchTerm="i am not empty"
          items={[lockedItem, simpleItem]}
          withNavigation = {true}
          isItemLockedFn={isItemLockedFn}
      />);
      component.setState({selected: [simpleItem.id]});

      const navigation = component.find(ListNavigation);
      expect(navigation.props().disabledNavigation.up).toBe(true);
      expect(navigation.props().disabledNavigation.down).toBe(true);
  });

  it('prevents only locked item from select', () => {
      const inputLockedItem = {id: 1, locked: true};
      const inputSimpleItem = {id: 2};
      const isItemLockedFn = (item) => item.locked;

      const component = mount(<MultiSelectionList
          items={[inputLockedItem, inputSimpleItem]}
          isItemLockedFn={isItemLockedFn}
      />);

      const listItems = component.find('li');
      expect(listItems.length).toBe(2);

      const lockedItem = listItems.get(0);
      lockedItem.props.onClick({});
      expect(component.state().selected.length).toBe(0);

      const simpleItem = listItems.get(1);
      simpleItem.props.onClick({});
      expect(component.state().selected.length).toBe(1);
      expect(component.state().selected[0]).toBe(inputSimpleItem.id);
  });

  it('prevents only locked item from double-click', () => {
      const inputLockedItem = {id: 1, locked: true};
      const inputSimpleItem = {id: 2};
      let isDoubleClicked = false;
      const onDoubleClick = () => isDoubleClicked=true;
      const isItemLockedFn = (item) => item.locked;

      const component = mount(<MultiSelectionList
          items={[inputLockedItem, inputSimpleItem]}
          isItemLockedFn={isItemLockedFn}
          onDoubleClick={onDoubleClick}
      />);

      const listItems = component.find('li');
      expect(listItems.length).toBe(2);

      const lockedItem = listItems.get(0);
      lockedItem.props.onDoubleClick();
      expect(isDoubleClicked).toBe(false);

      const simpleItem = listItems.get(1);
      simpleItem.props.onDoubleClick();
      expect(isDoubleClicked).toBe(true);
  });

  it('prevents only locked item from select by dragging', () => {
      const inputLockedItem = {id: 1, locked: true};
      const inputSimpleItem = {id: 2};
      const isItemLockedFn = (item) => item.locked;

      const component = mount(<MultiSelectionList
          items={[inputLockedItem, inputSimpleItem]}
          isItemLockedFn={isItemLockedFn}
      />);

      const listItems = component.find('li');
      expect(listItems.length).toBe(2);

      const lockedItem = listItems.get(0);
      lockedItem.props.onDragStart();
      expect(component.state().selected.length).toBe(0);

      const simpleItem = listItems.get(1);
      simpleItem.props.onDragStart();
      expect(component.state().selected.length).toBe(1);
      expect(component.state().selected[0]).toBe(inputSimpleItem.id);
  });

  it('handles dragSelectedItems case move up', () => {
      const item1 = {id: 1};
      const item2 = {id: 2};
      const item3 = {id: 3};
      const item4 = {id: 4};
      const component = mount(<MultiSelectionList
          items={[item1, item2, item3, item4]}
      />);

      const dragToIndex = 4;
      const listItems = component.find(ListItems);
      component.state().selected = [item1.id, item3.id];
      listItems.props().dragSelectedItems(dragToIndex);

      const actualItems = component.state().items;
      expect(actualItems.length).toBe(dragToIndex);
      expect(actualItems[0].id).toBe(item2.id);
      expect(actualItems[1].id).toBe(item4.id);
      expect(actualItems[2].id).toBe(item1.id);
      expect(actualItems[3].id).toBe(item3.id);
  });

    it('handles dragSelectedItems case move down', () => {
        const item1 = {id: 1};
        const item2 = {id: 2};
        const item3 = {id: 3};
        const item4 = {id: 4};
        const component = mount(<MultiSelectionList
            items={[item1, item2, item3, item4]}
        />);

        const dragToIndex = 0;
        const listItems = component.find(ListItems);
        component.state().selected = [item2.id, item4.id];
        listItems.props().dragSelectedItems(dragToIndex);

        const actualItems = component.state().items;
        expect(actualItems.length).toBe(4);
        expect(actualItems[0].id).toBe(item2.id);
        expect(actualItems[1].id).toBe(item4.id);
        expect(actualItems[2].id).toBe(item1.id);
        expect(actualItems[3].id).toBe(item3.id);
    });

    it('handles dragSelectedItems case move to center', () => {
        const item1 = {id: 1};
        const item2 = {id: 2};
        const item3 = {id: 3};
        const item4 = {id: 4};
        const component = mount(<MultiSelectionList
            items={[item1, item2, item3, item4]}
        />);

        const dragToIndex = 2;
        const listItems = component.find(ListItems);
        component.state().selected = [item1.id, item4.id];
        listItems.props().dragSelectedItems(dragToIndex);

        const actualItems = component.state().items;
        expect(actualItems.length).toBe(4);
        expect(actualItems[0].id).toBe(item2.id);
        expect(actualItems[1].id).toBe(item1.id);
        expect(actualItems[2].id).toBe(item4.id);
        expect(actualItems[3].id).toBe(item3.id);
    });

    test('doesnt sort items by default', () => {
        const displayFn = (item) => item.label;
        const items = [{id: 1, label: 'ztest'}, {id: 2, label: 'atest'}];

        const multiselectionList = mount(<MultiSelectionList displayFn={displayFn} items={items}/>);
        const item = multiselectionList.find('li').get(0);
        item.props.onClick({});

        const actualItems = multiselectionList.state().items;
        expect(actualItems.length).toBe(2);
        expect(actualItems[0].label).toBe('ztest');
        expect(actualItems[1].label).toBe('atest');
    });

    test('sorts items when configured', () => {
        const displayFn = (item) => item.label;
        const items = [{id: 1, label: 'ztest'}, {id: 2, label: 'atest'}];
        const sortFn = (items) => items.sort((a, b)=> {
            if(a.label<b.label) return -1;
            if(a.label>b.label) return 1;
            return 0;
        });

        const multiselectionList = mount(<MultiSelectionList displayFn={displayFn} items={items} sortFn={sortFn}/>);
        const item = multiselectionList.find('li').get(0);
        item.props.onClick({});

        const actualItems = multiselectionList.state().items;
        expect(actualItems.length).toBe(2);
        expect(actualItems[0].label).toBe('atest');
        expect(actualItems[1].label).toBe('ztest');
    });

    test('doesnt change items order when selection is changed', () => {
        const displayFn = (item) => item.label;
        const items = [{id: 1, label: 'ztest'}, {id: 2, label: 'atest'}];
        const groups = [{id: 3, label: 'Group 1', selectGroupLabel: 'Select All', itemIds: [1, 2]}];
        const sortFn = (items) => items.sort((a, b)=> {
            if(a.label<b.label) return -1;
            if(a.label>b.label) return 1;
            return 0;
        });

        const multiselectionList = mount(<MultiSelectionList displayFn={displayFn} items={items} groups={groups} sortFn={sortFn}/>);
        const item = multiselectionList.find('li').get(1);
        item.props.onClick({});

        const actualItems = multiselectionList.state().items;
        expect(actualItems.length).toBe(2);
        expect(actualItems[0].label).toBe('ztest');
        expect(actualItems[1].label).toBe('atest');
    });

    test('doesnt change grouped items order when selection is changed', () => {
        const displayFn = (item) => item.label;
        const items = [{id: 1, label: 'ztest'}, {id: 2, label: 'atest'}];
        const sortFn = (items) => items.sort((a, b)=> {
            if(a.label<b.label) return -1;
            if(a.label>b.label) return 1;
            return 0;
        });

        const multiselectionList = mount(<MultiSelectionList displayFn={displayFn} items={items} sortFn={sortFn}/>);
        const item = multiselectionList.find('li').get(1);
        item.props.onClick({});

        const actualItems = multiselectionList.state().items;
        expect(actualItems.length).toBe(2);
        expect(actualItems[0].label).toBe('atest');
        expect(actualItems[1].label).toBe('ztest');
    });

    test('resets state on receiving new properties', () => {
        const initialItems = [{id: 1, locked: false}, {id: 2, locked: true}];
        const selectedIds = [2];
        const isItemLockedFn = ({locked}) => locked;
        const component = mount(<MultiSelectionList items={initialItems} isItemLockedFn={isItemLockedFn}/>);

        component.setState({selected: [2], lastSelectedIndex: 1});
        const items = [{id: 1, locked: false}, {id: 2, locked: false}];
        component.instance().componentWillReceiveProps({items, isItemLockedFn, selectedIds});

        expect(component.state().items).toEqual(items);
        expect(component.state().selected).toEqual(selectedIds);
        expect(component.state().lastSelectedIndex).toEqual(null);
    });

    test('doesnt reset state when items not changed', () => {
        const items = [{id: 1, locked: false}, {id: 2, locked: true}];
        const selectedIds = [];
        const isItemLockedFn = ({locked}) => locked;
        const component = mount(<MultiSelectionList items={items} isItemLockedFn={isItemLockedFn}/>);

        component.setState({selected: [2], lastSelectedIndex: 1});
        component.instance().componentWillReceiveProps({items, isItemLockedFn, selectedIds});

        expect(component.state().items).toEqual(items);
        expect(component.state().selected).toEqual([2]);
        expect(component.state().lastSelectedIndex).toEqual(1);
    });

    test('passes msDelayOnChange to input filter', () => {
        const msDelayOnChangeFilter = 800;
        const component = mount(<MultiSelectionList msDelayOnChangeFilter ={msDelayOnChangeFilter}/>);

        const input = component.find(Input);
        expect(input.props().msDelayOnChange).toBe(msDelayOnChangeFilter);
    });

    test('passes msDelayOnChange and autoFocusForRerender to input filter when lazyLoad passed', () => {
        const component = mount(<MultiSelectionList lazyLoad/>);

        const input = component.find(Input);
        expect(input.props().msDelayOnChange).toEqual(DEFAULT_MS_DELAY_ONCHANGE_FOR_LAZY_LOADING);
        expect(input.props().autoFocusForRerender).toBe(true);
    });

    it('render component with selected items list', () => {
        const items = [{id: 1},{id: 2},{id: 3}];
        const selectedItems = [1];

        const component = shallow(<MultiSelectionList items={items} selectedIds={selectedItems} />);
        expect(component.state().selected).toBe(selectedItems);
    });

    test('passes handleMultiSelect if have locked column', () => {
        const items = [{id: 1, locked: true}, {id: 2, locked: false}, {id: 3, locked: false}, {id: 4, locked: false}];
        const isItemLockedFn = ({locked}) => locked;
        const component = mount(<MultiSelectionList items={items} isItemLockedFn={isItemLockedFn}/>);

        component.setState({selected: [2], lastSelectedIndex: 1});
        component.instance().handleMultiSelect(4);

        expect(component.state().selected).toEqual([2, 3, 4]);
    });

    it('render component with selected items list with selectAll option', () => {
        const items = [1,2,3];
        const selectedIds = [1,2,3];
        const isItemLockedFn = ({locked}) => locked;

        const component = shallow(<MultiSelectionList items={items} selectedIds={selectedIds} withSelectAll={true}/>);
        expect(component.state().selectedAll).toBe(true);

    });
});
