import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Main from './scenes/Main';
import MySidebar from './scenes/global/MySidebar';

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
							<Route path={'/'} element={<Main />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
