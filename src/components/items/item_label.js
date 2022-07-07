import React from "react";
import PropTypes from "prop-types";

import styles from "./item_label.scss";

const ItemLabel = ({ label }) => <div className={styles.label}>{label}</div>;

ItemLabel.propTypes = {
  label: PropTypes.string,
};

ItemLabel.defaultProps = {
  label: "",
};

export default ItemLabel;
