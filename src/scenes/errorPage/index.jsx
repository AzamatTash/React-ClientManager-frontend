import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
	const navigate = useNavigate();

	return (
		<Box
			m={'0px 20px'}
			sx={{
				display: 'flex',
				height: '80vh',
				maxHeight: '100vh',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography variant='h3' mb='5px'>
					Страница не найдена
				</Typography>
				<Typography variant='h5' mb='20px'>
					Проверьте адрес ссылки
				</Typography>
				<Button
					type='button'
					color='secondary'
					variant='contained'
					onClick={() => navigate('/')}
				>
					На главную
				</Button>
			</Box>
		</Box>
	);
};

export default ErrorPage;
