import { useState } from 'react';

export const useFetching = (callback) => {
	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const fetching = () => {
		setIsLoading(true);
		callback()
			.then((res) => {
				setData(res.data);
			})
			.catch((e) => {
				setError(e.message);
			})
			.finally(() => setIsLoading(false));
	};

	return {
		fetching,
		data,
		isLoading,
		error,
	};
};
