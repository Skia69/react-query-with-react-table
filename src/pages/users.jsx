import { Stack } from "@mantine/core";
import { format } from "date-fns";
import * as React from "react";

import { Table, TableInput, TablePagination } from "../components";
import {
  useTableActionsContext,
  useTableValuesContext,
} from "../context/table-context";

const Users = () => {
  const {
    queryResult: { data, isFetching, isFetched },
    queryPageIndex,
    queryPageSize,
    queryPageFilter,
    queryPageSortBy,
    queryPageOrder,
  } = useTableValuesContext();
  const { setPageIndex, setPageFilter, setPageSortBy, setPageOrder } =
    useTableActionsContext();

  return (
    <Stack>
      <TableInput
        value={queryPageFilter}
        onChange={setPageFilter}
        isFetched={isFetched}
      />
      <Table
        columns={columns}
        data={data}
        isFetching={isFetching}
        queryPageIndex={queryPageIndex}
        queryPageSize={queryPageSize}
        queryPageFilter={queryPageFilter}
        setPageFilter={setPageFilter}
        queryPageSortBy={queryPageSortBy}
        queryPageOrder={queryPageOrder}
        setPageIndex={setPageIndex}
        setPageOrder={setPageOrder}
        setPageSortBy={setPageSortBy}
      />
      <TablePagination
        page={queryPageIndex}
        onChange={setPageIndex}
        total={Math.floor(data.count / queryPageSize)}
      />
    </Stack>
  );
};

export default Users;

const columns = [
  {
    Header: "Name",
    accessor: "name",
  },

  {
    Header: "Username",
    accessor: "username",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "CreatedAt",
    accessor: "createdAt",
    Cell: ({ value }) => format(new Date(value), "dd/MM/yyyy"),
  },
];
