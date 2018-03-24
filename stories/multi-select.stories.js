import React, { Component } from "react";
import { action, storiesOf } from "@storybook/react";
import ReactMultiSelect from "../src/components/multi_select";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import TextField from "material-ui/TextField";
import StarOIcon from "react-icons/lib/md/star-outline";
import StarIcon from "react-icons/lib/md/star";
import DeleteIcon from "react-icons/lib/md/delete";
import Avatar from "material-ui/Avatar";
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
  .add("Default view", () => {
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
  .add("Preselected Items", () => {
    const items = Array.apply(null, { length: 10 }).map((i, index) => ({
      id: index,
      label: `Item ${index}`
    }));

    return (
      <ReactMultiSelect
        items={items}
        selectedItems={[{ id: 3, label: "Item 3" }]}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
      />
    );
  })
  .add("With max selected items", () => {
    const items = Array.apply(null, { length: 10 }).map((i, index) => {
      return {
        id: index,
        label: `Item ${index}`
      };
    });

    return (
      <ReactMultiSelect
        items={items}
        maxSelectedItems={4}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
      />
    );
  })
  .add("With Custom Messages", () => {
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
  .add("With Custom Styling", () => {
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
  .add("Without Search and Select all", () => {
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
  .add("With Large Data (7000 items)", () => {
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
      label: `Item ${index}`
    }));

    const Item = ({ item, checked }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          lineHeight: "14px",
          height: "100%",
          margin: "12px"
        }}
      >
        <div style={{ fontSize: "24px", margin: "0 12px 0 0" }}>
          {!checked ? <StarOIcon /> : <StarIcon />}
        </div>
        {item.label}
      </div>
    );

    const Search = ({ searchPlaceholder, onChange }) => {
      return (
        <TextField
          placeholder={searchPlaceholder}
          onChange={onChange}
          fullWidth
          style={{ margin: "17px 0 0 0" }}
        />
      );
    };

    const SelectAll = ({ isAllSelected, onClick }) => (
      <div
        onClick={onClick}
        style={{
          height: "40px",
          background: "#e6e4ff",
          padding: "0 12px",
          display: "flex",
          alignItems: "center"
        }}
      >
        {isAllSelected ? "Unselect All" : "Select All"}
      </div>
    );

    const SelectedItem = ({ item, height }) => (
      <div
        style={{
          height,
          display: "flex",
          alignItems: "center",
          lineHeight: "14px",
          padding: "0 12px"
        }}
      >
        <div>{item.label}</div>
        <div style={{ fontSize: "24px", margin: "0 12px" }}>
          <DeleteIcon />
        </div>
      </div>
    );

    const SelectionStatus = ({ selected }) => (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 12px"
        }}
      >
        <Avatar>{selected.length}</Avatar>
      </div>
    );

    return (
      <ReactMultiSelect
        items={items}
        itemRenderer={Item}
        selectAllRenderer={SelectAll}
        searchRenderer={Search}
        selectedItemRenderer={SelectedItem}
        selectionStatusRenderer={SelectionStatus}
        loading={boolean("Loading", false)}
        onChange={action("onChange")}
        showSearch={boolean("Show search", true)}
        showSelectAll={boolean("Show select all", true)}
      />
    );
  });
