const handleSortBy = (
  column,
  queryPageSortBy,
  queryPageOrder,
  setPageSortBy,
  setPageOrder
) =>
  queryPageSortBy === column.id
    ? queryPageOrder === "none"
      ? setPageOrder("asc")
      : queryPageOrder === "asc"
      ? setPageOrder("desc")
      : setPageOrder("none")
    : (setPageSortBy(column.id), setPageOrder("asc"));

export default handleSortBy;
