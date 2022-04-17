import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";

const SortingIcon = (column, queryPageSortBy, queryPageOrder) => (
  <>
    {column === queryPageSortBy && queryPageOrder === "asc" ? (
      <ChevronDownIcon style={{ width: "16px" }} />
    ) : column === queryPageSortBy && queryPageOrder === "desc" ? (
      <ChevronUpIcon style={{ width: "16px" }} />
    ) : null}
  </>
);

export default SortingIcon;
