import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../service';

export const fetchAuthMe = createAsyncThunk(
	'authMe/fetchAuthMe',
	async (params, { rejectWithValue }) => {
		try {
			const response = await Api.authMe();
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
	isAuth: window.localStorage.getItem('token'),
	status: 'error' | 'loading' | 'loaded',
	errorMessage: null,
};

const authMeSlice = createSlice({
	name: 'authMe',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
			state.isAuth = false;
			window.localStorage.removeItem('token');
		},
		setIsAuth: (state) => {
			state.isAuth = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthMe.pending, (state) => {
				state.data = null;
				state.status = 'loading';
				state.errorMessage = null;
			})
			.addCase(fetchAuthMe.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isAuth = true;
				state.status = 'loaded';
				state.errorMessage = null;
			})
			.addCase(fetchAuthMe.rejected, (state, action) => {
				state.data = null;
				state.status = 'error';
				state.errorMessage = action.payload.message;
			});
	},
});

export const { logout, setIsAuth } = authMeSlice.actions;
export default authMeSlice.reducer;
