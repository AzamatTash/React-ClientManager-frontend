import React from 'react';
import { Box, useTheme, Button, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import AuthBackground from '../../accets/AuthBackground';
import AuthField from '../../components/customFields/AuthField';
import { GetCheckoutSchema } from '../../utils/getCheckoutSchema';

const Login = ({ setIsAuth }) => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
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
						justifyContent: 'space-between',
						alignItems: 'center',
						marginBottom: '30px',
					}}
				>
					<Typography variant='h2'>Вход</Typography>
					<Link to={'/register'}>
						<Typography
							style={{
								color: theme.palette.secondary.main,
							}}
						>
							У вас нет аккаунта?
						</Typography>
					</Link>
				</Box>

				<Formik
					onSubmit={handleFormSubmit}
					initialValues={initialValues}
					validationSchema={GetCheckoutSchema().forLogin()}
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
			</Paper>
		</Box>
	);
};

export default Login;
