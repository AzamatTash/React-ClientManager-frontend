export const useStatusEvents = (value) => {
	const dataСompleted = value?.filter((event) => event.status === true).length;
	const dataNotСompleted = value?.filter((event) => event.status === false).length;

	const data = [
		{ name: 'Выполнено', value: dataСompleted },
		{ name: 'Не выполнено', value: dataNotСompleted },
	];

	return data;
};
