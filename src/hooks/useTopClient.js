export const useTopClient = (value) => {
	const data = value
		?.sort((a, b) => a.visit - b.visit)
		.slice(0, 5)
		.map((client) => ({
			name: client.firstName,
			value: client.visits,
		}));

	return data;
};
