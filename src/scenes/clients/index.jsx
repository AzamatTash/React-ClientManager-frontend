import React, { useState } from 'react';
import { Box, IconButton, InputBase, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { tokens } from '../../theme';
import { getStyledDataGrid } from './styleDataGrid';
import Header from '../../components/Header';
import Options from '../../components/Options';
import BasePopup from '../../components/BasePopup';
import ClientsForm from '../../components/ClientsForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	fetchGetClient,
	fetchGetClients,
	fetchRemoveClient,
	fetchUpdateClient,
} from '../../redux/slices/clientSlice';
import AlertInfo from '../../components/AlertInfo';

const Clients = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [alertData, setAlertData] = useState({
		type: 'info',
		message: '',
	});
	const [isVisibleAlert, setIsVisibleAlert] = useState(false);
	const dispatch = useDispatch();
	const { data, status, errorMessage } = useSelector((state) => state.client);
	const [isVisiblePopup, setIsVisiblePopup] = useState(false);

	const handleDeleteClient = async (id) => {
		const { payload } = await dispatch(fetchRemoveClient(id));
		if (payload.message) {
			setAlertData({
				type: 'success',
				message: payload.message,
			});
			setIsVisibleAlert(true);
		}
		setTimeout(() => {
			setIsVisibleAlert(false);
		}, 2000);
	};

	const handleEdit = async (id) => {
		const { payload } = await dispatch(fetchGetClient(id));
		if (payload.id) {
			setIsVisiblePopup(true);
		} else {
			setAlertData({
				type: 'error',
				message: payload.message,
			});
			setIsVisibleAlert(true);
			setTimeout(() => {
				setIsVisibleAlert(false);
			}, 2000);
		}
	};

	const handleSaveClient = async (values) => {
		const { payload } = await dispatch(fetchUpdateClient({ id: data.id, ...values }));
		if (payload.id) {
			setAlertData({
				type: 'success',
				message: 'Изменения сохранены',
			});
			setIsVisibleAlert(true);
			setTimeout(() => {
				setIsVisibleAlert(false);
			}, 2000);
		} else {
			setAlertData({
				type: 'error',
				message: errorMessage,
			});
			setIsVisibleAlert(true);
			setTimeout(() => {
				setIsVisibleAlert(false);
			}, 2000);
		}
		setIsVisiblePopup(false);
	};

	useEffect(() => {
		dispatch(fetchGetClients());
	}, [isVisibleAlert]);

	const columns = [
		{
			field: '',
			headerName: 'ID',
			minWidth: 35,
			maxWidth: 40,
			renderCell: (params) => {
				return data.indexOf(params.row) + 1;
			},
		},
		{
			field: 'firstName',
			headerName: 'Имя',
			flex: 1,
			minWidth: 100,
		},
		{
			field: 'lastName',
			headerName: 'Фамилия',
			flex: 1,
			minWidth: 100,
		},
		{
			field: 'surName',
			headerName: 'Отчество',
			flex: 1,
			minWidth: 80,
		},
		{
			field: 'instagram',
			headerName: 'Instagram',
			flex: 1,
			minWidth: 100,
		},
		{
			field: 'phoneNumber',
			headerName: 'Телефон',
			flex: 1,
			minWidth: 120,
		},
		{
			field: 'visits',
			headerName: 'Посищений',
			flex: 1,
			minWidth: 80,
		},
		{
			field: 'delete',
			headerName: '',
			sortable: false,
			width: 10,
			renderCell: (params) => (
				<Options
					removeItem={() => handleDeleteClient(params.row.id)}
					editItem={() => handleEdit(params.row.id)}
				/>
			),
		},
	];

	return (
		<Box m={'0px 20px'} maxHeight={'100vh'} position='relative'>
			<AlertInfo
				isVisible={isVisibleAlert}
				type={alertData.type}
				message={alertData.message}
				positionY='-53'
			/>
			<Header title='Клиенты' />

			{/* <Box display={'flex'} backgroundColor={colors.primary[400]} borderRadius={'3px'}>
				<InputBase sx={{ ml: 2, flex: 1 }} placeholder={'Поиск'} />
				<IconButton type={'button'} sx={{ p: 1 }}>
					<SearchIcon />
				</IconButton>
			</Box> */}

			<Box m='20px 0 0 0' height='80vh' paddingBottom={'20px'} sx={getStyledDataGrid(colors)}>
				<DataGrid
					rows={data ? data : []}
					columns={columns}
					disableColumnMenu={true}
					disableRowSelectionOnClick={true}
					hideFooter={true}
					loading={status === 'loading'}
				/>
			</Box>
			{isVisiblePopup && (
				<BasePopup setIsVisible={setIsVisiblePopup}>
					<ClientsForm
						isNonMobile={isNonMobile}
						handleFormSubmit={handleSaveClient}
						initialValues={data ? data : {}}
						textBtn='Сохранить'
						isPopup
						setIsVisible={setIsVisiblePopup}
					/>
				</BasePopup>
			)}
		</Box>
	);
};

export default Clients;
