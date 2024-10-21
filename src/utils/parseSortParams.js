function parseSortBy(value) {
  if (typeof value != 'string') {
    return '_id';
  }

  const key = 'name';

  if (value != key) {
    return '_id';
  }

  return value;
}

function parseSortOrder(value) {
  if (typeof value != 'string') {
    return 'asc';
  }

  if (['asc', 'desc'].includes(value) != true) {
    return 'asc';
  }
  return value;
}

export function parseSortParams(query) {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
}
