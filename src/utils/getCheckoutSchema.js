import * as yup from 'yup';

export class CheckoutSchema {
	phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

	static event() {
		return yup.object().shape({
			title: yup
				.string()
				.max(20, 'название не более 20 символов')
				.required('обязательное поле'),
			time: yup.string().required('обязательное поле'),
			client: yup.string().required('обязательное поле'),
			price: yup.string().required('обязательное поле'),
		});
	}

	static addClient() {
		return yup.object().shape({
			firstName: yup.string().required('обязательное поле'),
			lastName: yup.string().required('обязательное поле'),
			surName: yup.string(),
			instagram: yup.string(),
			phoneNumber: yup
				.string()
				.min(11, 'номер телефона недействителен!')
				.max(21, 'номер телефона недействителен!')
				.matches(this.phoneRegExp, 'номер телефона недействителен!')
				.required('обязательное поле'),
			visits: yup.number(),
		});
	}

	static login() {
		return yup.object().shape({
			email: yup.string().required('обязательное поле'),
			password: yup.string().required('обязательное поле'),
		});
	}

	static register() {
		return yup.object().shape({
			firstName: yup
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
	}
}
