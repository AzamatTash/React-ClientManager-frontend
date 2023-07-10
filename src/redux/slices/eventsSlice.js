import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../service';

export const fetchGetEvents = createAsyncThunk(
	'getEvents/fetchGetEvents',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.getEvents(params);
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
	events: [],
	status: 'error' | 'loading' | 'loaded',
	errorMessage: null,
};

export const eventsSlice = createSlice({
	name: 'events',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchGetEvents.pending, (state) => {
				state.events = null;
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchGetEvents.fulfilled, (state, action) => {
				state.events = action.payload;
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchGetEvents.rejected, (state, action) => {
				state.events = null;
				state.status = 'error';
				state.errorMessage = action.payload.message;
			});
	},
});

export default eventsSlice.reducer;
