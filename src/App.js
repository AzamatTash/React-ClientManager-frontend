import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Main from './scenes/main';
import MySidebar from './scenes/global/MySidebar';
import Clients from './scenes/clients';
import AddNewClient from './scenes/addClient';
import Schedule from './scenes/schedule';
import Login from './scenes/login';
import Register from './scenes/register/Register';
import { useState } from 'react';

function App() {
	const [theme, colorMode] = useMode();
	const [isAuth, setIsAuth] = useState(false);

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
