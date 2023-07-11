import React, { useState } from 'react';
import { Box, useTheme, Button, useMediaQuery } from '@mui/material';
import { Formik } from 'formik';
import { CheckoutSchema } from '../../utils/getCheckoutSchema';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../../redux/slices/registerSlice';
import AuthField from '../../components/customFields/AuthField';
import AuthWrapper from './AuthWrapper';
import AuthHeader from './AuthHeader';
import AlertInfo from '../../components/AlertInfo';
import { fetchAuthMe } from '../../redux/slices/authMeSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const isNonMobile = useMediaQuery('(min-width:530px)');
	const isMobileS = useMediaQuery('(max-width:413px)');
	const theme = useTheme();
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.register);
	const [isVisibleError, setIsVisibleError] = useState();
	const navigate = useNavigate();

	const handleFormSubmit = async (values) => {
		setIsVisibleError(true);
		const { payload } = await dispatch(fetchRegister(values));
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
		firstName: '',
		lastName: '',
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
					title='Регистрация'
					linkText='У вас есть аккаунта?'
					isMobileS={isMobileS}
					theme={theme}
					linkTo='/login'
				/>

				<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={CheckoutSchema.register()}
				>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<Box
								sx={{
									width: '100%',
									display: isNonMobile ? 'flex' : 'block',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<AuthField
									name='firstName'
									inputLable='Имя'
									values={values}
									touched={touched}
									errors={errors}
									handleBlur={handleBlur}
									handleChange={handleChange}
								/>
								<AuthField
									name='lastName'
									inputLable='Фамилия'
									values={values}
									touched={touched}
									errors={errors}
									handleBlur={handleBlur}
									handleChange={handleChange}
								/>
							</Box>
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
								Создать аккаунта
							</Button>
						</form>
					)}
				</Formik>
			</AuthWrapper>
		</>
	);
};

export default Register;
