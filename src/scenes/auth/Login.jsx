import React from 'react';
import { useTheme, Button } from '@mui/material';
import { Formik } from 'formik';
import { CheckoutSchema } from '../../utils/getCheckoutSchema';
import AuthField from '../../components/customFields/AuthField';
import AuthWrapper from './AuthWrapper';
import AuthHeader from './AuthHeader';

const Login = ({ setIsAuth }) => {
	const theme = useTheme();

	const handleFormSubmit = (values) => {
		setIsAuth(true);
		console.log(values);
	};

	const initialValues = {
		email: '',
		password: '',
	};

	return (
		<AuthWrapper>
			<AuthHeader
				title='Вход'
				linkText='У вас нет аккаунта?'
				theme={theme}
				linkTo='/register'
			/>

			<Formik
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={CheckoutSchema.login()}
			>
				{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						<AuthField
							name='email'
							inputLable='Email'
							values={values}
							touched={touched}
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
						/>
						<AuthField
							name='password'
							inputLable='Пароль'
							values={values}
							touched={touched}
							errors={errors}
							handleBlur={handleBlur}
							handleChange={handleChange}
							isPasswordField={true}
						/>
						<Button fullWidth type='submit' color='secondary' variant='contained'>
							Войти
						</Button>
					</form>
				)}
			</Formik>
		</AuthWrapper>
	);
};

export default Login;
