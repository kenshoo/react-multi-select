import React, { PureComponent } from "react";
import classNames from "classnames/bind";
import styles from "./multiselection_group.scss";
import BootstrapTooltip from "../tooltip/bootstraptooltip/bootstrap_tooltip";

class ListGroup extends PureComponent {
  constructor(props) {
    super(props);
    this.onGroupLinkClick = this.onGroupLinkClick.bind(this);
  }

  onGroupLinkClick() {
    const { groupItemIds, onGroupLinkClick } = this.props;
    onGroupLinkClick && onGroupLinkClick(groupItemIds);
  }

  render() {
    const { label, groupLink } = this.props;
    return (
      <li className={classNames(styles.list_group)}>
        <a className={styles.group_select_all} onClick={this.onGroupLinkClick}>
          {groupLink}
        </a>
        <BootstrapTooltip
          tooltipContent={label}
          forcePlacement={"bottom"}
          forceDelay={300}
        >
          <span>{label}</span>
        </BootstrapTooltip>
      </li>
    );
  }
}

ListGroup.defaultProps = {
  label: "Group",
  groupLink: "Select All",
  groupItemIds: []
};

export default ListGroup;
