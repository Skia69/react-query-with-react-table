import {
  Group,
  Skeleton,
  Table as MantineTable,
  createStyles,
} from "@mantine/core";
import * as React from "react";
import { usePagination, useSortBy, useTable } from "react-table";

import { SortingIcon } from "../components";
import handleSortBy from "../helpers/handle-sort-by";

const Table = ({
  columns,
  data,
  isFetching,
  queryPageIndex,
  queryPageSize,
  queryPageFilter,
  queryPageSortBy,
  queryPageOrder,
  setPageIndex,
  setPageOrder,
  setPageSortBy,
}) => {
  const { classes } = useStyles();

  const tableColumns = React.useMemo(() => columns, [columns]);
  const tableData = React.useMemo(() => data, [data]);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } =
    useTable(
      {
        columns: tableColumns,
        data: tableData.users ?? [],
        initialState: {
          pageIndex: queryPageIndex,
          pageSize: queryPageSize,
        },
        useControlledState,
        manualPagination: true, // We will handle pagination manually
        pageCount: tableData.count ?? null,
        setQueryPageIndex: queryPageIndex,
        setQueryPageSize: queryPageSize,
        manualSortBy: true, // We will handle sorting manually
        defaultCanSort: true,
      },
      useSortBy,
      usePagination
    );

  /* Controll the table state manually
   * since pagination, filtering and ordering are done server-side */
  function useControlledState(state) {
    return React.useMemo(
      () => ({
        ...state,
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
      }),
      [state]
    );
  }

  const onHandleSortBy = (column) => () =>
    handleSortBy(
      column,
      queryPageSortBy,
      queryPageOrder,
      setPageSortBy,
      setPageOrder
    );

  /* reset the page index to 1 and page order to 'none'
   * when you start typing in the input field
   * while you're not on the first page
   */
  React.useEffect(() => {
    setPageOrder("none");
    setPageIndex(1);
  }, [queryPageFilter, setPageOrder, setPageIndex]);

  /* reset to page index 1
   * when the sorting changes
   */
  React.useEffect(() => {
    setPageIndex(1);
  }, [queryPageSortBy, setPageIndex]);

  return (
    <MantineTable
      verticalSpacing={"xs"}
      horizontalSpacing={"md"}
      className={classes.table}
      {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column.id}
                onClick={onHandleSortBy(column)}>
                <Group>
                  {column.render("Header")}
                  {SortingIcon(column.id, queryPageSortBy, queryPageOrder)}
                </Group>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell, index) => (
                <td {...cell.getCellProps()} key={index}>
                  {isFetching ? <Skeleton height={28} /> : cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </MantineTable>
  );
};

export default Table;

const useStyles = createStyles((theme) => ({
  table: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    borderRadius: "0.25rem",
    overflow: "hidden",
    boxShadow: theme.shadows.xs,
    "& th": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },
}));
