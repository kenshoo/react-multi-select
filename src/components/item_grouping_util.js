const generateGroup = name => ({
  id: name,
  label: name,
  isGroup: true,
  disabled: true
});

const getGroupItems = (groupName, items) => {
  return items.filter(item => item.group === groupName);
};

export const groupItems = items => {
  if (!items || items.length === 0) {
    return items;
  }
  const uniqueGroups = Array.from(
    new Set(items.map(item => item.group))
  ).sort();
  return uniqueGroups.reduce((result, groupName) => {
    const groupItems = getGroupItems(groupName, items);
    result.push(generateGroup(groupName));
    result.push(...groupItems);
    return result;
  }, []);
};
