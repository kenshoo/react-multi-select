import React, { PureComponent } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { LinearProgress } from "material-ui/Progress";
import styles from "./react_multi_select.scss";
import Icon from "material-ui/Icon";
import {
  filterItems,
  unionItemsForListToList
} from "./react_multi_select_utils";
import {
  DESTINATION_HEADER_CLEAR_ALL,
  DESTINATION_HEADER_NONE,
  SOURCE_HEADER_SELECT_ALL,
  DESTINATION_HEADER_SELECTED,
  DESTINATION_NO_ITEMS,
  SOURCE_NO_ITEMS,
  SOURCE_SEARCH_PLACEHOLDER
} from "./react_multi_select_messages";
import Checkbox from "material-ui/Checkbox";
import { FormControlLabel } from "material-ui/Form";
import MultiSelectionList from "./multi_selection_list/multiselection_list";

export const ITEMS_LIST_HEIGHT = 320;
export const SELECTED_ITEMS_LIST_HEIGHT = 361;
export const LIST_ROW_HEIGHT = 40;

const displayItem = ({ isItemSelected }) => item => {
  return (
    <FormControlLabel
      className={styles.checkbox_control}
      control={
        <Checkbox
          value={item.value}
          checked={isItemSelected(item)}
          color="primary"
        />
      }
      label={item.label}
    />
  );
};

const displaySelectedItem = (item, props) => (
  <div className={styles.destination_item_content}>
    <div className={styles.destination_item_text}>{item.label}</div>
    <span className={styles.remove_button} />
    <Icon className={styles.remove_selected_icon}>{props.deleteIcon}</Icon>
  </div>
);

export default class ReactMultiSelect extends PureComponent {
  constructor(props) {
    super(props);

    const { items } = props;

    this.state = { selectedItems: [], items, filteredItems: items };

    this.onClear = this.onClear.bind(this);
    this.select = this.select.bind(this);
    this.deselectItem = this.deselectItem.bind(this);
    this.isItemSelected = this.isItemSelected.bind(this);
    this.setSelectedItems = this.setSelectedItems.bind(this);
    this.renderDestinationInfo = this.renderDestinationInfo.bind(this);
    this.renderDestinationList = this.renderDestinationList.bind(this);
    this.renderSourceList = this.renderSourceList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { items, selectedItems } = nextProps;
    this.props.selectedItems.length !== selectedItems.length &&
      this.setSelectedItems(selectedItems);
    this.setState({
      items,
      filteredItems: items
    });
  }
  onClear() {
    this.state.selectedItems.length && this.setSelectedItems([]);
  }

  setSelectedItems(selectedItems) {
    this.setState({ selectedItems }, () => {
      if (this.props.onChange) {
        this.props.onChange(selectedItems);
      }
    });
    this.srcList &&
      this.srcList.changeSelectedState(selectedItems.map(({ id }) => id));
  }

  select(selectedIds) {
    const unionSelectedItems = unionItemsForListToList(
      selectedIds,
      this.state.items,
      this.props.selectedItems
    );

    this.setSelectedItems(unionSelectedItems);
  }

  deselectItem(ids) {
    if (ids.length) {
      this.setSelectedItems(
        this.state.selectedItems.filter(item => !ids.includes(item.id))
      );
    }
  }

  isItemSelected(item) {
    return this.state.selectedItems.map(({ id }) => id).includes(item.id);
  }

  displaySelectAll = selectedAll => {
    return (
      <FormControlLabel
        className={styles.checkbox_control}
        control={
          <Checkbox
            checked={selectedAll}
            color="primary"
            indeterminate={selectedAll === "partial"}
          />
        }
        label={this.props.messages[SOURCE_HEADER_SELECT_ALL]}
      />
    );
  };

  renderDestinationInfo() {
    const { messages } = this.props;

    const { selectedItems } = this.state;

    return (
      <div className={styles.destination_header}>
        <div>
          {`${selectedItems.length || messages[DESTINATION_HEADER_NONE]} ` +
            messages[DESTINATION_HEADER_SELECTED]}
        </div>
        <div onClick={this.onClear} role="button" className={styles.clear_all}>
          {messages[DESTINATION_HEADER_CLEAR_ALL]}
        </div>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.selectedItems && this.props.selectedItems.length > 0) {
      this.setSelectedItems(this.props.selectedItems);
    }
  }

  renderDestinationList() {
    const {
      messages,
      listRowHeight,
      selectedListHeight,
      dstItemsWrapperClassName,
      selectedItemRenderer
    } = this.props;
    const { selectedItems } = this.state;

    return (
      <MultiSelectionList
        withSearch={false}
        withSelectAll={false}
        items={selectedItems}
        onSelect={this.deselectItem}
        isVirtualized={true}
        listHeight={selectedListHeight}
        listRowHeight={listRowHeight}
        emptyText={messages[DESTINATION_NO_ITEMS]}
        displayFn={selectedItemRenderer  ? item => selectedItemRenderer(item) : displayFn => displaySelectedItem(displayFn, this.props)}
        className={classnames(
          styles.destination_items_wrapper,
          dstItemsWrapperClassName
        )}
        itemClassName={styles.destination_item}
      />
    );
  }

  renderSourceList() {
    const {
      messages,
      listHeight,
      listRowHeight,
      showSearch,
      showSelectAll,
      searchIcon,
      searchRenderer
    } = this.props;
    const { filteredItems } = this.state;

    return (
      <MultiSelectionList
        className={styles.source_items_wrapper}
        ref={list => (this.srcList = list)}
        items={filteredItems}
        onSelect={this.select}
        withSearch={showSearch}
        searchRenderer={searchRenderer}
        withSelectAll={showSelectAll}
        displayFn={displayItem({ isItemSelected: this.isItemSelected })}
        filterFn={filterItems}
        displaySelectAllFn={this.displaySelectAll}
        filterSelected={false}
        isVirtualized={true}
        listHeight={listHeight}
        listRowHeight={listRowHeight}
        searchPlaceholder={messages[SOURCE_SEARCH_PLACEHOLDER]}
        emptyText={messages[SOURCE_NO_ITEMS]}
        searchIcon={searchIcon}
      />
    );
  }

  render() {
    const { loading, wrapperClassName } = this.props;

    return (
      <div className={classnames(styles.wrapper, wrapperClassName)}>
        <div className={styles.list_container}>{this.renderSourceList()}</div>
        <div className={styles.list_container}>
          {this.renderDestinationInfo()}
          {this.renderDestinationList()}
        </div>
        {loading && (
          <div className={styles.loader_container}>
            <LinearProgress />
          </div>
        )}
      </div>
    );
  }
}

ReactMultiSelect.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      value: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
        .isRequired
    })
  ).isRequired,
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      value: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
        .isRequired
    })
  ),
  loading: PropTypes.bool,
  messages: PropTypes.object,
  onChange: PropTypes.func,
  showSearch: PropTypes.bool,
  showSelectAll: PropTypes.bool,
  searchIcon: PropTypes.string,
  deleteIcon: PropTypes.string,
  searchRenderer: PropTypes.func,
  selectedItemRenderer: PropTypes.func
};

ReactMultiSelect.defaultProps = {
  items: [],
  selectedItems: [],
  showSearch: true,
  showSelectAll: true,
  searchIcon: "search",
  deleteIcon: "close",
  listHeight: ITEMS_LIST_HEIGHT,
  selectedListHeight: SELECTED_ITEMS_LIST_HEIGHT,
  listRowHeight: LIST_ROW_HEIGHT,
  messages: {
    [SOURCE_SEARCH_PLACEHOLDER]: "Search...",
    [SOURCE_NO_ITEMS]: "No items...",
    [DESTINATION_NO_ITEMS]: "No items...",
    [DESTINATION_HEADER_NONE]: "None",
    [DESTINATION_HEADER_SELECTED]: "Selected",
    [SOURCE_HEADER_SELECT_ALL]: "Select all",
    [DESTINATION_HEADER_CLEAR_ALL]: "Clear all"
  }
};
