import { CompressOutlined } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	events: [],
};

export const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {
		setEvents: (state, action) => {
			state.events = [...state.events, action.payload];
		},
	},
});

export const { setEvents } = eventsSlice.actions;

export default eventsSlice.reducer;
