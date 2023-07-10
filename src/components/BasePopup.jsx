import React from 'react';
import { Box, alpha, useMediaQuery, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import { tokens } from '../theme';

const BasePopup = ({ children, setIsVisible }) => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 1202,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: alpha(colors.primary[100], 0.25),
				padding: '20px',
			}}
			onClick={() => setIsVisible(false)}
		>
			<Paper
				elevation={3}
				sx={{
					width: '100%',
					maxWidth: '800px',
					maxHeight: '90vh',
					overflowY: 'auto',
					padding: isNonMobile ? '40px' : '20px',
					margin: '20px',
					backgroundColor: theme.palette.background.default,
				}}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</Paper>
		</Box>
	);
};

export default BasePopup;
