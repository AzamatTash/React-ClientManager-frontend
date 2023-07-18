import { useEffect } from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe } from './redux/slices/authMeSlice';
import Topbar from './scenes/global/Topbar';
import Main from './scenes/main';
import MainSidebar from './scenes/global/MainSidebar';
import Clients from './scenes/clients';
import AddNewClient from './scenes/addClient';
import Schedule from './scenes/schedule';
import Login from './scenes/auth/Login';
import Register from './scenes/auth/Register';
import ErrorPage from './scenes/errorPage';
import Loader from './components/Loader';

function App() {
	const [theme, colorMode] = useMode();
	const dispatch = useDispatch();
	const { status, isAuth } = useSelector((state) => state.authMe);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(fetchAuthMe());
		}
	}, []);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className={'app'}>
					{status === 'loading' ? (
						<main className='content'>
							<Loader />
						</main>
					) : isAuth ? (
						<>
							<MainSidebar />
							<main className='content'>
								<Topbar />
								<Routes>
									<Route index element={<Main />} />
									<Route path={'/'} element={<Main />} />
									<Route path={'/schedule'} element={<Schedule />} />
									<Route path={'/clients'} element={<Clients />} />
									<Route path={'/add_client'} element={<AddNewClient />} />
									<Route path='*' element={<ErrorPage />} />
								</Routes>
							</main>
						</>
					) : (
						<>
							<main className='content'>
								<Routes>
									<Route path={'/login'} element={<Login />} />
									<Route path={'/register'} element={<Register />} />
									<Route path='*' element={<Navigate to='/login' />} />
								</Routes>
							</main>
						</>
					)}
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
