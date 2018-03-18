import React from "react";
import Button from "../button/button";
import { getFontAwesomeClass } from "../../common/icons/icons";
import classNames from "classnames/bind";
import * as Themes from "../../themes/themes";
import styles from "./multiselection_navigation.scss";
import { MOVE } from "./multiselection_list.constants";

export const ListNavigation = ({ onNavigationClick, disabledNavigation }) => {
  const upButton = { theme: Themes.kgray, disabled: disabledNavigation.up };
  const downButton = { theme: Themes.kgray, disabled: disabledNavigation.down };

  return (
    <div className={styles.multiselection_navigation}>
      <Button
        className={classNames(
          styles.multiselection_navigation_control,
          getFontAwesomeClass("arrow_up")
        )}
        onClick={onNavigationClick(MOVE.UP)}
        {...upButton}
      />
      <Button
        className={classNames(
          styles.multiselection_navigation_control,
          getFontAwesomeClass("arrow_down")
        )}
        onClick={onNavigationClick(MOVE.DOWN)}
        {...downButton}
      />
    </div>
  );
};

export default ListNavigation;
