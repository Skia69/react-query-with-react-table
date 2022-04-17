import api from './api';

export const fetchPaginatedUsers = async (
	page,
	limit,
	search,
	sortBy,
	order,
) => {
	const { data } = await api.get(
		'https://6245c3ca739ac84591863cbe.mockapi.io/api/v1/users',
		{
			params: {
				page,
				limit,
				...(search ? { search } : {}),
				...(sortBy ? { sortBy } : {}),
				...(order ? { order } : {}),
			},
		},
	);

	return data;
};
