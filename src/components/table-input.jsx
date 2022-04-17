import { SearchIcon } from "@heroicons/react/outline";
import { Input, InputWrapper, Loader } from "@mantine/core";
import React from "react";

const TableInput = ({ value, onChange, isFetched }) => {
  return (
    <InputWrapper
      id="global-filter"
      size="md"
      label="Search"
      description="This is a global search input field allowing you to use any of the available table headers for your search.">
      <Input
        id="global-filter"
        size="md"
        icon={<SearchIcon style={{ width: "20px" }} />}
        value={value}
        onChange={({ currentTarget }) => onChange(currentTarget.value)}
        placeholder="Search by any field"
        rightSection={
          value.length > 0 && !isFetched ? <Loader size="xs" /> : null
        }
      />
    </InputWrapper>
  );
};

export default TableInput;
