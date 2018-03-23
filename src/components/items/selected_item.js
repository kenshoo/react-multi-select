import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "react-icons/lib/md/close";
import IconButton from "material-ui/IconButton";

import styles from "./selected_item.scss";

const SelectedItem = ({ item, height }) => (
  <div className={styles.selected_item} style={{ height }}>
    <div>{item.label}</div>
    <IconButton>
      <CloseIcon />
    </IconButton>
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
