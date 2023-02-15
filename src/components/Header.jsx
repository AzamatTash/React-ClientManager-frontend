import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../theme';

const Header = ({ title }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<div>
			<Box mb='20px'>
				<Typography variant='h2' color={colors.grey[100]} fontWeight='bold'>
					{title}
				</Typography>
			</Box>
		</div>
	);
};

export default Header;
