# Multi select

[![Build Status](https://travis-ci.org/kenshoo/react-multi-select.svg?branch=master)](https://travis-ci.org/kenshoo/react-multi-select) [![npm version](https://badge.fury.io/js/%40kenshooui%2Freact-multi-select.svg)](https://badge.fury.io/js/%40kenshooui%2Freact-multi-select)

**Kenshoo multi select component**

**[react-multi-select demo](https://kenshoo.github.io/react-multi-select)**

Multi select is a straight forward component that helps a user select multiple items in a clear and filterable way.

<p align="center">
    <img src="preview.gif?raw=true" width="600" />
</p>

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


## How to Contribute

#### Setting up development environment 

1. Fork the repository and create your branch from master.
2. To install the project: `yarn install`
3. Running tests: `yarn test` or `yarn test:watch`
4. Running dev environment to work on `yarn storybook` and head to [https://localhost:6006](https://localhost:6006)
  

#### Issuing a change

1. Push to github.
2. If you’ve fixed a bug or added code that should be tested, add tests.
3. Open a Pull Request with the following guidelines:
   - Set title prefix to feature/bug and supply a descriptive PR title.
   - Add description to your Pull Request describing your change.
4. Once your Pull Request is issued  the test suite and build processes will run and we will review your change.
  
  
## Compatibility
  
  - React 16 or newer
  
  