import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: '',
	start: '',
	title: '',
	time: '',
	clients: '',
	comment: '',
	price: '',
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
		clearOtherData: (state) => {
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
	clearOtherData,
} = eventSlice.actions;

export default eventSlice.reducer;
