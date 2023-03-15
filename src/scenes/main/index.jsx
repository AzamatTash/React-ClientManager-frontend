import React from 'react';
import Header from '../../components/Header';
import { Box, useMediaQuery } from '@mui/material';
import LineGraph from '../../components/LineGraph';
import BarGraph from '../../components/BarGraph';

const Main = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');

	return (
		<Box m={'0px 20px'} maxHeight={'100vh'}>
			<Header title={'Главная'}></Header>
			<Box
				sx={{
					width: '95%',
					marginRight: 'auto',
					marginLeft: 'auto',
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: isNonMobile ? '' : 'column',
				}}
			>
				<Box
					sx={{
						width: isNonMobile ? '50%' : '100%',
						height: '80vh',
					}}
				>
					<LineGraph />
				</Box>
				<Box
					sx={{
						width: isNonMobile ? '50%' : '100%',
						height: '80vh',
					}}
				>
					<BarGraph />
				</Box>
			</Box>
		</Box>
	);
};

export default Main;
