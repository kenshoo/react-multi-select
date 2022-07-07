import React from "react";
import { MdDelete as DeleteIcon } from "react-icons/md";

const SelectedItem = ({ item, height }) => (
  <div
    style={{
      height,
      display: "flex",
      alignItems: "center",
      lineHeight: "14px",
      padding: "0 12px",
    }}
  >
    <div>{item.label}</div>
    <div style={{ fontSize: "24px", margin: "0 12px" }}>
      <DeleteIcon />
    </div>
  </div>
);

export default SelectedItem;
