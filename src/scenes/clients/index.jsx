import React, { useState } from 'react';
import { Box, IconButton, InputBase, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { tokens } from '../../theme';
import { mockDataClients } from '../../data/mockData';
import { getStyledDataGrid } from './styleDataGrid';
import Header from '../../components/Header';
import Options from '../../components/Options';
import BasePopup from '../../components/BasePopup';
import ClientsForm from '../../components/ClientsForm';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGetClients } from '../../redux/slices/clientSlice';

const Clients = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const dispatch = useDispatch();
	const { data, status } = useSelector((state) => state.client);

	const [isVisible, setIsVisible] = useState(false);
	const [currentItem, setCurrentItem] = useState({
		id: '',
		firstName: '',
		lastName: '',
		surName: '',
		phone: '',
		instagram: '',
		visits: 1,
	});

	const handleDelete = (id) => {
		// setData((prevData) => prevData.filter((row) => row.id !== id));
	};

	const handleEdit = (id) => {
		// const item = data.find((item) => item.id === id);
		// setCurrentItem({ ...currentItem, ...item });
		// setIsVisible(true);
	};

	const handleFormSubmit = (values) => {
		console.log(values);
		setIsVisible(false);
	};

	useEffect(() => {
		dispatch(fetchGetClients());
	}, []);

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
					removeItem={() => handleDelete(params.row.id)}
					editItem={() => handleEdit(params.row.id)}
				/>
			),
		},
	];

	return (
		<Box m={'0px 20px'} maxHeight={'100vh'}>
			<Header title='Клиенты' />

			<Box display={'flex'} backgroundColor={colors.primary[400]} borderRadius={'3px'}>
				<InputBase sx={{ ml: 2, flex: 1 }} placeholder={'Поиск'} />
				<IconButton type={'button'} sx={{ p: 1 }}>
					<SearchIcon />
				</IconButton>
			</Box>

			<Box m='20px 0 0 0' height='75vh' paddingBottom={'20px'} sx={getStyledDataGrid(colors)}>
				<DataGrid
					rows={data ? data : []}
					columns={columns}
					disableColumnMenu={true}
					disableRowSelectionOnClick={true}
					hideFooter={true}
					loading={status === 'loading'}
				/>
			</Box>
			{isVisible && (
				<BasePopup setIsVisible={setIsVisible}>
					<ClientsForm
						isNonMobile={isNonMobile}
						handleFormSubmit={handleFormSubmit}
						initialValues={currentItem}
						textBtn='Сохранить'
						isPopup
						setIsVisible={setIsVisible}
					/>
				</BasePopup>
			)}
		</Box>
	);
};

export default Clients;
