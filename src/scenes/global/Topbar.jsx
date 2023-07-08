import { useState } from 'react';
import { Box, IconButton, useTheme, Button } from '@mui/material';
import { ColorModeContext } from '../../theme';
import { useContext } from 'react';
import { useProSidebar } from 'react-pro-sidebar';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authMeSlice';
import BasePopup from '../../components/BasePopup';

const Topbar = () => {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	const [isVisiblePopup, setIsVisiblePopup] = useState(false);
	const { toggleSidebar, broken } = useProSidebar();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
		setIsVisiblePopup(false);
	};

	return (
		<>
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
					<IconButton onClick={() => setIsVisiblePopup(true)}>
						<LogoutOutlinedIcon />
					</IconButton>
				</Box>
			</Box>
			{isVisiblePopup && (
				<BasePopup setIsVisible={setIsVisiblePopup}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: ' center',
						}}
					>
						<Typography variant='h4' mb='20px' textAlign='center'>
							Вы точно хотите выйти?
						</Typography>
						<Button
							onClick={handleLogout}
							type='button'
							color='secondary'
							variant='contained'
						>
							Выйти
						</Button>
					</Box>
				</BasePopup>
			)}
		</>
	);
};

export default Topbar;
