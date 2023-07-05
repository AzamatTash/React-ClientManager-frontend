import { useState } from 'react';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Main from './scenes/Main';
import MySidebar from './scenes/global/MySidebar';
import Clients from './scenes/Clients';
import AddNewClient from './scenes/AddClient';
import Schedule from './scenes/Schedule';
import Login from './scenes/auth/Login';
import Register from './scenes/auth/Register';

function App() {
	const [theme, colorMode] = useMode();
	const [isAuth, setIsAuth] = useState(true);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className={'app'}>
					{isAuth ? (
						<>
							<MySidebar />
							<main className='content'>
								<Topbar />
								<Routes>
									<Route path={'/'} element={<Main />} />
									<Route path={'/schedule'} element={<Schedule />} />
									<Route path={'/clients'} element={<Clients />} />
									<Route path={'/add_client'} element={<AddNewClient />} />
									<Route path='*' element={<Navigate to='/' />} />
								</Routes>
							</main>
						</>
					) : (
						<>
							<main className='content'>
								<Routes>
									<Route
										path={'/login'}
										element={<Login setIsAuth={setIsAuth} />}
									/>
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
