import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: '',
	start: '',
	title: '',
	time: '',
	clients: '',
	comment: '',
	price: '',
	status: false,
};

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setCurrentDay: (state, action) => {
			state.id = action.payload.id;
			state.start = action.payload.start;
		},
		setTitleData: (state, action) => {
			state.title = action.payload.title;
		},
		setTimeData: (state, action) => {
			state.time = action.payload.time;
		},
		setClientsData: (state, action) => {
			state.clients = action.payload.clients;
		},
		setCommentData: (state, action) => {
			state.comment = action.payload.comment;
		},
		setPriceData: (state, action) => {
			state.price = +action.payload.price;
		},
		setStatusData: (state, action) => {
			state.status = action.payload.status;
		},
		setAllData: (state, action) => {
			state.id = action.payload[0].id;
			state.start = action.payload[0].start;
			state.title = action.payload[0].title;
			state.time = action.payload[0].time;
			state.clients = action.payload[0].clients;
			state.comment = action.payload[0].comment;
			state.price = action.payload[0].price;
		},
		clearAllData: (state) => {
			state.id = '';
			state.start = '';
			state.title = '';
			state.time = '';
			state.clients = '';
			state.comment = '';
			state.price = '';
		},
	},
});

export const {
	setCurrentDay,
	setTitleData,
	setTimeData,
	setClientsData,
	setCommentData,
	setPriceData,
	clearAllData,
	setAllData,
	setStatusData,
} = eventSlice.actions;

export default eventSlice.reducer;
