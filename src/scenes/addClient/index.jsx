import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import ClientsForm from '../../components/ClientsForm';
import { fetchCreateClient } from '../../redux/slices/clientSlice';
import AlertInfo from '../../components/AlertInfo';

const AddNewClient = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.client);
	const [alertData, setAlertData] = useState({
		isVisible: false,
		type: '',
		message: '',
	});

	const initialValues = {
		firstName: '',
		lastName: '',
		surName: '',
		phoneNumber: '',
		instagram: '',
		visits: 1,
	};

	const handleFormSubmit = async (values, { resetForm }) => {
		const { payload } = await dispatch(fetchCreateClient(values));
		if ('id' in payload) {
			setAlertData({
				isVisible: true,
				type: 'success',
				message: `Клиент - ${payload.firstName} добавлен`,
			});
		} else {
			setAlertData({
				isVisible: true,
				type: 'error',
				message: 'Не удалось добавить клиента',
			});
		}
		setTimeout(() => {
			setAlertData({
				isVisible: false,
				type: '',
				message: '',
			});
		}, 2000);
		resetForm({});
	};

	return (
		<Box m={'0px 20px'} minHeight={'100vh'} marginBottom={'20px'} position='relative'>
			{alertData.isVisible && (
				<AlertInfo
					isVisible={alertData.isVisible}
					type={alertData.type}
					message={alertData.message}
					positionY='-57'
				/>
			)}
			<Header title='Добавление клиента' />
			<ClientsForm
				handleFormSubmit={handleFormSubmit}
				initialValues={initialValues}
				isNonMobile={isNonMobile}
				textBtn='Добавить клиента'
				disabledBtn={status === 'loading'}
			/>
		</Box>
	);
};

export default AddNewClient;
