import React from "react";
import PropTypes from "prop-types";
import Item from "./item";

const SelectAll = ({
  height,
  onClick,
  isAllSelected,
  selectAllMessage,
  selectedIds
}) => (
  <Item
    height={height}
    onClick={onClick}
    withBorder
    item={{ label: selectAllMessage }}
    checked={isAllSelected}
    indeterminate={!isAllSelected && selectedIds.length > 0}
  />
);

SelectAll.propTypes = {
  selectAllMessage: PropTypes.string,
  height: PropTypes.number,
  onClick: PropTypes.func,
  isAllSelected: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.number)
};

SelectAll.defaultProps = {
  selectAllMessage: "Select All",
  isAllSelected: false,
  height: 40,
  selectedIds: []
};

export default SelectAll;
