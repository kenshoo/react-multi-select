import React from "react";
import Icon from "material-ui/Icon";
import SearchIcon from "react-icons/lib/md/search";
import PropTypes from "prop-types";

import styles from "./search.scss";

const Search = ({ searchPlaceholder, searchIcon, onChange }) => {
  const IconRenderer = searchIcon;
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.input}
        placeholder={searchPlaceholder}
        onChange={onChange}
      />
      <div className={styles.icon}>
        <IconRenderer />
      </div>
    </div>
  );
};

Search.propTypes = {
  searchPlaceholder: PropTypes.string,
  searchIcon: PropTypes.any,
  onChange: PropTypes.func
};

Search.defaultProps = {
  searchPlaceholder: "Search...",
  searchIcon: SearchIcon
};

export default Search;
