import React, { PureComponent } from "react";
import pull from "lodash/pull";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import union from "lodash/union";
import xor from "lodash/xor";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./multiselection_list.scss";
import { LinearProgress } from "material-ui/Progress";
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
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.changeSelectedState = this.changeSelectedState.bind(this);
    this.item.bind(this);
  }

  componentWillReceiveProps({
    items,
    selectedIds
  }) {
    if (
      this.isItemsNotChanged(this.props.items, items) &&
      xor(selectedIds, this.props.selectedIds).length === 0
    ) {
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
    return nextItems === prevItems || xor(nextItems, prevItems).length === 0;
  }

  selectItem(item) {
    return () => {
      const { id } = item;
      if (this.state.selected.includes(id)) {
        return;
      }

      const selected = this.state.selected.splice(0);
      selected.push(id);

      this.setState({ selected }, this.onSelectedChange);
    };
  }

  handleMultiSelect(id) {
    const selected = [...this.state.selected];
    const clickedIndex = findIndex(this.state.items, { id });
    const { lastSelectedIndex, items } = this.state;

    const fromIndex = Math.min(
      clickedIndex,
      lastSelectedIndex == null
        ? 0
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
      const { id } = item;
      this.setState({ selected: [id] }, () => {
        this.onSelectedChange();
      });
    };
  }

  handleFilter(value, forceFilterSelected = false) {
    const { items, filterFn, filterSelected } = this.props;
    const { selected } = this.state;

    const newList = items.filter(filterFn(value));

    this.setState(
      {
        items: newList,
        searchTerm: value,
        ...(filterSelected || forceFilterSelected
          ? { selected: selected.filter(id => find(newList, { id })) }
          : {})
      },
      this.onSelectedChange
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

  onOrderChanged() {
    this.props.onOrderChanged(this.state.items);
  }

  onSelectedChange() {
    this.props.onSelect(this.state.selected);
    this.alignSelectedAll();
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
    const newValue = event.target.value;
    this.handleFilter(newValue);
  }

  listFilter() {
    const { searchPlaceholder } = this.props;

    return (
      <div
        className={classNames(
          styles.list_filter_container,
          styles.search_wrapper
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
      filterResultsText,
      emptyText,
      listHeight,
      listRowHeight
    } = this.props;

    return (
      <div className={styles.multi_selection_list}>
        {withSearch && this.listFilter()}

        <div className={styles.list_box}>
          {withSelectAll && (
            <div className={styles.select_all} onClick={this.onSelectAllClick}>
              {displaySelectAllFn(this.state.selectedAll)}
            </div>
          )}

          {loading ? (
            <div>{this.loader()}</div>
          ) : (
            <div>
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
  withSearch: PropTypes.bool,
  filterSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  onOrderChanged: PropTypes.func,
  onFilterChange: PropTypes.func,
  msDelayOnChangeFilter: PropTypes.number,
};

MultiSelectionList.defaultProps = {
  items: [],
  selectedIds: [],
  searchPlaceholder: "Search...",
  emptyText: "No items...",
  filterResultsText: "No available items...",
  displayFn: item => item.id,
  displaySelectAllFn: selectedAll =>
    `${(selectedAll === true && "✓") ||
      ((selectedAll === "partial" && "-") || "")} All`,
  filterFn: value => item =>
    String(item.id)
      .toLowerCase()
      .includes(value.toLowerCase()),
  withSearch: true,
  filterSelected: true,
  onSelect: () => {},
  onOrderChanged: () => {},
  onFilterChange: () => {}
};

export default MultiSelectionList;
