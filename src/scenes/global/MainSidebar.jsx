import { useState } from 'react';
import { Menu, Sidebar, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { tokens } from '../../theme';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Item = ({ title, to, icon, selected, setSelected, toggleSidebar }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const handleItem = () => {
		toggleSidebar();
		setSelected(title);
	};

	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={handleItem}
			icon={icon}
			component={<Link to={to} />}
		>
			<Typography>{title}</Typography>
		</MenuItem>
	);
};

const MainSidebar = ({ data }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
	const { pathname } = useLocation();
	const pathList = {
		'/': 'Главная',
		'/schedule': 'Расписание',
		'/clients': 'Клиенты',
		'/add_clients': 'Добавление',
	};
	const [selected, setSelected] = useState(pathList[pathname]);

	return (
		<Box
			sx={{
				position: 'sticky',
				display: 'flex',
				height: '100vh',
				top: 0,
				bottom: 0,
				zIndex: 1000,
				'& .ps-sidebar-root': {
					border: 'none',
				},
				'& .ps-menu-button:hover': {
					color: `${
						theme.palette.mode === 'dark'
							? colors.blueAccent[500]
							: colors.greenAccent[500]
					} !important`,
					backgroundColor: 'transparent !important',
				},
				'& .ps-active': {
					color: `${theme.palette.secondary.main} !important`,
					backgroundColor: 'transparent !important',
				},
			}}
		>
			<Sidebar
				backgroundColor={colors.primary[400]}
				transitionDuration={150}
				customBreakPoint='1215px'
			>
				<Menu iconshape='square'>
					<Box p={'10px 20px'} textAlign={'right'}>
						{collapsed ? (
							<IconButton
								onClick={() => collapseSidebar()}
								sx={{ marginRight: '10px' }}
							>
								<MenuOutlinedIcon />
							</IconButton>
						) : undefined}
						{!collapsed && (
							<IconButton
								onClick={broken ? () => toggleSidebar() : () => collapseSidebar()}
							>
								<CloseOutlinedIcon />
							</IconButton>
						)}
					</Box>
					{!collapsed && (
						<Box mb='25px'>
							<Box
								display='flex'
								justifyContent='center'
								alignItems='center'
								sx={{
									'& .avatar-image': {
										objectFit: 'cover',
									},
								}}
							>
								{/* <img
									className='avatar-image'
									alt='profile user'
									width='50px'
									height='50px'
									src={
									}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								/> */}
								<AccountCircleOutlinedIcon
									color='secondary'
									sx={{ fontSize: 80 }}
								/>
							</Box>
							<Box textAlign='center'>
								<Typography
									variant='h3'
									color={colors.grey[100]}
									fontWeight='bold'
									sx={{ m: '20px 0 0 0' }}
								>
									{data ? `${data?.firstName} ${data?.lastName}` : ''}
								</Typography>
								<Typography variant='h6' color={theme.palette.secondary.main}>
									Администратор
								</Typography>
							</Box>
						</Box>
					)}
					<Box paddingLeft={collapsed ? undefined : '10%'}>
						<Item
							title='Главная'
							to='/'
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
						<Item
							title='Расписание'
							to='/schedule'
							icon={<CalendarMonthOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
						<Item
							title='Клиенты'
							to='/clients'
							icon={<PeopleAltIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
						<Item
							title='Добавление'
							to='/add_client'
							icon={<PersonAddAltIcon />}
							selected={selected}
							setSelected={setSelected}
							toggleSidebar={toggleSidebar}
						/>
					</Box>
				</Menu>
			</Sidebar>
		</Box>
	);
};

export default MainSidebar;
