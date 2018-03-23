import React, { PureComponent } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

import withMultiSelectState from "./multi_select_state";
import SourceList from "./source_list";
import DestinationList from "./destination_list";

import styles from "./multi_select.scss";
import Loader from "./loader/loader";

class MultiSelect extends PureComponent {
  static propTypes = {
    selectedItems: PropTypes.array,
    filteredItems: PropTypes.array,
    loading: PropTypes.bool,
    messages: PropTypes.object,
    onChange: PropTypes.func,
    showSearch: PropTypes.bool,
    showSelectAll: PropTypes.bool,
    searchIcon: PropTypes.string,
    deleteIcon: PropTypes.string,
    searchRenderer: PropTypes.func,
    selectedItemRenderer: PropTypes.any,
    height: PropTypes.number,
    itemHeight: PropTypes.number,
    loaderRenderer: PropTypes.any
  };

  static defaultProps = {
    selectedItems: [],
    filteredItems: [],
    messages: {},
    showSearch: true,
    showSelectAll: true,
    height: 400,
    itemHeight: 40,
    loaderRenderer: Loader
  };

  calculateHeight() {
    let { height, showSearch, showSelectAll, itemHeight } = this.props;
    height = showSearch ? height - 45 : height;
    height = showSelectAll ? height - itemHeight : height;
    return height;
  }

  render() {
    const {
      wrapperClassName,
      showSearch,
      height,
      itemHeight,
      showSelectAll,
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
      unselectItem,
      searchIcon,
      searchRenderer,
      selectAllRenderer,
      selectionStatusRenderer,
      noItemsRenderer,
      loaderRenderer,
      messages,
      loading
    } = this.props;
    const calculatedHeight = this.calculateHeight();
    const selectedIds = selectedItems.map(item => item.id);
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
            showSelectAll={showSelectAll}
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
          />
        )}
        {!loading && (
          <DestinationList
            selectionStatusRenderer={selectionStatusRenderer}
            selectedIds={selectedIds}
            clearAll={clearAll}
            messages={messages}
            selectedItems={selectedItems}
            itemHeight={itemHeight}
            height={height}
            unselectItem={unselectItem}
            selectedItemRenderer={selectedItemRenderer}
            noItemsRenderer={noItemsRenderer}
          />
        )}
      </div>
    );
  }
}

export default withMultiSelectState(MultiSelect);
