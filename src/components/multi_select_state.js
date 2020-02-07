import React, { PureComponent } from "react";
import {
  getSelectedByAllItems,
  filterUnselectedByIds,
  findItem,
  getMinMaxIndexes,
  isWithin,
  getNewSelectedItems,
  getSelectedItemsByGroup
} from "./multi_select_state_utils";

const withMultiSelectState = WrappedComponent =>
  class extends PureComponent {
    static defaultProps = {
      filterFunction: value => item =>
        String(item.label)
          .toLowerCase()
          .includes(value.toLowerCase()),
      items: [],
      selectedItems: [],
      isLocked: item => item.disabled
    };

    constructor(props) {
      super(props);
      this.selectItem = this.selectItem.bind(this);
      this.unselectItems = this.unselectItems.bind(this);
      this.filterItems = this.filterItems.bind(this);
      this.selectAllItems = this.selectAllItems.bind(this);
      this.isAllSelected = this.isAllSelected.bind(this);
      this.clearAll = this.clearAll.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getList = this.getList.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.filterSelectedItems = this.filterSelectedItems.bind(this);
      this.selectGroup = this.selectGroup.bind(this);
      this.getNewFilteredSelectedItems = this.getNewFilteredSelectedItems.bind(
        this
      );
      const { items, selectedItems } = props;
      this.selectedItemsFilterFunction =
        props.selectedItemsFilterFunction || props.filterFunction;
      this.state = {
        selectedItems,
        items,
        filteredItems: items,
        filteredSelectedItems: selectedItems
      };
    }

    componentWillReceiveProps(nextProps) {
      const { searchValue, searchSelectedItemsValue } = this.props;
      if (this.props.selectedItems !== nextProps.selectedItems) {
        this.setState({
          selectedItems: nextProps.selectedItems,
          filteredSelectedItems: nextProps.selectedItems
        });
      }
      if (this.props.items !== nextProps.items) {
        const { items } = nextProps;
        this.setState({ items, filteredItems: items });
      }
      if (searchValue !== nextProps.searchValue) {
        this.filterItems({ target: { value: nextProps.searchValue } });
      }
      if (searchSelectedItemsValue !== nextProps.searchSelectedItemsValue) {
        this.filterSelectedItems({
          target: { value: nextProps.searchSelectedItemsValue }
        });
      }
    }

    handleMultiSelection(index) {
      const { items, isLocked } = this.props;
      const { filteredItems, firstItemShiftSelected } = this.state;

      const interval = getMinMaxIndexes(index, firstItemShiftSelected);
      const newSelectedItems = items.filter(
        (item, index) =>
          (isWithin(index, interval) &&
            !isLocked(item) &&
            findItem(item, filteredItems)) ||
          findItem(item, this.state.selectedItems)
      );
      const newFilteredSelectedItems = this.getNewFilteredSelectedItems(
        newSelectedItems
      );
      this.setState(
        {
          selectedItems: newSelectedItems,
          filteredSelectedItems: newFilteredSelectedItems
        },
        this.handleChange
      );
    }

    getNewFilteredSelectedItems(items) {
      const { searchSelectedItemsValue } = this.props;

      return searchSelectedItemsValue
        ? items.filter(
            this.selectedItemsFilterFunction(searchSelectedItemsValue)
          )
        : items;
    }
    componentDidMount() {
      window.addEventListener("keyup", this.onKeyUp);
    }
    componentWillUnmount() {
      window.removeEventListener("keyup", this.onKeyUp, false);
    }

    onKeyUp(event) {
      if (event.keyCode === 16) {
        this.setState({ firstItemShiftSelected: undefined });
      }
    }

    selectItem(event, id) {
      const { items } = this.props;
      const { selectedItems, firstItemShiftSelected } = this.state;
      if (!selectedItems.find(item => item.id === id)) {
        if (event.shiftKey && firstItemShiftSelected !== undefined) {
          this.handleMultiSelection(items.findIndex(item => item.id === id));
        } else {
          if (event.shiftKey && firstItemShiftSelected === undefined) {
            const index = items.findIndex(item => item.id === id);
            this.setState({ firstItemShiftSelected: index });
          }
          this.setNewItemsBySelectItem(id, items, selectedItems);
        }
      } else {
        this.unselectItems([id]);
      }
    }

    setNewItemsBySelectItem(id, items, selectedItems) {
      const newSelectedItems = getNewSelectedItems(id, items, selectedItems);
      const newFilteredSelectedItems = this.getNewFilteredSelectedItems(
        newSelectedItems
      );
      this.setState(
        {
          selectedItems: newSelectedItems,
          filteredSelectedItems: newFilteredSelectedItems
        },
        this.handleChange
      );
    }
    unselectItems(ids) {
      const { selectedItems, filteredSelectedItems } = this.state;
      const { isLocked } = this.props;
      const newSelectedItems = filterUnselectedByIds(
        selectedItems,
        ids,
        isLocked
      );
      const newFilteredSelectedItems = filterUnselectedByIds(
        filteredSelectedItems,
        ids,
        isLocked
      );
      this.setState(
        {
          selectedItems: newSelectedItems,
          filteredSelectedItems: newFilteredSelectedItems
        },
        this.handleChange
      );
    }

    clearAll() {
      const { selectedItems, isLocked } = this.props;
      const lockedItems = selectedItems.filter(isLocked);
      this.setState(
        {
          selectedItems: lockedItems,
          filteredSelectedItems: lockedItems
        },
        this.handleChange
      );
    }

    filterItems(event) {
      const { items, filterFunction, searchValueChanged } = this.props;
      const { value } = event.target;
      this.setState({ filteredItems: items.filter(filterFunction(value)) });
      searchValueChanged && searchValueChanged(value);
    }

    filterSelectedItems(event) {
      const { searchSelectedItemsChanged } = this.props;
      const { value } = event.target;
      const { selectedItems } = this.state;
      this.setState({
        filteredSelectedItems: selectedItems.filter(
          this.selectedItemsFilterFunction(value)
        )
      });
      searchSelectedItemsChanged && searchSelectedItemsChanged(value);
    }

    selectAllItems() {
      const { filteredItems, selectedItems } = this.state;
      const { items } = this.props;
      if (this.isAllSelected()) {
        this.unselectItems(filteredItems.map(filteredItem => filteredItem.id));
      } else {
        const newSelectItems = getSelectedByAllItems(
          filteredItems,
          selectedItems,
          items
        );
        const newFilteredSelectedItems = this.getNewFilteredSelectedItems(
          newSelectItems
        );
        this.setState(
          {
            selectedItems: newSelectItems,
            filteredSelectedItems: newFilteredSelectedItems
          },
          this.handleChange
        );
      }
    }

    isAllSelected() {
      const { filteredItems, selectedItems } = this.state;
      const { isLocked } = this.props;
      const selectedItemsInFilteredItems = selectedItems.filter(
        selectedItem =>
          !isLocked(selectedItem) && findItem(selectedItem, filteredItems)
      );
      const selectableFilteredItems = filteredItems.filter(
        item => !isLocked(item)
      );
      return (
        selectedItemsInFilteredItems.length ===
          selectableFilteredItems.length && selectableFilteredItems.length > 0
      );
    }

    handleChange() {
      const { onChange } = this.props;
      const { selectedItems } = this.state;
      this.list && this.list.update();
      onChange && onChange(selectedItems);
    }

    getList(ref) {
      this.list = ref;
    }

    selectGroup(group) {
      const newSelectedItems = getSelectedItemsByGroup(
        this.state.items,
        this.state.selectedItems,
        group
      );
      const newFilteredSelectedItems = this.getNewFilteredSelectedItems(
        newSelectedItems
      );
      this.setState(
        {
          selectedItems: newSelectedItems,
          filteredSelectedItems: newFilteredSelectedItems
        },
        this.handleChange
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          unselectItems={this.unselectItems}
          unselectGroup={this.selectGroup}
          selectItem={this.selectItem}
          selectGroup={this.selectGroup}
          filterItems={this.filterItems}
          selectAllItems={this.selectAllItems}
          isAllSelected={this.isAllSelected()}
          clearAll={this.clearAll}
          getList={this.getList}
          filterSelectedItems={this.filterSelectedItems}
        />
      );
    }
  };

export default withMultiSelectState;
