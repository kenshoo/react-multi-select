import React, { Component } from "react";
import { action, storiesOf } from "@storybook/react";
import ReactMultiSelect from "../src/components/multi_select";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import Icon from "material-ui/Icon";
import customStyle from "./custom_style.scss";

const custom_messages = {
  searchPlaceholder: "Find...",
  noItemsMessage: "No entries available...",
  noneSelectedMessage: "Nothing",
  selectedMessage: "Checked",
  selectAllMessage: "Check all",
  clearAllMessage: "Uncheck all"
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
  })
  .add("With custom components", () => {
    const items = Array.apply(null, { length: 10 }).map((i, index) => ({
      id: index,
      value: `item ${index}`,
      label: (
        <div>
          <Icon>star</Icon>
          {`Item ${index}`}
        </div>
      )
    }));

    const displaySelectedItemFunc = item => (
      <div>{`selected: ${item.value}`}</div>
    );

    const searchRenderer = ({ searchTerm, onSearchTermChange }) => {
      return (
        <div>
          custom search{" "}
          <input value={searchTerm} onChange={onSearchTermChange} />
        </div>
      );
    };

    return (
      <ReactMultiSelect
        displaySelectedItemFunc={displaySelectedItemFunc}
        items={items}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
        searchRenderer={searchRenderer}
      />
    );
  });
