import React, { useState } from 'react';
import { useTheme, Button } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutSchema } from '../../utils/getCheckoutSchema';
import { fetchLogin } from '../../redux/slices/loginSlice';
import { setIsAuth } from '../../redux/slices/authMeSlice';
import AuthField from '../../components/customFields/AuthField';
import AuthWrapper from './AuthWrapper';
import AuthHeader from './AuthHeader';
import AlertInfo from '../../components/AlertInfo';

const Login = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.login);
	const [isVisibleError, setIsVisibleError] = useState();

	const handleFormSubmit = async (values) => {
		setIsVisibleError(true);
		const { payload } = await dispatch(fetchLogin(values));
		if ('token' in payload) {
			window.localStorage.setItem('token', payload.token);
			dispatch(setIsAuth());
		}
		setTimeout(() => {
			setIsVisibleError(false);
		}, 2000);
	};

	const initialValues = {
		email: '',
		password: '',
	};

	return (
		<>
			<AlertInfo
				isVisible={isVisibleError && status === 'error'}
				type='error'
				message={errorMessage}
				positionY='0'
			/>
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
								statusFetching={status}
								handleBlur={handleBlur}
								handleChange={handleChange}
							/>
							<AuthField
								name='password'
								inputLable='Пароль'
								values={values}
								touched={touched}
								errors={errors}
								statusFetching={status}
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
		</>
	);
};

export default Login;
