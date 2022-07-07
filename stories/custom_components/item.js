import React from "react";
import { MdStarOutline as StarOIcon } from "react-icons/md";
import { MdStar as StarIcon } from "react-icons/md";

const Item = ({ item, checked }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      lineHeight: "14px",
      height: "100%",
      margin: "12px",
    }}
  >
    <div style={{ fontSize: "24px", margin: "0 12px 0 0" }}>
      {!checked ? <StarOIcon /> : <StarIcon />}
    </div>
    {item.label}
  </div>
);

export default Item;
