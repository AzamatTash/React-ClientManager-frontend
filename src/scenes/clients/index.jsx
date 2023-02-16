import React, { useState } from 'react';
import { Box, IconButton, InputBase, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { tokens } from '../../theme';
import Header from '../../components/Header';
import { mockDataClients } from '../../data/mockData';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const Clients = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const [data, setData] = useState([...mockDataClients]);

	const handleDelete = (id) => {
		setData((prevData) => prevData.filter((row) => row.id !== id));
	};

	const columns = [
		{ field: 'id', headerName: 'ID', minWidth: 30, maxWidth: 40 },
		{
			field: 'name',
			headerName: 'ФИО',
			flex: 1,
		},
		{
			field: 'instagram',
			headerName: 'Instagram',
			flex: 1,
		},
		{
			field: 'phone',
			headerName: 'Телефон',
			flex: 1,
		},
		{
			field: 'visits',
			headerName: 'Посищений',
			flex: 1,
			minWidth: 100,
			maxWidth: 100,
		},
		{
			field: 'delete',
			headerName: '',
			sortable: false,
			width: 50,
			renderCell: (params) => (
				<IconButton onClick={() => handleDelete(params.row.id)}>
					<DeleteIcon />
				</IconButton>
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

			<Box
				m='20px 0 0 0'
				height='75vh'
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
				}}
			>
				<DataGrid rows={data} columns={columns} pageSize={10} />
			</Box>
		</Box>
	);
};

export default Clients;
