import * as yup from 'yup';

export const GetCheckoutSchema = () => {
	const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

	return yup.object().shape({
		firstName: yup.string().required('обязательное поле'),
		lastName: yup.string().required('обязательное поле'),
		surName: yup.string(),
		instagram: yup.string(),
		phone: yup
			.string()
			.min(11, 'номер телефона недействителен!')
			.max(21, 'номер телефона недействителен!')
			.matches(phoneRegExp, 'номер телефона недействителен!')
			.required('обязательное поле'),
		visits: yup.number(),
	});
};
