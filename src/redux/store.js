import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import eventsReducer from './slices/eventsSlice';

export const store = configureStore({
	reducer: {
		event: eventReducer,
		events: eventsReducer,
	},
});
