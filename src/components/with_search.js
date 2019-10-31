import React from "react";
import Search from "./search/search";

const withSearch = WrappedComponent => ({
  searchRenderer = Search,
  showSearch,
  filterItems,
  searchIcon,
  searchValue,
  messages,
  ...others
}) => {
  const SearchRenderer = searchRenderer;
  return (
    <WrappedComponent {...others} messages={messages}>
      {showSearch && (
        <SearchRenderer
          onChange={filterItems}
          searchIcon={searchIcon}
          value={searchValue}
          searchPlaceholder={messages.searchPlaceholder}
        />
      )}
    </WrappedComponent>
  );
};
export default withSearch;
