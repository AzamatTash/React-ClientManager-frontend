import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Index from './scenes/main';
import MySidebar from './scenes/global/MySidebar';
import Clients from './scenes/clients';
import AddNewClient from './scenes/addClient';
import Schedule from './scenes/schedule';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className={'app'}>
					<MySidebar />
					<main className='content'>
						<Topbar />
						<Routes>
							<Route path={'/'} element={<Index />} />
							<Route path={'/schedule'} element={<Schedule />} />
							<Route path={'/clients'} element={<Clients />} />
							<Route path={'/add_client'} element={<AddNewClient />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
