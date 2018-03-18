# Multi selection list

Kenshoo multi selection list component.


<!-- example -->
```jsx
import {MultiSelectionList} from 'kenshoo-shared';

const Something = () => (
    <div>
        <MultiSelectionList items={[{id:1}, {id:2}, {id:3}]} />
    </div>
);
```


## Properties

| Name                            | Type                  | Default                                          | Description                                                                                                                                       |
|:-----                           |:-----                 |:-----                                            |:-----                                                                                                                                             |
| `items`                         | `List`                | []                                               | list of items .                                                                                                                                   |
| `selectedIds`                   | `Array`               | []                                               | selected list to start with (subgroup of items). 
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