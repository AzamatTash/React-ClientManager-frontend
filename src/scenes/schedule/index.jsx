import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import EventSidebar from '../global/EventSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetEvents } from '../../redux/slices/eventsSlice';
import {
	fetchCreateEvent,
	setCurrentDay,
	fetchGetEvent,
	fetchUpdateEvent,
	setClearData,
} from '../../redux/slices/eventSlice';
import AlertInfo from '../../components/AlertInfo';

const Schedule = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [createMode, setCreateMode] = useState(false);
	const [readMode, setReadMode] = useState(false);
	const [isVisibleAlert, setIsVisibleAlert] = useState(false);
	const [alertData, setAlertData] = useState({
		type: 'info',
		message: '',
	});
	const dispatch = useDispatch();
	const { event, errorMessage } = useSelector((state) => state.event);
	const { events } = useSelector((state) => state.events);

	const handleDayClick = (selected) => {
		dispatch(setClearData());
		if (!createMode) {
			dispatch(
				setCurrentDay({
					date: selected.startStr,
				})
			);
			setReadMode(false);
			setCreateMode(true);
		} else {
			setCreateMode(false);
		}
	};

	const handleSaveEvent = async () => {
		if (event.id) {
			const { payload } = await dispatch(fetchUpdateEvent(event));
			if (payload.id) {
				setAlertData({
					type: 'success',
					message: 'Событие обнавлено',
				});
				setIsVisibleAlert(true);
				setCreateMode(false);
			} else {
				setAlertData({
					type: 'error',
					message: errorMessage,
				});
				setIsVisibleAlert(true);
			}
			setTimeout(() => {
				setIsVisibleAlert(false);
			}, 2000);
		} else {
			const { payload } = await dispatch(fetchCreateEvent(event));
			if (payload.id) {
				setAlertData({
					type: 'success',
					message: 'Событие создано',
				});
				setIsVisibleAlert(true);
				setCreateMode(false);
			} else {
				setAlertData({
					type: 'error',
					message: errorMessage,
				});
				setIsVisibleAlert(true);
			}
			setTimeout(() => {
				setIsVisibleAlert(false);
			}, 2000);
		}
	};

	const handleClickEvent = async (selected) => {
		const { payload } = await dispatch(fetchGetEvent(selected.event.id));
		if (!payload.id) {
			setAlertData({
				type: 'error',
				message: errorMessage,
			});
			setIsVisibleAlert(true);
		}
		setTimeout(() => {
			setIsVisibleAlert(false);
		}, 2000);
		setCreateMode(true);
		setReadMode(true);
	};

	useEffect(() => {
		dispatch(fetchGetEvents());
	}, [isVisibleAlert]);

	return (
		<>
			<Box
				m={'0px 20px'}
				maxHeight={'100vh'}
				paddingBottom={'20px'}
				sx={{
					'.fc-theme-standard .fc-list-day-cushion': {
						backgroundColor: theme.palette.secondary.main,
					},
					'.fc .fc-button-primary': {
						backgroundColor: theme.palette.secondary.main,
					},
					'.fc .fc-button-primary:not(:disabled).fc-button-active': {
						backgroundColor:
							theme.palette.mode === 'dark'
								? colors.greenAccent[700]
								: colors.blueAccent[300],
					},
					'.fc .fc-button-primary:hover': {
						backgroundColor:
							theme.palette.mode === 'dark'
								? colors.greenAccent[700]
								: colors.blueAccent[300],
					},
					position: 'relative',
				}}
			>
				<AlertInfo
					isVisible={isVisibleAlert}
					type={alertData.type}
					message={alertData.message}
					positionY='-53'
				/>
				<Header title={'Расписание'}></Header>
				<FullCalendar
					height='75vh'
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
					headerToolbar={{
						left: 'prev,next',
						center: 'title',
						right: 'dayGridMonth,listMonth',
					}}
					titleFormat={{ month: 'short' }}
					locale={ruLocale}
					initialView='dayGridMonth'
					editable={true}
					selectable={true}
					selectMirror={true}
					dayMaxEvents={true}
					select={handleDayClick}
					eventClick={handleClickEvent}
					events={events}
				/>
			</Box>
			<EventSidebar
				createMode={createMode}
				readMode={readMode}
				setCreateMode={setCreateMode}
				setReadMode={setReadMode}
				handleSaveEvent={handleSaveEvent}
				setIsVisibleAlert={setIsVisibleAlert}
				setAlertData={setAlertData}
			/>
		</>
	);
};

export default Schedule;
