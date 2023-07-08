import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import eventsReducer from './slices/eventsSlice';
import registerReducer from './slices/registerSlice';
import loginReducer from './slices/loginSlice';
import authMeReducer from './slices/authMeSlice';
import clientReducer from './slices/clientSlice';

export const store = configureStore({
	reducer: {
		event: eventReducer,
		events: eventsReducer,
		register: registerReducer,
		login: loginReducer,
		authMe: authMeReducer,
		client: clientReducer,
	},
});
