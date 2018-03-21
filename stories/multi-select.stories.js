import React from "react";
import { action, storiesOf } from "@storybook/react";
import {
  DESTINATION_HEADER_CLEAR_ALL,
  DESTINATION_HEADER_NONE,
  SOURCE_HEADER_SELECT_ALL,
  DESTINATION_HEADER_SELECTED,
  DESTINATION_NO_ITEMS,
  SOURCE_NO_ITEMS,
  SOURCE_SEARCH_PLACEHOLDER
} from "../src/components/react_multi_select_messages";
import ReactMultiSelect from "../src/components/react_multi_select";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import customStyle from "./custom_style.scss";

const custom_messages = {
  [SOURCE_SEARCH_PLACEHOLDER]: "Find...",
  [SOURCE_NO_ITEMS]: "No entries available...",
  [DESTINATION_NO_ITEMS]: "No entries available...",
  [DESTINATION_HEADER_NONE]: "Nothing",
  [DESTINATION_HEADER_SELECTED]: "Checked",
  [SOURCE_HEADER_SELECT_ALL]: "Check all",
  [DESTINATION_HEADER_CLEAR_ALL]: "Uncheck all"
};

storiesOf("React Multi Select", module)
  .addDecorator(withKnobs)
  .add("Simple", () => {
    const items = Array.apply(null, { length: 10 }).map((i, index) => ({
      id: index,
      label: `Item ${index}`
    }));

    return (
      <ReactMultiSelect
        items={items}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
      />
    );
  })
  .add("Custom Messages", () => {
    const items = Array.apply(null, { length: 10 }).map((i, index) => {
      return {
        id: index,
        label: `Item ${index}`
      };
    });

    return (
      <ReactMultiSelect
        items={items}
        messages={custom_messages}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
      />
    );
  })
  .add("Custom Styling", () => {
    const items = Array.apply(null, { length: 50 }).map((i, index) => {
      return {
        id: index,
        label: `Item ${index}`
      };
    });

    return (
      <ReactMultiSelect
        items={items}
        wrapperClassName={customStyle.wrapper}
        listHeight={500}
        selectedListHeight={540}
        deleteIcon={"delete"}
        searchIcon={"star"}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
      />
    );
  })
  .add("Toggle Search and Select all", () => {
    const items = Array.apply(null, { length: 50 }).map((i, index) => {
      return {
        id: index,
        label: `Item ${index}`
      };
    });

    return (
      <ReactMultiSelect
        items={items}
        listHeight={500}
        selectedListHeight={448}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={false}
        showSelectAll={false}
      />
    );
  })
  .add("Large Data (7000 items)", () => {
    const items = Array.apply(null, { length: 7000 }).map((i, index) => {
      return {
        id: index,
        label: `Item ${index}`
      };
    });

    return (
      <ReactMultiSelect
        items={items}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
      />
    );
  });
