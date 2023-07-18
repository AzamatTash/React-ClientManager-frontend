import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: 'calc(50% - 20px)',
				left: 'calc(50% - 20px)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				zIndex: 2000,
			}}
		>
			<CircularProgress color='secondary' />
		</Box>
	);
};

export default Loader;
