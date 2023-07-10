export const getDate = (str) => {
	if (str === undefined) {
		return '';
	}

	const date = new Date(str);

	const weekdays = ['Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
	];

	return `${weekdays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
};
