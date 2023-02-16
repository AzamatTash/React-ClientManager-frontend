import React, { useState } from 'react';
import {
	Box,
	Button,
	FormControlLabel,
	Switch,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import { tokens } from '../theme';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import locale from 'dayjs/locale/ru';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

const SidebarForEvents = ({ isActive }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	//SetTime
	const [timePickerValue, setTimePickerValue] = useState();

	//SetClient
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
				backgroundColor: colors.primary[400],
			},
		},
	};
	const names = [
		'Oliver Hansen',
		'Van Henry',
		'April Tucker',
		'Ralph Hubbard',
		'Omar Alexander',
		'Carlos Abbott',
		'Miriam Wagner',
		'Bradley Wilkerson',
		'Virginia Andrews',
		'Kelly Snyder',
	];
	const [personName, setPersonName] = React.useState([]);
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};

	//SetStatus
	const [status, setStatus] = React.useState(false);
	const handleChangeStatus = () => {
		setStatus(!status);
	};

	return (
		<Box
			p={'20px'}
			sx={{
				width: '320px',
				position: 'fixed',
				top: 0,
				left: '100%',
				zIndex: 1000,
				height: '100%',
				backgroundColor: colors.primary[400],
				transform: isActive ? 'translateX(-320px)' : 'translateX(0px)',
				transition:
					'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s, opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s',
			}}
		>
			<Typography
				variant={'h4'}
				sx={{
					color: theme.palette.primary.main,
					textAlign: 'center',
					marginBottom: '15px',
				}}
			>
				Создание события
			</Typography>
			<TextField
				fullWidth
				label='Добавить название'
				variant='standard'
				sx={{ marginBottom: '20px', '.MuiInputBase-input': { fontSize: '18px' } }}
			/>
			<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
				<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
					<AccessTimeOutlinedIcon sx={{ marginRight: '10px' }} />
					<Typography variant={'h6'}>Четверг, 2 февраля</Typography>
				</Box>
				<Box
					width={'100px'}
					sx={{
						'& .MuiInputBase-input': {
							textAlign: 'center',
							padding: '12px 14px',
						},
					}}
				>
					<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
						<TimePicker
							disableOpenPicker={true}
							value={timePickerValue}
							onChange={(newValue) => setTimePickerValue(newValue)}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</Box>
			</Box>

			<FormControl sx={{ margin: '20px 0', width: '100%' }}>
				<InputLabel id='demo-multiple-name-label'>Клиент</InputLabel>
				<Select
					labelId='demo-multiple-name-label'
					id='demo-multiple-name'
					multiple
					value={personName}
					onChange={handleChange}
					input={<OutlinedInput label='Name' />}
					MenuProps={MenuProps}
					sx={{
						'#demo-multiple-name': {
							fontSize: '16px',
						},
					}}
				>
					{names.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={{ color: theme.palette.secondary.main }}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>

			<TextField
				sx={{
					width: '100%',
					'#outlined-multiline-static': {
						fontSize: '16px',
					},
				}}
				id='outlined-multiline-static'
				label='Комментарий'
				multiline
				rows={4}
			/>

			<FormControl fullWidth sx={{ margin: '20px 0' }}>
				<InputLabel htmlFor='outlined-adornment-amount'>Цена</InputLabel>
				<OutlinedInput
					id='outlined-adornment-amount'
					endAdornment={<CurrencyRubleIcon />}
					label='Amount'
					sx={{ fontSize: '16px' }}
				/>
			</FormControl>

			<Box display={'flex'} justifyContent={'space-between'}>
				<FormControlLabel
					label={status ? 'Выполнено' : 'Не выполнено'}
					control={
						<Switch
							sx={{
								'.MuiSwitch-colorPrimary': {
									color: theme.palette.secondary.main,
								},
							}}
							checked={status}
							onChange={handleChangeStatus}
							name='status'
						/>
					}
				/>

				<Button type='submit' color='secondary' variant='contained'>
					Сохранить
				</Button>
			</Box>
		</Box>
	);
};

export default SidebarForEvents;
