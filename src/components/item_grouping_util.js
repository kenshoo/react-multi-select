const generateGroup = (name, withGroupClick) => ({
  id: name,
  label: name,
  isGroup: true,
  disabled: !withGroupClick
});

const getGroupItems = (groupName, items) => {
  return items.filter(item => item.group === groupName);
};

export const groupItems = (items, withGroupClick) => {
  if (!items || items.length === 0) {
    return items;
  }
  const uniqueGroups = Array.from(new Set(items.map(item => item.group)));
  return uniqueGroups.reduce((result, groupName) => {
    const groupItems = getGroupItems(groupName, items);
    result.push(generateGroup(groupName, withGroupClick));
    result.push(...groupItems);
    return result;
  }, []);
};
