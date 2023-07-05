import React from 'react';
import { Box, useTheme, Button, useMediaQuery } from '@mui/material';
import { Formik } from 'formik';
import { CheckoutSchema } from '../../utils/getCheckoutSchema';
import AuthField from '../../components/customFields/AuthField';
import AuthWrapper from './AuthWrapper';
import AuthHeader from './AuthHeader';

const Register = () => {
	const isNonMobile = useMediaQuery('(min-width:530px)');
	const isMobileS = useMediaQuery('(max-width:413px)');
	const theme = useTheme();

	const handleFormSubmit = (values) => {
		console.log(values);
	};

	const initialValues = {
		name: '',
		lastName: '',
		email: '',
		password: '',
	};

	return (
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
								name='name'
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
							Создать аккаунта
						</Button>
					</form>
				)}
			</Formik>
		</AuthWrapper>
	);
};

export default Register;
