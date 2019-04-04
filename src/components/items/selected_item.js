import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "react-icons/lib/md/close";
import IconButton from "@material-ui/core/IconButton";
import ItemLabel from "./item_label";

import styles from "./selected_item.scss";

const SelectedItem = ({ item, height, group }) => (
  <div
    className={group ? styles.with_grouping : styles.selected_item}
    style={{ height }}
  >
    <ItemLabel label={item.label} />
    {!group && !item.disabled && (
      <IconButton>
        <CloseIcon />
      </IconButton>
    )}
  </div>
);

SelectedItem.propTypes = {
  item: PropTypes.object,
  height: PropTypes.number
};

SelectedItem.defaultProps = {
  item: {},
  height: 40
};

export default SelectedItem;
