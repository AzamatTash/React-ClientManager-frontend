import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../service';

export const fetchRegister = createAsyncThunk(
	'register/fetchRegister',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.register(params);
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

const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRegister.pending, (state) => {
				state.data = null;
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				state.data = action.payload;
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchRegister.rejected, (state, action) => {
				state.data = null;
				state.status = 'error';
				state.errorMessage = action.payload.message;
			});
	},
});

export default registerSlice.reducer;
