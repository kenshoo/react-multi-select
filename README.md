# Multi select

[![Build Status](https://travis-ci.org/kenshoo/react-multi-select.svg?branch=master)](https://travis-ci.org/kenshoo/react-multi-select) [![GitHub version](https://badge.fury.io/gh/kenshoo%2Freact-multi-select.svg)](https://badge.fury.io/gh/kenshoo%2Freact-multi-select)

**Kenshoo multi select component**

Multi select is a straight forward component that helps a user select multiple items in a clear and filterable way.

![Preview](preview.png?raw=true "Preview")

## Installation
 
 **Installation using npm:**
 
 ```
 npm install @kenhooui/react-multi-select --save
 ```

 **Installation using Yarn:**
 
  ```
  yarn add @kenhooui/react-multi-select
  ```
  
  
 
 ## How to use 
 
```jsx
import React, { Component } from "react";
import MultiSelect from "@kenhooui/react-multi-select";

class Example extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      items: [
        { id: 0, label: "item 1" },
        { id: 2, label: "item 2" },
        { id: 3, label: "item 3" },
        { id: 4, label: "item 4" }
      ],
      selectedItems: []
    };
  }

  handleChange(selectedItems) {
    this.setState({ selectedItems });
  }
  render() {
    const { items, selectedItems } = this.state;
    return (
      <MultiSelect
        items={items}
        selectedItems={selectedItems}
        onChange={this.handleChange}
      />
    );
  }
}
```


## Properties

| Name                            | Type                  | Default                                          | Description                                                                                                                                       |
|:-----                           |:-----                 |:-----                                            |:-----                                                                                                                                             |
| `items`                         | `List`                | []                                               | list of items .                                                                                                                                   |
| `selectedItems`                 | `Array`               | []                                               | selected list to start with (subgroup of items). 
| `searchPlaceholder`             | `String`              | 'Search...'                                      | Search box place holder                                                                                                                           |
| `emptyText`                     | `String`              | 'No items...'                                    | Text to display when list is empty                                                                                                                |
| `sortFn`                        | `function`            | undefined                                        | list item auto sorting (on items changed)                                                                                                         |
| `onOrderChanged`                | `function`            | ()=>{}                                           | callback for order changed event (by navigation buttons or drag-n-drop)                                                                           |
| `withNavigation`                | `boolean`             | false                                            | toggle to show navigation buttons in list                                                                                                         |
| `groups`                        | `List`                | []                                               | list of objects. Groups will appear as titles for items. Example of object: {id: 1, label: 'A', selectGroupLabel: 'Select All', itemIds:[1, 2]}]  |
| `isItemLockedFn`                | `function`            | (item)=>false                                    | function to define whether item should be blocked for navigation                                                                                  |
| `sumItemsInPageForLazyLoad`     | `number`              | 100                                              | actual for lazyLoad props - sum of list items for single page                                                                                     |
| `msDelayOnChangeFilter`         | `number`              | null -(if lazyload true by default passed 600 ms)| onChange is delayed before performing a function as the number of ms this value contains                                                          |
| `withSelectAll`                 | `boolean`             | false                                            | toggle to show select All option in list.


  
## Compatibility
  
  - React 16 or newer
  
  