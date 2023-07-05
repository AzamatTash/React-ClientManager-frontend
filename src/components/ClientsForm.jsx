import React from 'react';
import { Box, Button, TextField, useMediaQuery } from '@mui/material';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Formik } from 'formik';
import { CheckoutSchema } from '../utils/getCheckoutSchema';

const ClientsForm = ({
	handleFormSubmit,
	initialValues,
	isNonMobile,
	textBtn,
	isPopup,
	setIsVisible,
}) => {
	const isMobile = useMediaQuery('(max-width:425px)');

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={initialValues}
			validationSchema={CheckoutSchema.addClient()}
		>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<Box
						display='grid'
						gap='30px'
						gridTemplateColumns='repeat(4, minmax(0, 1fr))'
						sx={{
							'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
						}}
					>
						<TextField
							fullWidth
							variant='outlined'
							type='text'
							label='Имя'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.firstName}
							name='firstName'
							error={!!touched.firstName && !!errors.firstName}
							helperText={touched.firstName && errors.firstName}
							sx={{ gridColumn: 'span 2' }}
						/>
						<TextField
							fullWidth
							variant='outlined'
							type='text'
							label='Фамилия'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.lastName}
							name='lastName'
							error={!!touched.lastName && !!errors.lastName}
							helperText={touched.lastName && errors.lastName}
							sx={{ gridColumn: 'span 2' }}
						/>
						<TextField
							fullWidth
							variant='outlined'
							type='text'
							label='Отчество'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.surName}
							name='surName'
							error={!!errors.surName}
							helperText={errors.surName}
							sx={{ gridColumn: 'span 4' }}
						/>
						<TextField
							fullWidth
							variant='outlined'
							type='text'
							label='Instagram'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.instagram}
							name='instagram'
							error={!!errors.instagram}
							sx={{ gridColumn: 'span 4' }}
						/>
						<TextField
							fullWidth
							variant='outlined'
							type='text'
							label='Телефон'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.phone}
							name='phone'
							error={!!touched.phone && !!errors.phone}
							helperText={touched.phone && errors.phone}
							sx={{ gridColumn: 'span 2' }}
						/>
						<TextField
							fullWidth
							variant='outlined'
							type='text'
							label='Посищений'
							onBlur={handleBlur}
							onChange={handleChange}
							value={values.visits}
							name='visits'
							error={!!errors.visits}
							sx={{ gridColumn: 'span 2' }}
						/>
					</Box>
					<Box
						display='flex'
						flexDirection={isMobile ? 'column' : ''}
						justifyContent={isMobile ? 'center' : 'end'}
						mt='20px'
					>
						<Button
							type='submit'
							color='secondary'
							variant='contained'
							sx={{
								marginBottom: isMobile ? '20px' : '0px',
								minWidth: isMobile ? '100%' : '95px',
							}}
						>
							{textBtn}
						</Button>
						{isPopup && (
							<Button
								type='button'
								color='secondary'
								variant='contained'
								onClick={() => setIsVisible(false)}
								sx={{
									marginLeft: isMobile ? '0px' : '20px',
									width: isMobile ? '100%' : '95px',
								}}
							>
								<ExitToAppOutlinedIcon />
							</Button>
						)}
					</Box>
				</form>
			)}
		</Formik>
	);
};

export default ClientsForm;
