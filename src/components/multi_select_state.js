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

      const { items, selectedItems } = props;
      this.state = {
        selectedItems,
        items,
        filteredItems: items
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
          this.setState({ selectedItems: newSelectedItems }, this.handleChange);
        }
      } else {
        this.unselectItems([id]);
      }
    }

    unselectItems(ids) {
      const { selectedItems } = this.state;
      const newSelectedItems = selectedItems.filter(
        item => ids.find(id => id === item.id) === undefined
      );
      this.setState(
        {
          selectedItems: newSelectedItems
        },
        this.handleChange
      );
    }

    clearAll() {
      this.setState({ selectedItems: [] }, this.handleChange);
    }

    filterItems(event) {
      const { items, filterFunction, searchValueChanged } = this.props;
      const { value } = event.target;
      this.setState({
        filteredItems: items.filter(filterFunction(value))
      });

      searchValueChanged && searchValueChanged(value);
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
          selectAllItems={this.selectAllItems}
          isAllSelected={this.isAllSelected()}
          clearAll={this.clearAll}
          getList={this.getList}
        />
      );
    }
  };

export default withMultiSelectState;
