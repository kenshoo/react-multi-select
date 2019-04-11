import React from "react";
import Search from "./search/search";
import Column from "./column/column";
export default Component => ({
  showSearch,
  filterItems,
  searchIcon,
  searchValue,
  messages,
  ...others
}) => {
  return showSearch ? (
    <Column>
      <Search
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
