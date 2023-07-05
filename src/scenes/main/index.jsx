import React from 'react';
import Header from '../../components/Header';
import { Box, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import LineGraph from '../../components/LineGraph';
import BarGraph from '../../components/BarGraph';
import ActiveShapePieChart from '../../components/ActiveShapePieChart';

const data1 = [
	{ name: 'Выполнено', value: 20 },
	{ name: 'Не выполнено', value: 11 },
];

const data2 = [
	{ name: 'Alina', value: 3 },
	{ name: 'Madina', value: 4 },
	{ name: 'Eleanora', value: 2 },
	{ name: 'Svetlana', value: 6 },
	{ name: 'Mariya', value: 5 },
];

const Main = () => {
	const isNonMobile = useMediaQuery('(min-width:934px)');

	return (
		<Box m={'0px 20px'} maxHeight={'100vh'}>
			<Header title={'Главная'}></Header>
			<Box>
				<Box
					sx={{
						width: '95%',
						marginRight: 'auto',
						marginLeft: 'auto',
						marginBottom: '20px',
						display: 'flex',
						justifyContent: isNonMobile ? 'space-between' : 'center',
						alignItems: 'center',
						flexDirection: isNonMobile ? '' : 'column',
					}}
				>
					<Box
						sx={{
							width: isNonMobile ? '50%' : '100%',
							height: isNonMobile ? '40vh' : '270px',
							marginBottom: isNonMobile ? '' : '20px',
						}}
					>
						<Typography variant={isNonMobile ? 'h4' : 'h5'} align={'center'}>
							Статус записей
						</Typography>
						<ActiveShapePieChart data={data1} rate={true} text='записей' />
					</Box>
					<Box
						sx={{
							width: isNonMobile ? '50%' : '100%',
							height: isNonMobile ? '40vh' : '270px',
						}}
					>
						<Typography variant={isNonMobile ? 'h4' : 'h5'} align={'center'}>
							Топ 5 клиентов по посищению
						</Typography>
						<ActiveShapePieChart
							data={data2}
							rate={false}
							text={isNonMobile ? 'посищений' : ''}
						/>
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					width: '95%',
					marginTop: '20px',
					marginRight: 'auto',
					marginLeft: isNonMobile ? 'auto' : '-10px',
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: isNonMobile ? '' : 'column',
				}}
			>
				<Box
					sx={{
						width: isNonMobile ? '50%' : '100%',
						height: isNonMobile ? '40vh' : '270px',
					}}
				>
					<LineGraph />
				</Box>
				<Box
					sx={{
						width: isNonMobile ? '50%' : '100%',
						height: isNonMobile ? '40vh' : '270px',
					}}
				>
					<BarGraph />
				</Box>
			</Box>
		</Box>
	);
};

export default Main;
