import React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const AuthHeader = ({ title, linkText, isMobileS, theme, linkTo }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: isMobileS ? 'column' : '',
				justifyContent: 'space-between',
				alignItems: 'center',
				marginBottom: isMobileS ? '5px' : '30px',
			}}
		>
			<Typography variant='h2' marginBottom={isMobileS ? '5px' : ''}>
				{title}
			</Typography>
			<Link to={linkTo}>
				<Typography style={{ color: theme.palette.secondary.main }}>{linkText}</Typography>
			</Link>
		</Box>
	);
};

export default AuthHeader;
