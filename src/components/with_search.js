import React from "react";
import Search from "./search/search";
import Column from "./column/column";
export default Component => ({
  searchRenderer = Search,
  showSearch,
  filterItems,
  searchIcon,
  searchValue,
  messages,
  ...others
}) => {
  const SearchRenderer = searchRenderer;
  return showSearch ? (
    <Column>
      <SearchRenderer
        onChange={filterItems}
        searchIcon={searchIcon}
        value={searchValue}
        searchPlaceholder={messages.searchPlaceholder}
      />
      <Component {...others} />
    </Column>
  ) : (
      <Column>
        <Component {...others} />
      </Column>
    );
};
