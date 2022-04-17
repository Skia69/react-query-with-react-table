import { Pagination } from "@mantine/core";
import React from "react";

const TablePagination = ({ page, onChange, total }) => {
  return (
    <Pagination
      page={page}
      onChange={(pageIndex) => onChange(pageIndex)}
      total={total}
      withEdges
    />
  );
};

export default TablePagination;
