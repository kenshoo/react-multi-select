import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "react-icons/lib/md/close";
import IconButton from "@material-ui/core/IconButton";
import ItemLabel from "./item_label";
import classnames from "classnames";
import styles from "./selected_item.scss";

const SelectedItem = ({ item, height, group, disabled, withGroupClick }) => (
  <div
    className={classnames({
      [styles.with_grouping]: group,
      "rms-selected_item_with_grouping": group,
      [styles.with_grouping_click]: withGroupClick,
      "rms-with_grouping_click": withGroupClick,
      [styles.selected_item]: !group,
      "rms-selected_item": !group,
      [styles.disabled]: disabled,
      "rms-selected_item_disabled": disabled
    })}
    style={{ height }}
  >
    <ItemLabel label={item.label} />
    {!group && !disabled && (
      <IconButton>
        <CloseIcon />
      </IconButton>
    )}
  </div>
);

SelectedItem.propTypes = {
  item: PropTypes.object,
  height: PropTypes.number,
  isLocked: PropTypes.func
};

SelectedItem.defaultProps = {
  item: {},
  height: 40
};

export default SelectedItem;
