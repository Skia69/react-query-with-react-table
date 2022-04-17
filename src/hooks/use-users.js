import { useQuery } from 'react-query';
import { useAsyncDebounce } from 'react-table';

import { fetchPaginatedUsers } from '../api/user-api';

const useUsers = (
	queryPageIndex,
	queryPageSize,
	queryPageFilter,
	queryPageSortBy,
	queryPageOrder,
) => {
	const debouncedFetchPaginatedUsers = useAsyncDebounce(
		fetchPaginatedUsers,
		300,
	);

	return useQuery(
		[
			'users',
			queryPageIndex,
			queryPageSize,
			queryPageFilter,
			queryPageSortBy,
			queryPageOrder,
		],
		() =>
			debouncedFetchPaginatedUsers(
				queryPageIndex,
				queryPageSize,
				queryPageFilter,
				queryPageSortBy,
				queryPageOrder,
			),
		{
			keepPreviousData: true,
			staleTime: Infinity,
			suspense: true,
		},
	);
};

export default useUsers;
