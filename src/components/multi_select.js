import React, { PureComponent } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

import withMultiSelectState from "./multi_select_state";
import withResponsiveHeight from "./with_responsive_height";
import SourceList from "./source_list";
import DestinationList from "./destination_list";

import styles from "./multi_select.scss";
import Loader from "./loader/loader";

const jss = create(jssPreset());
const defaultGenerateClassName = createGenerateClassName();

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
    selectedItemRenderer: PropTypes.func,
    height: PropTypes.number,
    itemHeight: PropTypes.number,
    selectAllHeight: PropTypes.number,
    loaderRenderer: PropTypes.any,
    maxSelectedItems: PropTypes.number,
    withGrouping: PropTypes.bool,
    listRenderer: PropTypes.func,
    generateClassName: PropTypes.func
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
    loaderRenderer: Loader,
    withGrouping: false,
    generateClassName: defaultGenerateClassName
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
      maxSelectedItems,
      searchValue,
      withGrouping,
      generateClassName,
      listRenderer
    } = this.props;
    const calculatedHeight = this.calculateHeight();
    const selectedIds = selectedItems.map(item => item.id);
    const disabled =
      maxSelectedItems && maxSelectedItems <= selectedItems.length;
    const LoaderRenderer = loaderRenderer;
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <div
          className={classnames(styles.wrapper, wrapperClassName)}
          style={{ height }}
        >
          {loading && <LoaderRenderer />}
          {!loading && (
            <SourceList
              searchValue={searchValue}
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
              withGrouping={withGrouping}
              listRenderer={listRenderer}
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
                withGrouping={withGrouping}
              />
            )}
        </div>
      </JssProvider>
    );
  }
}

export default withResponsiveHeight(withMultiSelectState(MultiSelect));