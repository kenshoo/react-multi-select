import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Checkbox from "@material-ui/core/Checkbox";
import ItemLabel from "./item_label";

import styles from "./item.scss";

const Item = ({
  item,
  height,
  onClick,
  withBorder,
  group,
  checked,
  indeterminate,
  disabled
}) => (
  <div
    className={classnames(
      styles.item,
      {
        [styles.with_border]: withBorder,
        "rms-with_border": withBorder,
        [styles.selected]: checked,
        "rms-selected": checked,
        [styles.disabled]: disabled,
        "rms-disabled": disabled,
        [styles.with_grouping]: group,
        "rms-with_grouping": group
      },
      "rms-item"
    )}
    style={{ height }}
    onClick={onClick}
  >
    {!group && (
      <Checkbox
        id={item.id ? `checkbox-${item.id}` : null}
        type="checkbox"
        color="primary"
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
      />
    )}
    <ItemLabel label={item.label} />
  </div>
);

Item.propTypes = {
  item: PropTypes.object,
  height: PropTypes.number,
  withBorder: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool
};

Item.defaultProps = {
  item: {},
  height: 40,
  withBorder: false,
  checked: false,
  indeterminate: false,
  disabled: false
};

export default Item;
