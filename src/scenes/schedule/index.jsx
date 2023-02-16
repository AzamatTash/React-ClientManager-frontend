import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Box } from '@mui/material';
import Header from '../../components/Header';
// import { tokens } from '../../theme';
import SidebarForEvents from '../../components/SidebarForEvents';

const Schedule = () => {
	// const theme = useTheme();
	// const colors = tokens(theme.palette.mode);
	const [isActive, setIsActive] = useState(false);
	// const [currentEvents, setCurrentEvents] = useState([]);

	const handleDateClick = (selected) => {
		setIsActive(!isActive);
		let title;
		const calendarApi = selected.view.calendar;
		calendarApi.unselect();

		if (title) {
			calendarApi.addEvent({
				id: `${selected.dateStr}-${title}`,
				title,
				start: selected.startStr,
				end: selected.endStr,
				allDay: selected.allDay,
			});
		}
	};

	const handleEventClick = (selected) => {
		if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
			selected.event.remove();
		}
	};
	return (
		<Box m={'0px 20px'} maxHeight={'100vh'}>
			<Header title={'Расписание'}></Header>
			<FullCalendar
				height='75vh'
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
				}}
				locale={ruLocale}
				initialView='dayGridMonth'
				editable={true}
				selectable={true}
				selectMirror={true}
				dayMaxEvents={true}
				select={handleDateClick}
				eventClick={handleEventClick}
				// eventsSet={(events) => setCurrentEvents(events)}
				initialEvents={[]}
			/>
			<SidebarForEvents isActive={isActive} />
		</Box>
	);
};

export default Schedule;
