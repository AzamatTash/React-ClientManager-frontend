import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../service';

export const fetchLogin = createAsyncThunk(
	'login/fetchLogin',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.login(params);
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
	status: 'error' | 'loading' | 'loaded',
	errorMessage: null,
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLogin.pending, (state) => {
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchLogin.fulfilled, (state) => {
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchLogin.rejected, (state, action) => {
				state.status = 'error';
				state.errorMessage = action.payload.message;
			});
	},
});

export default loginSlice.reducer;
