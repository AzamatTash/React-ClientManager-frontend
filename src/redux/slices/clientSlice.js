import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../service';

export const fetchCreateClient = createAsyncThunk(
	'createClient/fetchCreateClient',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.createClient(params);
			return response.data;
		} catch (e) {
			if (!e.response) {
				throw e;
			}

			return rejectWithValue(e.response.data);
		}
	}
);

export const fetchGetClients = createAsyncThunk(
	'getClient/fetchGetClients',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.getClients();
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
	data: null,
	status: 'error' | 'loading' | 'loaded',
	errorMessage: null,
};

const clientSlice = createSlice({
	name: 'client',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCreateClient.pending, (state) => {
				state.data = null;
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchCreateClient.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchCreateClient.rejected, (state, action) => {
				state.data = null;
				state.status = 'error';
				state.errorMessage = action.payload.message;
			})
			.addCase(fetchGetClients.pending, (state) => {
				state.data = null;
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchGetClients.fulfilled, (state, action) => {
				state.data = action.payload.reverse();
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchGetClients.rejected, (state, action) => {
				state.data = null;
				state.status = 'error';
				state.errorMessage = action.payload.message;
			});
	},
});

export default clientSlice.reducer;
