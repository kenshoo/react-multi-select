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
 npm install @kenshooui/react-multi-select --save
```

 **Installation using Yarn:**
 
```
 yarn add @kenshooui/react-multi-select
```
  
  
 
 ## How to use 
 
```jsx
import React, { Component } from "react";
import MultiSelect from "@kenshooui/react-multi-select";

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

| Name                            | Type                  | Default                                          | Description                                                                                                                                       
|:-----                           |:-----                 |:-----                                            |:-----                                                                                                                                             
| `items`                         | `List`                | []                                               | list of items .                                                                                                                                   
| `selectedItems`                 | `Array`               | []                                               | selected list to start with (subgroup of items).                                                                                                  
| `onChange`                      | `function`            | ()=>{}                                           | callback for changed event                                                                                                                        
| `loading`                       | `boolean`             | false                                            | toggle to show loading indication.                                                                                                                
| `messages`                      | `Object`              | {}                                               | custom messages. Please see below for the availabale messages                                                                                                                          
| `showSearch   `                 | `boolean`             | true                                             | toggle to show search option.                                        
| `showSelectAll`                 | `boolean`             | true                                             | toggle to show select All option in list.
| `searchIcon`                    | `String`              | 'search'                                         | search items icon. Options are available here: https://material.io/icons
| `deleteIcon`                    | `String`              | 'close'                                          | selected items delete icon. Options are available here: https://material.io/icons
| `wrapperClassName`              | `String`              | ''                                               | wrapper class name. Used for customizing the style
| `listHeight`                    | `number`              | 320                                              | available items list height
| `selectedListHeight`            | `number`              | 361                                              | selected items list height
| `selectedListHeight`            | `number`              | 40                                               | list item height

## Customization

#### Messages 

You can use your own messages. Here is the default messages object :
```jsx
 messages: {
    "source.search.placeholder": "Search...",
    "source.header.selectAll": "Select all",
    "source.noItems": "No items...",
    "destination.noItems": "No items...",
    "destination.header.clearAll": "Clear all",
    "destination.header.none": "None",
    "destination.header.selected": "Selected"
  }
```

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
  
  