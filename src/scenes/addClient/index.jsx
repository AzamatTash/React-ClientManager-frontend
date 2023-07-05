import React from 'react';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header';
import ClientsForm from '../../components/ClientsForm';

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
		<Box m={'0px 20px'} minHeight={'100vh'} marginBottom={'20px'}>
			<Header title='Добавление клиента' />
			<ClientsForm
				handleFormSubmit={handleFormSubmit}
				initialValues={initialValues}
				isNonMobile={isNonMobile}
				textBtn='Добавить клиента'
			/>
		</Box>
	);
};

export default AddNewClient;
