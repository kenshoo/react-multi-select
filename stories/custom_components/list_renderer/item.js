import React from "react";
import TickOutline from "react-icons/lib/ti/tick-outline";
import Tick from "react-icons/lib/ti/tick";
import classnames from "classnames";

import style from "./item_style.scss";

const Item = ({ item, checked, height }) => {
  return (
    <div
      className={`${style.item} rms-custom_item`}
      style={{
        height,
        backgroundImage: `url(${item.img})`
      }}
    >
      <div
        className={classnames(style.icon, "rms-icon", {
          [style.icon_checked]: checked,
          "rms-icon_checked": checked
        })}
      >
        {!checked ? (
          <TickOutline color={!checked ? "#41B6E6" : ""} />
        ) : (
          <Tick color={checked ? "#fff" : ""} />
        )}
      </div>
      <div className={`${style.label} rms-item_label`}>{item.label}</div>
    </div>
  );
};

export default Item;
