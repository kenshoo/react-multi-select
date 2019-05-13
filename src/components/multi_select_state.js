import React, { PureComponent } from "react";
import {
  getSelectedByAllItems,
  filterUnselectedByIds,
  findItem,
  getLockedItems,
  findEnabledItem
} from "./multi_select_state_utils";

const withMultiSelectState = WrappedComponent =>
  class extends PureComponent {
    static defaultProps = {
      filterFunction: value => item =>
        String(item.label)
          .toLowerCase()
          .includes(value.toLowerCase()),
      items: [],
      selectedItems: []
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
        this.setState({ selectedItems: nextProps.selectedItems });
      }
      if (this.props.items !== nextProps.items) {
        this.setState({
          items: nextProps.items,
          filteredItems: nextProps.items
        });
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
      const { items } = this.props;
      const { selectedItems, filteredItems } = this.state;

      const { minIndex, maxIndex } = this.getMinMaxIndexes(index);
      const newSelectedItems = items.filter(
        (item, index) =>
          (index >= minIndex &&
            index <= maxIndex &&
            findEnabledItem(item, filteredItems)) ||
          findItem(item, selectedItems)
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

    getMinMaxIndexes(currentIndex) {
      const { firstItemShiftSelected } = this.state;
      return firstItemShiftSelected > currentIndex
        ? { minIndex: currentIndex, maxIndex: firstItemShiftSelected }
        : { minIndex: firstItemShiftSelected, maxIndex: currentIndex };
    }

    getNewSelectedItems(itemId) {
      const { items } = this.props;
      const { selectedItems } = this.state;
      const sourceItems = items.filter(
        item => item.id === itemId || findItem(item, selectedItems)
      );
      const destinationItems = selectedItems.filter(
        selectedItem => !findItem(selectedItem, items)
      );
      return [...destinationItems, ...sourceItems];
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
          const newSelectedItems = this.getNewSelectedItems(id);
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
      } else {
        this.unselectItems([id]);
      }
    }

    unselectItems(ids) {
      const { selectedItems, filteredSelectedItems } = this.state;
      const newSelectedItems = filterUnselectedByIds(selectedItems, ids);
      const newFilteredSelectedItems = filterUnselectedByIds(
        filteredSelectedItems,
        ids
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
      const lockedItems = getLockedItems(this.props.selectedItems);
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
      this.setState({
        filteredItems: items.filter(filterFunction(value))
      });
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
      const selectedItemsInFilteredItems = selectedItems.filter(selectedItem =>
        findEnabledItem(selectedItem, filteredItems)
      );
      const selectableFilteredItems = filteredItems.filter(
        item => !item.disabled
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

    render() {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
          unselectItems={this.unselectItems}
          selectItem={this.selectItem}
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
