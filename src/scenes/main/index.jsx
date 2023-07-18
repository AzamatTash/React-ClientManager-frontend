import React from 'react';
import Header from '../../components/Header';
import { Box, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import LineGraph from '../../components/LineGraph';
import BarGraph from '../../components/BarGraph';
import ActiveShapePieChart from '../../components/ActiveShapePieChart';
import { useFetching } from '../../hooks/useFetching';
import Api from '../../service';
import { useEffect } from 'react';
import { useTopClient } from '../../hooks/useTopClient';
import { useStatusEvents } from '../../hooks/useStatusEvents';
import { useProfit } from '../../hooks/useProfit';
import Loader from '../../components/Loader';

const Main = () => {
	const isNonMobile = useMediaQuery('(min-width:934px)');
	const clientsRequest = useFetching(async () => {
		return await Api.getClients();
	});
	const eventsRequest = useFetching(async () => {
		return await Api.getEvents();
	});
	const topClientsData = useTopClient(clientsRequest.data);
	const statusEvents = useStatusEvents(eventsRequest.data);
	const profitMoney = useProfit(eventsRequest.data, 'money');
	const profitVisits = useProfit(eventsRequest.data, 'visits');

	useEffect(() => {
		clientsRequest.fetching();
		eventsRequest.fetching();
	}, []);

	return (
		<Box m={'0px 20px'} maxHeight={'100vh'}>
			<Header title={'Главная'}></Header>
			{clientsRequest.isLoading ? (
				<Loader />
			) : (
				<>
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

								<ActiveShapePieChart
									data={statusEvents}
									rate={true}
									text='записей'
								/>
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
									data={topClientsData}
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
							<LineGraph data={profitMoney} />
						</Box>
						<Box
							sx={{
								width: isNonMobile ? '50%' : '100%',
								height: isNonMobile ? '40vh' : '270px',
							}}
						>
							<BarGraph data={profitVisits} />
						</Box>
					</Box>
				</>
			)}
		</Box>
	);
};

export default Main;
