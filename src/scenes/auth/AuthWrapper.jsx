import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Paper from '@mui/material/Paper';
import AuthBackground from '../../accets/AuthBackground';

const AuthWrapper = ({ children }) => {
	const isNonMobile = useMediaQuery('(min-width:530px)');

	return (
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '20px',
			}}
		>
			<AuthBackground />
			<Paper
				elevation={3}
				sx={{
					width: '100%',
					maxWidth: '500px',
					padding: isNonMobile ? '40px' : '20px',
				}}
			>
				{children}
			</Paper>
		</Box>
	);
};

export default AuthWrapper;
