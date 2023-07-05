export const getStyledDataGrid = (colors) => {
	return {
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
	};
};
