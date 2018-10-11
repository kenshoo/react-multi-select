import React from "react";
import TextField from "@material-ui/core/TextField";

const Search = ({ searchPlaceholder, onChange }) => {
  return (
    <TextField
      placeholder={searchPlaceholder}
      onChange={onChange}
      fullWidth
      style={{ margin: "17px 0 0 0" }}
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
      style={{ margin: "17px 0 0 0" }}
    />
  );
};

export default Search;
