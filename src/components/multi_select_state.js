import React, { PureComponent } from "react";

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

      const { items, selectedItems } = props;
      this.state = {
        selectedItems,
        items,
        filteredItems: items,
        filteredSelectedItems: [],
        selectItemValue: ""
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.selectedItems !== nextProps.selectedItems) {
        this.setState({ selectedItems: nextProps.selectedItems });
      }

      if (this.props.items !== nextProps.items) {
        this.setState({
          items: nextProps.items,
          filteredItems: nextProps.items
        });
      }

      if (this.props.searchValue !== nextProps.searchValue) {
        this.filterItems({ target: { value: nextProps.searchValue } });
      }

      if (
        this.props.searchSelectedItemsValue !==
        nextProps.searchSelectedItemsValue
      ) {
        this.setState({ selectItemValue: nextProps.searchSelectedItemsValue });
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
            filteredItems.find(filteredItem => item.id === filteredItem.id)) ||
          selectedItems.find(selectedItem => item.id === selectedItem.id)
      );
      this.setState({ selectedItems: newSelectedItems }, this.handleChange);
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
        item =>
          item.id === itemId ||
          selectedItems.find(selectedItem => item.id === selectedItem.id)
      );
      const destinationItems = selectedItems.filter(
        selectedItem => !items.find(item => item.id === selectedItem.id)
      );

      return [...destinationItems, ...sourceItems];
    }

    componentDidMount() {
      window.addEventListener("keyup", this.onKeyUp);
    }

    componentDidUpdate(nextProps, nextState) {
      const {
        selectedItems,
        selectItemValue,
        filteredSelectedItems
      } = this.state;
      const { showSelectedItemsSearch, filterFunction } = this.props;
      if (
        showSelectedItemsSearch &&
        selectedItems !== nextState.selectedItems &&
        nextState.filteredSelectedItems != filteredSelectedItems
      ) {
        this.setState({
          filteredSelectedItems: selectedItems.filter(
            filterFunction(selectItemValue)
          )
        });
      }
      if (selectedItems !== nextState.selectedItems && !selectedItems.length) {
        this.setState({
          filteredSelectedItems: []
        });
      }
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
      const {
        selectedItems,
        firstItemShiftSelected,
        filteredSelectedItems
      } = this.state;
      if (!selectedItems.find(item => item.id === id)) {
        if (event.shiftKey && firstItemShiftSelected !== undefined) {
          this.handleMultiSelection(items.findIndex(item => item.id === id));
        } else {
          if (event.shiftKey && firstItemShiftSelected === undefined) {
            const index = items.findIndex(item => item.id === id);
            this.setState({ firstItemShiftSelected: index });
          }

          const newSelectedItems = this.getNewSelectedItems(id);

          const newFilteredSelectedItem = newSelectedItems.filter(
            el => el.id == id
          );

          this.setState(
            {
              selectedItems: newSelectedItems,
              filteredSelectedItems: [
                ...filteredSelectedItems,
                ...newFilteredSelectedItem
              ]
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

      const newSelectedItems = selectedItems.filter(
        item => ids.find(id => id === item.id) === undefined
      );
      const newFilteredSelectedItems = filteredSelectedItems.filter(
        item => item.id !== ids[0]
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
      this.setState(
        { selectedItems: [], filteredSelectedItems: [] },
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
      const { filterFunction, searchSelectedItemsChanged } = this.props;
      const { value } = event.target;
      const { selectedItems } = this.state;

      this.setState({
        filteredSelectedItems: selectedItems.filter(filterFunction(value))
      });
      searchSelectedItemsChanged && searchSelectedItemsChanged(value);
    }
    selectAllItems() {
      const { filteredItems, selectedItems } = this.state;
      const { items } = this.props;
      if (this.isAllSelected()) {
        this.unselectItems(filteredItems.map(filteredItem => filteredItem.id));
      } else {
        const sourceItems = items.filter(
          item =>
            filteredItems.find(
              filteredItem => item.id === filteredItem.id && !item.disabled
            ) || selectedItems.find(selectedItem => item.id === selectedItem.id)
        );
        const destinationItems = selectedItems.filter(
          selectedItem =>
            !filteredItems.find(
              filteredItem => selectedItem.id === filteredItem.id
            ) && !items.find(item => selectedItem.id === item.id)
        );
        this.setState(
          { selectedItems: [...destinationItems, ...sourceItems] },
          this.handleChange
        );
      }
      this.setState({
        filteredSelectedItems: this.state.selectedItems.filter(
          this.props.filterFunction(this.state.selectItemValue)
        )
      });
    }

    isAllSelected() {
      const { filteredItems, selectedItems } = this.state;
      const selectedItemsInFilteredItems = selectedItems.filter(selectedItem =>
        filteredItems.find(item => item.id === selectedItem.id)
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
          filterSelectedItems={this.filterSelectedItems}
          selectAllItems={this.selectAllItems}
          isAllSelected={this.isAllSelected()}
          clearAll={this.clearAll}
          getList={this.getList}
        />
      );
    }
  };

export default withMultiSelectState;
