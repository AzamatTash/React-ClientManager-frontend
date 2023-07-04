import React from 'react';
import { Box, useTheme, Button, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { GetCheckoutSchema } from '../../utils/getCheckoutSchema';
import AuthBackground from '../../accets/AuthBackground';
import AuthField from '../../components/customFields/AuthField';

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
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '0 20px',
			}}
		>
			<AuthBackground />
			<Paper
				elevation={3}
				sx={{
					width: '100%',
					maxWidth: '500px',
					padding: isNonMobile ? '40px' : '20px',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: isMobileS ? 'column' : '',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: isMobileS ? '5px' : '30px',
					}}
				>
					<Typography variant='h2' marginBottom={isMobileS ? '5px' : ''}>
						Регистрация
					</Typography>
					<Link to={'/login'}>
						<Typography
							style={{
								color: theme.palette.secondary.main,
							}}
						>
							У вас есть аккаунта?
						</Typography>
					</Link>
				</Box>

				<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={GetCheckoutSchema().forRegister()}
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
			</Paper>
		</Box>
	);
};

export default Register;
