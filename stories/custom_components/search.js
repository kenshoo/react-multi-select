import React from "react";
import TextField from "@material-ui/core/TextField";

const searchStyle = { margin: "17px 0 0 0" };

const Search = ({ searchPlaceholder, onChange }) => {
  return (
    <TextField
      placeholder={searchPlaceholder}
      onChange={onChange}
      fullWidth
      style={searchStyle}
    />
  );
};

export const SearchWithValue = ({ searchPlaceholder, onChange, value }) => {
  return (
    <TextField
      value={value}
      placeholder={searchPlaceholder}
      onChange={onChange}
      fullWidth
      style={searchStyle}
    />
  );
};

export default Search;
