import React, { useState } from 'react';
import { Box, IconButton, InputBase, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { tokens } from '../../theme';
import Header from '../../components/Header';
import { mockDataClients } from '../../data/mockData';
import SearchIcon from '@mui/icons-material/Search';
import Options from '../../components/options/Options';

const Clients = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [data, setData] = useState([...mockDataClients]);

	const handleDelete = (id) => {
		setData((prevData) => prevData.filter((row) => row.id !== id));
	};

	const columns = [
		{ field: 'id', headerName: 'ID', minWidth: 35, maxWidth: 40 },
		{
			field: 'name',
			headerName: 'ФИО',
			flex: 1,
			minWidth: 120,
		},
		{
			field: 'instagram',
			headerName: 'Instagram',
			flex: 1,
			minWidth: 100,
		},
		{
			field: 'phone',
			headerName: 'Телефон',
			flex: 1,
			minWidth: 100,
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
			renderCell: (params) => <Options delete={() => handleDelete(params.row.id)} />,
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

			<Box
				m='20px 0 0 0'
				height='75vh'
				paddingBottom={'20px'}
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none',
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none',
					},
					'& .name-column--cell': {
						color: colors.greenAccent[300],
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: colors.blueAccent[700],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400],
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: colors.blueAccent[700],
					},
					'& .MuiCheckbox-root': {
						color: `${colors.greenAccent[200]} !important`,
					},
					'& .MuiDataGrid-toolbarContainer .MuiButton-text': {
						color: `${colors.grey[100]} !important`,
					},
					'& .MuiDataGrid-columnHeaderTitle': {
						fontSize: '15px',
					},
					'& .MuiDataGrid-cellContent': {
						fontSize: '13px',
					},
					'& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
						width: '0.4em',
						height: '0.4em',
					},
					'& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
						background: colors.grey[700],
					},
					'& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
						backgroundColor: colors.blueAccent[500],
					},
					'& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
						background: '#555',
					},
				}}
			>
				<DataGrid
					rows={data}
					columns={columns}
					disableColumnMenu={true}
					disableRowSelectionOnClick={true}
					hideFooter={true}
				/>
			</Box>
		</Box>
	);
};

export default Clients;
