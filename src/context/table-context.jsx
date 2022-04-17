import * as React from 'react';

import useTableData from '../hooks/use-table-data';
import useUsers from '../hooks/use-users';

import { contextFactory } from './context-factory';

// Initial state
const initialState = {
	queryPageIndex: 1,
	queryPageSize: 10,
	queryPageFilter: '',
	queryPageSortBy: [],
	queryPageOrder: 'none',
};

const [useTableValuesContext, TableValuesContext] = contextFactory();
const [useTableActionsContext, TableActionsContext] = contextFactory();

export { useTableActionsContext, useTableValuesContext };

const TableContextProvider = ({ children }) => {
	const {
		queryPageIndex,
		queryPageSize,
		queryPageFilter,
		queryPageSortBy,
		queryPageOrder,
		setPageIndex,
		setPageSize,
		setPageFilter,
		setPageSortBy,
		setPageOrder,
	} = useTableData(initialState);

	const queryResult = useUsers(
		queryPageIndex,
		queryPageSize,
		queryPageFilter,
		queryPageSortBy,
		queryPageOrder,
	);

	const values = React.useMemo(
		() => ({
			queryResult,
			queryPageIndex,
			queryPageSize,
			queryPageFilter,
			queryPageSortBy,
			queryPageOrder,
		}),
		[
			queryResult,
			queryPageIndex,
			queryPageSize,
			queryPageFilter,
			queryPageSortBy,
			queryPageOrder,
		],
	);

	const actions = React.useMemo(
		() => ({
			setPageIndex,
			setPageSize,
			setPageFilter,
			setPageSortBy,
			setPageOrder,
		}),
		[setPageIndex, setPageSize, setPageFilter, setPageSortBy, setPageOrder],
	);

	return (
		<TableValuesContext.Provider value={values}>
			<TableActionsContext.Provider value={actions}>
				{children}
			</TableActionsContext.Provider>
		</TableValuesContext.Provider>
	);
};

export default TableContextProvider;
