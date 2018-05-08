import React, { PureComponent } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import withMultiSelectState from "./multi_select_state";
import SourceList from "./source_list";
import DestinationList from "./destination_list";

import styles from "./multi_select.scss";
import Loader from "./loader/loader";

export class MultiSelect extends PureComponent {
  static propTypes = {
    selectedItems: PropTypes.array,
    filteredItems: PropTypes.array,
    loading: PropTypes.bool,
    messages: PropTypes.object,
    onChange: PropTypes.func,
    showSearch: PropTypes.bool,
    showSelectAll: PropTypes.bool,
    showSelectedItems: PropTypes.bool,
    searchIcon: PropTypes.string,
    deleteIcon: PropTypes.string,
    searchRenderer: PropTypes.func,
    selectedItemRenderer: PropTypes.any,
    height: PropTypes.number,
    itemHeight: PropTypes.number,
    selectAllHeight: PropTypes.number,
    loaderRenderer: PropTypes.any,
    maxSelectedItems: PropTypes.number
  };

  static defaultProps = {
    selectedItems: [],
    filteredItems: [],
    messages: {},
    showSearch: true,
    showSelectAll: true,
    showSelectedItems: true,
    height: 400,
    itemHeight: 40,
    loaderRenderer: Loader
  };

  calculateHeight() {
    let {
      height,
      showSearch,
      showSelectAll,
      itemHeight,
      selectAllHeight,
      maxSelectedItems
    } = this.props;
    height = showSearch && !maxSelectedItems ? height - 45 : height;
    height = showSelectAll
      ? height - (selectAllHeight ? selectAllHeight : itemHeight)
      : height;
    return height;
  }

  render() {
    const {
      wrapperClassName,
      showSearch,
      height,
      itemHeight,
      selectAllHeight,
      showSelectAll,
      showSelectedItems,
      itemRenderer,
      selectedItemRenderer,
      filteredItems,
      selectedItems,
      getList,
      filterItems,
      selectAllItems,
      isAllSelected,
      clearAll,
      selectItem,
      unselectItems,
      searchIcon,
      searchRenderer,
      selectAllRenderer,
      selectionStatusRenderer,
      noItemsRenderer,
      loaderRenderer,
      messages,
      loading,
      maxSelectedItems
    } = this.props;
    const calculatedHeight = this.calculateHeight();
    const selectedIds = selectedItems.map(item => item.id);
    const disabled =
      maxSelectedItems && maxSelectedItems <= selectedItems.length;
    const LoaderRenderer = loaderRenderer;
    return (
      <div
        className={classnames(styles.wrapper, wrapperClassName)}
        style={{ height }}
      >
        {loading && <LoaderRenderer />}
        {!loading && (
          <SourceList
            searchRenderer={searchRenderer}
            selectAllRenderer={selectAllRenderer}
            showSearch={showSearch}
            filterItems={filterItems}
            searchIcon={searchIcon}
            messages={messages}
            showSelectAll={showSelectAll && !maxSelectedItems}
            itemHeight={itemHeight}
            selectAllItems={selectAllItems}
            isAllSelected={isAllSelected}
            selectedIds={selectedIds}
            itemRenderer={itemRenderer}
            getList={getList}
            filteredItems={filteredItems}
            calculatedHeight={calculatedHeight}
            selectItem={selectItem}
            noItemsRenderer={noItemsRenderer}
            disabled={disabled}
            selectAllHeight={selectAllHeight}
          />
        )}
        {!loading &&
          showSelectedItems && (
            <DestinationList
              selectionStatusRenderer={selectionStatusRenderer}
              selectedIds={selectedIds}
              clearAll={clearAll}
              messages={messages}
              selectedItems={selectedItems}
              itemHeight={itemHeight}
              height={height}
              unselectItems={unselectItems}
              selectedItemRenderer={selectedItemRenderer}
              noItemsRenderer={noItemsRenderer}
            />
          )}
      </div>
    );
  }
}

export default withMultiSelectState(MultiSelect);
