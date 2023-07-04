import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

import Header from '../../components/Header';
import SidebarForEvents from '../global/SidebarForEvents';

import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from '../../redux/slices/eventsSlice';
import { clearAllData, setCurrentDay } from '../../redux/slices/eventSlice';

const Schedule = () => {
	const [isActive, setIsActive] = useState(false);
	const [readMode, setReadMode] = useState(false);
	const [moreInfo, setMoreInfo] = useState(null);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const dispatch = useDispatch();
	const event = useSelector((state) => state.event);
	const { events } = useSelector((state) => state.events);

	const handleDayClick = (selected) => {
		if (!isActive) {
			dispatch(
				setCurrentDay({
					id: new Date().getTime(),
					start: selected.startStr,
				})
			);
			setReadMode(false);
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	};

	const handleSaveEvent = () => {
		dispatch(setEvents(event));
		setIsActive(false);
		dispatch(clearAllData());
	};

	const handleEventClick = (selected) => {
		setReadMode(true);
		setIsActive(true);
		const findId = selected.event.id;
		events.find((item) => {
			if (+findId === item.id) {
				setMoreInfo(item);
			}
		});
	};

	return (
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
			}}
		>
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
				eventClick={handleEventClick}
				events={events}
			/>
			<SidebarForEvents
				isActive={isActive}
				readMode={readMode}
				moreInfo={moreInfo}
				setIsActive={setIsActive}
				setReadMode={setReadMode}
				handleSaveEvent={handleSaveEvent}
			/>
		</Box>
	);
};

export default Schedule;
