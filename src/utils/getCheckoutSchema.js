import * as yup from 'yup';

export const GetCheckoutSchema = () => {
	const phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

	return {
		forEvent: () => {
			return yup.object().shape({
				title: yup
					.string()
					.max(20, 'название не более 20 символов')
					.required('обязательное поле'),
				time: yup.string().required('обязательное поле'),
				clients: yup.string().required('обязательное поле'),
				price: yup.string().required('обязательное поле'),
			});
		},
		forAddClient: () => {
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
		},
		forLogin: () => {
			return yup.object().shape({
				email: yup.string().required('обязательное поле'),
				password: yup.string().required('обязательное поле'),
			});
		},
		forRegister: () => {
			return yup.object().shape({
				name: yup
					.string()
					.min(3, 'имя слишком короткое')
					.max(12, 'имя слишком длиное')
					.required('обязательное поле'),
				lastName: yup
					.string()
					.min(3, 'фамилия слишком короткая')
					.max(12, 'фамилия слишком длиная')
					.required('обязательное поле'),

				email: yup.string().required('обязательное поле').email('не верный формат email'),
				password: yup.string().required('обязательное поле'),
			});
		},
	};
};
