import React, { PureComponent } from "react";
import pull from "lodash/pull";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import union from "lodash/union";
import without from "lodash/without";
import xor from "lodash/xor";
import PropTypes from "prop-types";
import Waypoint from "react-waypoint";
import classNames from "classnames/bind";
import styles from "./multiselection_list.scss";
import { LinearProgress } from "material-ui/Progress";
import { MOVE } from "./multiselection_list.constants";
import { isAllSelected } from "./multiselection_list_utils";
import VirtualizedListItems from "./virtualized_items/multiselection_virtualized_items";
import TextField from "material-ui/TextField";
import Icon from "material-ui/Icon";

class MultiSelectionList extends PureComponent {
  constructor(props) {
    super(props);
    const { items, selectedIds } = props;
    this.state = {
      selected: selectedIds,
      searchTerm: "",
      lastSelectedIndex: null,
      items,
      selectedAll: this.calculateSelectedAll(selectedIds, items)
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.onSelectAllClick = this.onSelectAllClick.bind(this);
    this.onSelectGroupClick = this.onSelectGroupClick.bind(this);
    this.onDeselectGroupClick = this.onDeselectGroupClick.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.handleExternalFilter = this.handleExternalFilter.bind(this);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.changeSelectedState = this.changeSelectedState.bind(this);
    this.item.bind(this);
  }

  componentWillReceiveProps({
    items,
    selectedIds,
    customFilter,
    isRemoteFilter
  }) {
    if (
      this.isItemsNotChanged(this.props.items, items) &&
      xor(selectedIds, this.props.selectedIds).length == 0
    ) {
      return;
    }

    if (customFilter || isRemoteFilter) {
      this.setState(
        {
          items,
          selectedAll: this.calculateSelectedAll(this.state.selected, items)
        },
        () => {
          if (this.state.searchTerm) {
            this.handleFilter(this.state.searchTerm);
          }
        }
      );
      return;
    }

    this.setState(
      {
        selected: selectedIds,
        lastSelectedIndex: null,
        items,
        selectedAll: this.calculateSelectedAll(selectedIds, items)
      },
      () => {
        this.onSelectedChange();
        if (this.state.searchTerm) {
          this.handleFilter(this.state.searchTerm, true);
        }
      }
    );
  }

  componentDidUpdate() {
    this.virtualizedListItemsRef.triggerForceUpdateGrid();
  }

  isItemsNotChanged(prevItems, nextItems) {
    return nextItems === prevItems || xor(nextItems, prevItems).length == 0;
  }

  onEnter(props) {
    if (this.state.items.length >= this.props.sumItemsInPageForLazyLoad) {
      this.props.onEnter(props, this.state.items.length, this.state.searchTerm);
    }
  }

  selectItem(item) {
    return () => {
      if (this.props.isItemLockedFn(item)) {
        return;
      }

      const { id } = item;
      if (this.state.selected.includes(id)) {
        return;
      }

      const selected = this.state.selected.splice(0);
      selected.push(id);

      this.setState({ selected }, this.onSelectedChange);
    };
  }

  waypoint() {
    return <Waypoint onEnter={this.onEnter} />;
  }

  handleMultiSelect(id) {
    const selected = [...this.state.selected];
    const clickedIndex = findIndex(this.state.items, { id });
    const { lastSelectedIndex, items } = this.state;
    const { isItemLockedFn } = this.props;

    const fromIndex = Math.min(
      clickedIndex,
      lastSelectedIndex == null
        ? items.filter(isItemLockedFn).length
        : lastSelectedIndex
    );
    const toIndex = Math.max(clickedIndex, lastSelectedIndex);

    for (let i = fromIndex; i <= toIndex; i++) {
      if (!selected.includes(items[i].id)) {
        selected.push(items[i].id);
      }
    }

    this.setState({ selected }, this.onSelectedChange);
  }

  toggleItemSelected(item) {
    return e => {
      if (this.props.isItemLockedFn(item)) {
        return;
      }

      const { id } = item;
      if (e.shiftKey) {
        return this.handleMultiSelect(id);
      }

      const selected = [...this.state.selected];

      if (selected.includes(id)) {
        pull(selected, id);
      } else {
        selected.push(id);
        const lastSelectedIndex = findIndex(this.state.items, { id });

        this.setState({
          lastSelectedIndex
        });
      }

      this.setState({ selected }, this.onSelectedChange);
    };
  }

  selectSingle(item) {
    return () => {
      if (this.props.isItemLockedFn(item)) {
        return;
      }

      const { id } = item;
      const { onDoubleClick } = this.props;

      this.setState({ selected: [id] }, () => {
        this.onSelectedChange();
        onDoubleClick();
      });
    };
  }

  handleFilter(value, forceFilterSelected = false) {
    const { items, filterFn } = this.props;
    const { selected } = this.state;

    const newList = items.filter(filterFn(value));

    this.setState(
      {
        items: newList,
        searchTerm: value,
        ...(this.props.filterSelected || forceFilterSelected
          ? { selected: selected.filter(id => find(newList, { id })) }
          : {})
      },
      this.onSelectedChange
    );
  }

  handleExternalFilter(value) {
    this.setState(
      {
        searchTerm: value
      },
      this.props.onFilterChange(value)
    );
  }

  changeSelectedState(selected) {
    this.setState({ selected }, this.alignSelectedAll);
  }

  onSelectAllClick() {
    const { selectedAll, items, selected } = this.state;
    const newSelected =
      selectedAll === true
        ? selected.filter(id => !find(items, { id }))
        : union(selected, items.map(({ id }) => id));

    this.setState({ selected: newSelected }, this.onSelectedChange);
  }

  onSelectGroupClick(groupItemIds) {
    const { items, selected } = this.state;
    const newSelected = items
      .map(({ id }) => id)
      .filter(id => groupItemIds.includes(id));

    this.setState(
      { selected: union(selected, newSelected) },
      this.onSelectedChange
    );
  }

  onDeselectGroupClick(groupItemIds) {
    const { selected } = this.state;
    const newSelected = selected.filter(id => !groupItemIds.includes(id));
    this.setState({ selected: newSelected }, this.onSelectedChange);
  }

  onOrderChanged() {
    this.props.onOrderChanged(this.state.items);
  }

  onSelectedChange() {
    this.props.onSelect(this.state.selected);
    this.alignSelectedAll();
    this.sortItems();
  }

  sortItems() {
    const { items } = this.state;
    const { sortFn } = this.props;

    this.setState({ items: sortFn(items) });
  }

  alignSelectedAll() {
    this.setState({ selectedAll: this.calculateSelectedAll() });
  }

  calculateSelectedAll(
    selected = this.state.selected,
    items = this.state.items
  ) {
    return isAllSelected(selected, items);
  }

  item(item) {
    const isSelected = this.state.selected.includes(item.id);
    const classes = classNames(styles.list_item, this.props.itemClassName, {
      [styles.selected]: isSelected,
      [this.props.selectedItemClassName]: isSelected
    });

    return (
      <li
        className={classes}
        key={item.id}
        onDragStart={this.selectItem(item)}
        onClick={this.toggleItemSelected(item)}
        onDoubleClick={this.selectSingle(item)}
      >
        {this.props.displayFn(item)}
      </li>
    );
  }

  loader() {
    return (
      <div className={styles.loader_container}>
        <LinearProgress color="primary" />
      </div>
    );
  }

  onSearchTermChange(event) {
    const { lazyLoad } = this.props;
    const newValue = event.target.value;
    lazyLoad
      ? this.handleExternalFilter(newValue)
      : this.handleFilter(newValue);
  }

  listFilter() {
    const { searchPlaceholder, searchWrapperClassName } = this.props;

    return (
      <div
        className={classNames(
          styles.list_filter_container,
          searchWrapperClassName
        )}
      >
        <TextField
          id="search"
          placeholder={searchPlaceholder}
          value={this.state.searchTerm}
          onChange={this.onSearchTermChange}
          margin="normal"
        />
        <Icon className={styles.search_icon}>search</Icon>
      </div>
    );
  }

  render() {
    const {
      error,
      className,
      loading,
      withSearch,
      withSelectAll,
      selectAllClassName,
      displaySelectAllFn,
      lazyLoad,
      filterResultsText,
      emptyText,
      listHeight,
      listRowHeight
    } = this.props;

    const listContainerClasses = classNames.bind(styles)("list_container", {
      error: error && error.hasErrors
    });

    const listContainerClass = classNames(listContainerClasses, className);
    return (
      <div className={styles.multi_selection_list}>
        {withSearch && this.listFilter()}

        <div className={styles.list_box}>
          {withSelectAll && (
            <div
              className={classNames(styles.select_all, selectAllClassName)}
              onClick={this.onSelectAllClick}
            >
              {displaySelectAllFn(this.state.selectedAll)}
            </div>
          )}

          {loading ? (
            <div className={listContainerClass}>{this.loader()}</div>
          ) : (
            <div className={listContainerClass}>
              <VirtualizedListItems
                ref={list => {
                  this.virtualizedListItemsRef = list;
                }}
                listHeight={listHeight}
                listRowHeight={listRowHeight}
                items={this.state.items}
                selected={this.state.selected}
                itemDisplayFn={this.item.bind(this)}
                filterResultsText={filterResultsText}
                emptyText={emptyText}
                searchTerm={this.state.searchTerm}
              />
              {lazyLoad && this.waypoint()}
            </div>
          )}
        </div>
      </div>
    );
  }
}

MultiSelectionList.propTypes = {
  items: PropTypes.array,
  selectedIds: PropTypes.array,
  searchPlaceholder: PropTypes.string,
  emptyText: PropTypes.string,
  filterResultsText: PropTypes.string,
  displayFn: PropTypes.func,
  displaySelectAllFn: PropTypes.func,
  filterFn: PropTypes.func,
  sortFn: PropTypes.func,
  onDoubleClick: PropTypes.func,
  withSearch: PropTypes.bool,
  filterSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onOrderChanged: PropTypes.func,
  onFilterChange: PropTypes.func,
  onEnter: PropTypes.func,
  sumItemsInPageForLazyLoad: PropTypes.number,
  msDelayOnChangeFilter: PropTypes.number,
  isRemoteFilter: PropTypes.bool
};

MultiSelectionList.defaultProps = {
  items: [],
  selectedIds: [],
  searchPlaceholder: "Search...",
  emptyText: "No items...",
  filterResultsText: "No available items...",
  selectGroupLabel: "Select all",
  deselectGroupLabel: "Deselect all",
  displayFn: item => item.id,
  isItemLockedFn: item => false,
  displaySelectAllFn: selectedAll =>
    `${(selectedAll === true && "✓") ||
      ((selectedAll === "partial" && "-") || "")} All`,
  filterFn: value => item =>
    String(item.id)
      .toLowerCase()
      .includes(value.toLowerCase()),
  onDoubleClick: () => {},
  withSearch: true,
  filterSelected: true,
  sortFn: items => items,
  onSelect: () => {},
  onOrderChanged: () => {},
  onFilterChange: () => {},
  onEnter: () => {},
  withNavigation: false,
  sumItemsInPageForLazyLoad: 100,
  isRemoteFilter: false
};

export default MultiSelectionList;
