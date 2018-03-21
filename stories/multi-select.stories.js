import React from "react";
import { storiesOf, action } from "@storybook/react";
import {
  DESTINATION_HEADER_CLEAR_ALL,
  DESTINATION_HEADER_NONE,
  DESTINATION_HEADER_SELECT_ALL,
  DESTINATION_HEADER_SELECTED,
  DESTINATION_NO_ITEMS,
  SOURCE_NO_ITEMS,
  SOURCE_SEARCH_PLACEHOLDER
} from "../src/components/react_multi_select_messages";
import ReactMultiSelect from "../src/components/react_multi_select";
import { withKnobs, boolean } from "@storybook/addon-knobs";

const messages = {
  [SOURCE_SEARCH_PLACEHOLDER]: "Search...",
  [SOURCE_NO_ITEMS]: "No items...",
  [DESTINATION_NO_ITEMS]: "No items...",
  [DESTINATION_HEADER_NONE]: "None",
  [DESTINATION_HEADER_SELECTED]: "Selected",
  [DESTINATION_HEADER_SELECT_ALL]: "Select all",
  [DESTINATION_HEADER_CLEAR_ALL]: "Clear all"
};

storiesOf("React Multi Select", module)
  .addDecorator(withKnobs)
  .add("Simple", () => {
    const items = [1, 2, 4, 5, 6, 7, 8, 9, 10].map(i => ({
      id: i,
      label: `Item ${i}`
    }));

    return (
      <ReactMultiSelect
        items={items}
        messages={messages}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
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
        messages={messages}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
      />
    );
  });
