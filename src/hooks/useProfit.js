export const useProfit = (value, typeProfit) => {
	const months = [
		'янв',
		'февр',
		'март',
		'апр',
		'май',
		'июнь',
		'июль',
		'авг',
		'сент',
		'окт',
		'нояб',
		'дек',
	];

	const profit = [];

	const data = value
		?.filter(
			(event) =>
				new Date(Date.parse(event.start)).getFullYear() === new Date().getFullYear() &&
				event.status === true
		)
		.map((event) => ({
			idMonth: new Date(Date.parse(event.start)).getMonth(),
			month: months[new Date(Date.parse(event.start)).getMonth()],
			amount: typeProfit === 'money' ? +event.price : 1,
		}));

	if (data) {
		let month = data[0]?.month;
		let total = data[0]?.amount;

		for (let i = 1; i < data.length; i++) {
			if (data[i].month === month) {
				total = total + data[i].amount;
			} else {
				profit.push({ month, amount: total });
				month = data[i].month;
				total = data[i].amount;
			}

			if (i === data.length - 1) {
				profit.push({ month, amount: total });
			}
		}
	}

	return profit;
};
