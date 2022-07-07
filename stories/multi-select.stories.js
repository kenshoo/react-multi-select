import React from "react";
import ReactMultiSelect from "../src/components/multi_select";
import customStyle from "./custom_style.scss";
import SelectAll from "./custom_components/select_all";
import SelectionStatus from "./custom_components/selection_status";
import Search from "./custom_components/search";
import Item from "./custom_components/item";
import ListRenderer from "./custom_components/list_renderer";
import ListRendererItem from "./custom_components/list_renderer/item";
import SelectedItem from "./custom_components/selected_item";
import * as utils from "./multi_select_stories_util";
import "./app.scss";

export default {
  title: "React Multi Select",
  component: ReactMultiSelect,
  argTypes: {
    items: {
      table: {
        disable: true,
      },
    },
  },
};

const defaultArgs = {
  loading: false,
  showSearch: true,
  showSelectAll: true,
  items: utils.items,
};

const Template = (args) => <ReactMultiSelect {...args} />;
const create = (args, options) => {
  const instance = Template.bind({});
  instance.args = {
    ...defaultArgs,
    ...args,
  };

  if (options) {
    Object.assign(instance, options);
  }

  return instance;
};

export const DefaultView = create();

export const WithDifferentHeight = create(
  {
    responsiveHeight: "30%",
  },
  {
    decorators: [
      (Story) => (
        <div style={{ height: "1000px", backgroundColor: "#a9ffcc" }}>
          <Story />
        </div>
      ),
    ],
  }
);

export const PreSelectedItems = create({
  selectedItems: [{ id: 3, label: "Item 3" }],
});

export const WithMaxSelectedItems = create({
  maxSelectedItems: 4,
  messages: {
    disabledItemsTooltip: "You can select up to 4 items",
  },
});

export const SomeItemsDisabled = create({
  items: utils.withDisabledItems,
});

export const WithCustomMessages = create({
  messages: utils.custom_messages,
});

export const WithCustomStyling = create({
  wrapperClassName: customStyle.wrapper,
  listHeight: 500,
  selectedListHeight: 540,
  itemHeight: 60,
  selectAllHeight: 40,
});

export const NoSearchAndSelectAll = create({
  listHeight: 500,
  selectedListHeight: 448,
  showSearch: false,
  showSelectAll: false,
});

export const LargeData7000Items = create({
  items: utils.manyItems,
});

export const WithoutSelectedItems = create({
  showSelectedItems: false,
});

export const WithCustomComponents = create({
  itemRenderer: Item,
  selectAllRenderer: SelectAll,
  searchRenderer: Search,
  selectedItemRenderer: SelectedItem,
  selectionStatusRenderer: SelectionStatus,
});

export const ItemGrouping = create({
  items: utils.itemsWithGroups,
  withGrouping: true,
});

export const CarouselMultiSelect = create({
  items: utils.images,
  listRenderer: ListRenderer,
  itemRenderer: ListRendererItem,
  selectAllHeight: 40,
  itemHeight: 300,
  selectedItemHeight: 40,
  selectedItemHeight: 40,
});

export const WithSomeOfTheLockedItems = create({
  items: utils.withDisabledItems,
  selectedItems: [
    { id: 0, label: "item 0", disabled: true },
    { id: 5, label: "item 5", disabled: true },
  ],
  isLocked: (item) => item.disabled,
});

export const WithSomeOfTheLockedItemsSelectedAndUnselected = create({
  items: [
    { id: 1, label: "item  1" },
    { id: 2, label: "item 2", disabled: true },
    { id: 5, label: "item 5", disabled: true },
    { id: 3, label: "item  3" },
  ],
  selectedItems: [{ id: 2, label: "item 2" }],
  showSelectedItemsSearch: true,
  isLocked: (item) => item.disabled,
});
