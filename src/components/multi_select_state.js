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
      this.unselectItem = this.unselectItem.bind(this);
      this.filterItems = this.filterItems.bind(this);
      this.selectAllItems = this.selectAllItems.bind(this);
      this.isAllSelected = this.isAllSelected.bind(this);
      this.clearAll = this.clearAll.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getList = this.getList.bind(this);

      const { items, selectedItems } = props;
      this.state = { selectedItems, items, filteredItems: items };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.selectedItems !== nextProps.selectedItems) {
        this.setState({ selectedItems: nextProps.selectedItems });
      }
    }

    selectItem(id) {
      const { items } = this.props;
      const { selectedItems } = this.state;
      if (!selectedItems.find(item => item.id === id)) {
        const newSelectedItems = items.filter(
          item =>
            item.id === id ||
            selectedItems.find(selectedItem => item.id === selectedItem.id)
        );
        this.setState({ selectedItems: newSelectedItems }, this.handleChange);
      } else {
        this.unselectItem(id);
      }
    }

    unselectItem(id) {
      const { selectedItems } = this.state;
      this.setState(
        {
          selectedItems: selectedItems.filter(item => item.id !== id)
        },
        this.handleChange
      );
    }

    clearAll() {
      this.setState({ selectedItems: [] }, this.handleChange);
    }

    filterItems(event) {
      const { items, filterFunction } = this.props;
      const { value } = event.target;
      this.setState({
        filteredItems: items.filter(filterFunction(value))
      });
    }

    selectAllItems() {
      const { filteredItems } = this.state;
      const itemsToSelect = this.isAllSelected() ? [] : filteredItems;
      this.setState({ selectedItems: itemsToSelect }, this.handleChange);
    }

    isAllSelected() {
      const { filteredItems, selectedItems } = this.state;
      const selectedItemsInFilteredItems = selectedItems.filter(selectedItem =>
        filteredItems.find(item => item.id === selectedItem.id)
      );
      return (
        selectedItemsInFilteredItems.length === selectedItems.length &&
        selectedItemsInFilteredItems.length === filteredItems.length &&
        filteredItems.length > 0
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
          unselectItem={this.unselectItem}
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
