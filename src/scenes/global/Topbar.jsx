import { Box, IconButton, useTheme } from '@mui/material';
import { ColorModeContext } from '../../theme';
import { useContext } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useProSidebar } from 'react-pro-sidebar';

const Topbar = () => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	const { toggleSidebar, broken } = useProSidebar();

	return (
		<Box display={'flex'} justifyContent={'space-between'} p={1}>
			<Box display={'flex'}>
				{broken && (
					<IconButton type={'button'} sx={{ p: 1 }} onClick={() => toggleSidebar()}>
						<MenuOutlinedIcon />
					</IconButton>
				)}
			</Box>

			<Box display='flex'>
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === 'dark' ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</IconButton>
			</Box>
		</Box>
	);
};

export default Topbar;
