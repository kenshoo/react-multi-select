import React from "react";
import Icon from "@material-ui/core/Icon";
import SearchIcon from "react-icons/lib/md/search";
import PropTypes from "prop-types";

import styles from "./search.scss";

const Search = ({ searchPlaceholder, searchIcon, onChange }) => {
  const IconRenderer = searchIcon;
  return (
    <div className={`${styles.search} rms-search`}>
      <input
        type="text"
        className={`${styles.input} rms-input`}
        placeholder={searchPlaceholder}
        onChange={onChange}
      />
      <div className={`${styles.icon} rms-search_icon`}>
        <IconRenderer />
      </div>
    </div>
  );
};

export const SearchWithValue = ({
  searchPlaceholder,
  onChange,
  value,
  searchIcon
}) => {
  const IconRenderer = searchIcon;

  return (
    <div className={`${styles.search} rms-search`}>
      <input
        value={value}
        type="text"
        className={`${styles.input} rms-input`}
        placeholder={searchPlaceholder}
        onChange={onChange}
      />
      <div className={`${styles.icon} rms-search_icon`}>
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
