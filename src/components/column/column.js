import React from "react";

import styles from "./column.scss";

const Column = ({ children }) => (
  <div className={`${styles.column} rms-column`}>{children}</div>
);

export default Column;
