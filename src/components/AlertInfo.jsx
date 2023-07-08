import React from 'react';
import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';

const AlertInfo = ({ isVisible, type, message, positionY }) => {
	return (
		<Box
			sx={{
				position: 'absolute',
				minWidth: '88%',
				top: '20px',
				left: '50%',
				transform: isVisible ? `translate(-50%, ${positionY}px)` : 'translate(-50%, -85px)',
				zIndex: 1100,
				transition:
					'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s, opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s',
			}}
		>
			<Alert severity={type}>{message}</Alert>
		</Box>
	);
};

export default AlertInfo;
