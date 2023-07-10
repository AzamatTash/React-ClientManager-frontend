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
	'getClients/fetchGetClients',
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

export const fetchRemoveClient = createAsyncThunk(
	'removeClient/fetchURemoveClient',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.removeClient(params);
			return response.data;
		} catch (e) {
			if (!e.response) {
				throw e;
			}

			return rejectWithValue(e.response.data);
		}
	}
);

export const fetchUpdateClient = createAsyncThunk(
	'updateClient/fetchUpdateClient',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.updateClient(params);
			return response.data;
		} catch (e) {
			if (!e.response) {
				throw e;
			}

			return rejectWithValue(e.response.data);
		}
	}
);

export const fetchGetClient = createAsyncThunk(
	'getClient/fetchGetClient',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.getClient(params);
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
			})
			.addCase(fetchRemoveClient.pending, (state) => {
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchRemoveClient.fulfilled, (state, action) => {
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchRemoveClient.rejected, (state, action) => {
				state.status = 'error';
				state.errorMessage = action.payload.message;
			})
			.addCase(fetchUpdateClient.pending, (state) => {
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchUpdateClient.fulfilled, (state, action) => {
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchUpdateClient.rejected, (state, action) => {
				state.status = 'error';
				state.errorMessage = action.payload.message;
			})
			.addCase(fetchGetClient.pending, (state) => {
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchGetClient.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchGetClient.rejected, (state, action) => {
				state.status = 'error';
				state.errorMessage = action.payload.message;
			});
	},
});

export default clientSlice.reducer;
