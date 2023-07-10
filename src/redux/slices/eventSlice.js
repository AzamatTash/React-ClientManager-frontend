import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../service';

export const fetchCreateEvent = createAsyncThunk(
	'createEvent/fetchCreateEvent',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.createEvent(params);
			return response.data;
		} catch (e) {
			if (!e.response) {
				throw e;
			}

			return rejectWithValue(e.response.data);
		}
	}
);

export const fetchGetEvent = createAsyncThunk(
	'getEvent/fetchGetEvent',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.getEvent(params);
			return response.data;
		} catch (e) {
			if (!e.response) {
				throw e;
			}

			return rejectWithValue(e.response.data);
		}
	}
);

export const fetchUpdateEvent = createAsyncThunk(
	'updateEvent/fetchUpdateEvent',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.updateEvent(params);
			return response.data;
		} catch (e) {
			if (!e.response) {
				throw e;
			}

			return rejectWithValue(e.response.data);
		}
	}
);

export const fetchRemoveEvent = createAsyncThunk(
	'removeEvent/fetchURemoveEvent',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.removeEvent(params);
			return response.data;
		} catch (e) {
			if (!e.response) {
				throw e;
			}

			return rejectWithValue(e.response.data);
		}
	}
);

const initialState = {
	event: {
		start: '',
		title: '',
		time: '',
		client: '',
		comment: '',
		price: '',
		status: false,
	},
	status: 'error' | 'loading' | 'loaded',
	errorMessage: null,
};

export const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setCurrentDay: (state, action) => {
			state.event.start = action.payload.date;
		},
		setTitleData: (state, action) => {
			state.event.title = action.payload.title;
		},
		setTimeData: (state, action) => {
			state.event.time = action.payload.time;
		},
		setClientData: (state, action) => {
			state.event.client = action.payload.client;
		},
		setCommentData: (state, action) => {
			state.event.comment = action.payload.comment;
		},
		setPriceData: (state, action) => {
			state.event.price = +action.payload.price;
		},
		setClearData: (state) => {
			state.event = {
				title: '',
				time: '',
				client: '',
				comment: '',
				price: '',
				status: false,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCreateEvent.pending, (state) => {
				state.event = {
					title: '',
					time: '',
					client: '',
					comment: '',
					price: '',
					status: false,
				};
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchCreateEvent.fulfilled, (state) => {
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchCreateEvent.rejected, (state, action) => {
				state.event = {
					title: '',
					time: '',
					client: '',
					comment: '',
					price: '',
					status: false,
				};
				state.status = 'error';
				state.errorMessage = action.payload.message;
			})
			.addCase(fetchGetEvent.pending, (state) => {
				state.event = {};
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchGetEvent.fulfilled, (state, action) => {
				state.event = action.payload;
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchGetEvent.rejected, (state, action) => {
				state.event = {};
				state.status = 'error';
				state.errorMessage = action.payload.message;
			})
			.addCase(fetchUpdateEvent.pending, (state) => {
				state.event = {};
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchUpdateEvent.fulfilled, (state, action) => {
				state.event = action.payload;
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchUpdateEvent.rejected, (state, action) => {
				state.event = {};
				state.status = 'error';
				state.errorMessage = action.payload.message;
			})
			.addCase(fetchRemoveEvent.pending, (state) => {
				state.event = {};
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchRemoveEvent.fulfilled, (state) => {
				state.event = {};
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchRemoveEvent.rejected, (state, action) => {
				state.event = {};
				state.status = 'error';
				state.errorMessage = action.payload.message;
			});
	},
});

export const {
	setCurrentDay,
	setTitleData,
	setTimeData,
	setClientData,
	setCommentData,
	setPriceData,
	setClearData,
} = eventSlice.actions;

export default eventSlice.reducer;
