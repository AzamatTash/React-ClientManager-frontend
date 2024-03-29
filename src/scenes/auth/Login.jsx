import React, { useEffect, useState } from 'react';
import { useTheme, Button } from '@mui/material';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CheckoutSchema } from '../../utils/getCheckoutSchema';
import { fetchLogin } from '../../redux/slices/loginSlice';
import { fetchAuthMe } from '../../redux/slices/authMeSlice';
import AlertInfo from '../../components/AlertInfo';
import AuthField from '../../components/customFields/AuthField';
import AuthWrapper from './AuthWrapper';
import AuthHeader from './AuthHeader';

const Login = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.login);
	const [isVisibleError, setIsVisibleError] = useState();
	const navigate = useNavigate();

	const handleFormSubmit = async (values) => {
		setIsVisibleError(true);
		const { payload } = await dispatch(fetchLogin(values));
		if ('token' in payload) {
			window.localStorage.setItem('token', payload.token);
			await dispatch(fetchAuthMe());
			navigate('/');
		}
		setTimeout(() => {
			setIsVisibleError(false);
		}, 2000);
	};

	const initialValues = {
		email: 'test98@mail.ru',
		password: '4501',
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
							<Button
								fullWidth
								type='submit'
								color='secondary'
								variant='contained'
								disabled={status === 'loading'}
							>
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
