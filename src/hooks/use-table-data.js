import * as React from 'react';

// Actions
const PAGE_INDEX_CHANGED = 'PAGE_INDEX_CHANGED';
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
const PAGE_FILTER_CHANGED = 'PAGE_FILTER_CHANGED';
const PAGE_SORT_BY_CHANGED = 'PAGE_SORT_BY_CHANGED';
const PAGE_ORDER_CHANGED = 'PAGE_ORDER_CHANGED';

// Reducers
const reducer = (state, { type, payload }) => {
	switch (type) {
		case PAGE_INDEX_CHANGED:
			return { ...state, queryPageIndex: payload };
		case PAGE_SIZE_CHANGED:
			return { ...state, queryPageSize: payload };
		case PAGE_FILTER_CHANGED:
			return { ...state, queryPageFilter: payload };
		case PAGE_SORT_BY_CHANGED:
			return { ...state, queryPageSortBy: payload };
		case PAGE_ORDER_CHANGED:
			return { ...state, queryPageOrder: payload };
		default:
			return state;
	}
};

const useTableData = (initialState) => {
	const [
		{
			queryPageIndex,
			queryPageSize,
			queryPageFilter,
			queryPageSortBy,
			queryPageOrder,
		},
		dispatch,
	] = React.useReducer(reducer, initialState);

	const setPageIndex = React.useCallback(
		(payload) => dispatch({ type: PAGE_INDEX_CHANGED, payload }),
		[],
	);
	const setPageSize = React.useCallback(
		(payload) => dispatch({ type: PAGE_SIZE_CHANGED, payload }),
		[],
	);
	const setPageFilter = React.useCallback(
		(payload) => dispatch({ type: PAGE_FILTER_CHANGED, payload }),
		[],
	);
	const setPageSortBy = React.useCallback(
		(payload) => dispatch({ type: PAGE_SORT_BY_CHANGED, payload }),
		[],
	);
	const setPageOrder = React.useCallback(
		(payload) => dispatch({ type: PAGE_ORDER_CHANGED, payload }),
		[],
	);

	return {
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
	};
};

export default useTableData;
