import React from "react";

const SelectAll = ({ isAllSelected, onClick }) => (
  <div
    onClick={onClick}
    style={{
      height: "40px",
      background: "#e6e4ff",
      padding: "0 12px",
      display: "flex",
      alignItems: "center"
    }}
  >
    {isAllSelected ? "Unselect All" : "Select All"}
  </div>
);

export default SelectAll;
