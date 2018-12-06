export const buildItemGrouping = (items, withGrouping) => {
  if (!withGrouping || !items || items.length === 0) {
    return items;
  }
  const uniqueGroups = Array.from(new Set(items.map(p => p.group))).sort();
  let groupedItems = [];
  uniqueGroups.forEach(group => {
    groupedItems.push({
      id: group,
      label: group,
      isGroup: true,
      disabled: true
    });
    items.forEach(item => {
      if (item.group === group) {
        groupedItems.push(item);
      }
    });
  });
  return groupedItems;
};
