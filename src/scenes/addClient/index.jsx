import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Formik } from 'formik';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import { GetCheckoutSchema } from '../../utils/getCheckoutSchema';

const AddNewClient = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	const handleFormSubmit = (values) => {
		console.log(values);
	};

	const initialValues = {
		firstName: '',
		lastName: '',
		surName: '',
		phone: '',
		instagram: '',
		visits: 1,
	};

	return (
		<Box m={'0px 20px'} maxHeight={'100vh'}>
			<Header title='Добавление клиента' />

			<Formik
				onSubmit={handleFormSubmit}
				initialValues={initialValues}
				validationSchema={GetCheckoutSchema}
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
								variant='filled'
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
								variant='filled'
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
								variant='filled'
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
								variant='filled'
								type='text'
								label='Instagram'
								onBlur={handleBlur}
								onChange={handleChange}
								value={values.email}
								name='instagram'
								error={!!errors.instagram}
								sx={{ gridColumn: 'span 4' }}
							/>
							<TextField
								fullWidth
								variant='filled'
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
								variant='filled'
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
						<Box display='flex' justifyContent='end' mt='20px'>
							<Button type='submit' color='secondary' variant='contained'>
								Добавить клиента
							</Button>
						</Box>
					</form>
				)}
			</Formik>
		</Box>
	);
};

export default AddNewClient;
