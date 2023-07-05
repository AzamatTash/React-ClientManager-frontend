import {
	Avatar,
	Box,
	Button,
	Divider,
	FormHelperText,
	IconButton,
	List,
	ListItem,
	Typography,
	ListItemAvatar,
	ListItemText,
	TextField,
	useTheme,
	alpha,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import TitleOutlinedIcon from '@mui/icons-material/TitleOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

import { Formik } from 'formik';
import {
	setTitleData,
	setTimeData,
	setCommentData,
	setPriceData,
	setAllData,
	setStatusData,
} from '../../redux/slices/eventSlice';
import { useDispatch, useSelector } from 'react-redux';

import TimeField from '../../components/customFields/TimeField';
import ClientsField from '../../components/customFields/ClientsField';
import { CheckoutSchema } from '../../utils/getCheckoutSchema';
import { tokens } from '../../theme';
import { getDate } from '../../utils/getDate';

const SidebarForEvent = ({
	isActive,
	readMode,
	moreInfo,
	setIsActive,
	setReadMode,
	handleSaveEvent,
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
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

	const dispatch = useDispatch();
	const eventValue = useSelector((state) => state.event);
	const { events } = useSelector((state) => state.events);

	const onClickEdit = (id) => {
		setReadMode(false);
		const curentEvent = events.filter((event) => event.id === id);
		dispatch(setAllData(curentEvent));
	};

	const handleChange = (event) => {
		dispatch(
			setStatusData({
				id: moreInfo.status,
				status: event.target.checked,
			})
		);
	};

	return (
		<Box
			sx={
				isActive
					? {
							display: 'block',
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
							backgroundColor: alpha(colors.primary[100], 0.25),
					  }
					: {}
			}
			onClick={() => setIsActive(false)}
		>
			<Box
				p={'10px 20px'}
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
					'& .MuiFormHelperText-root': { marginRight: '0px', textAlign: 'right' },
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<IconButton onClick={() => setIsActive(!isActive)}>
					<CloseOutlinedIcon />
				</IconButton>

				<Typography
					variant={'h4'}
					sx={{
						color: theme.palette.primary.main,
						textAlign: 'center',
						marginBottom: '15px',
					}}
				>
					{readMode ? 'Информация о событие' : 'Создание события'}
				</Typography>

				{readMode ? (
					<>
						<List
							sx={{
								width: '100%',
								maxWidth: 360,
								'& .MuiListItemText-primary': {
									fontSize: '16px',
								},
								'& .MuiListItemText-secondary': {
									color: theme.palette.secondary.main,
									fontSize: '14px',
								},
							}}
						>
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<TitleOutlinedIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary='Название' secondary={moreInfo.title} />
							</ListItem>
							<Divider variant='inset' component='li' />
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<AccessTimeOutlinedIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary='Дата и время'
									secondary={getDate(moreInfo.start) + ' ' + moreInfo.time}
								/>
							</ListItem>
							<Divider variant='inset' component='li' />
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<PermIdentityOutlinedIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary='Клиент' secondary={moreInfo.clients} />
							</ListItem>
							<Divider variant='inset' component='li' />
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<MessageOutlinedIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary='Комметарий' secondary={moreInfo.comment} />
							</ListItem>
							<Divider variant='inset' component='li' />
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<CurrencyRubleIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary='Цена' secondary={moreInfo.price} />
							</ListItem>
							<Divider variant='inset' component='li' />
							<ListItem>
								<FormControlLabel
									control={
										<Switch
											sx={{
												'& .MuiSwitch-switchBase.Mui-checked': {
													color: theme.palette.secondary.main,
												},
											}}
										/>
									}
									defaultChecked={moreInfo.status}
									label={moreInfo.status ? 'Выполнено' : 'Не выполнено'}
									onChange={handleChange}
								/>
							</ListItem>
						</List>
						<Button
							fullWidth
							type='submit'
							color='secondary'
							variant='contained'
							onClick={() => onClickEdit(moreInfo.id)}
							disabled={moreInfo.status}
						>
							Редактировать
						</Button>
					</>
				) : (
					<Formik
						enableReinitialize={true}
						onSubmit={handleSaveEvent}
						initialValues={eventValue}
						validationSchema={CheckoutSchema.event()}
					>
						{({ errors, touched, handleBlur, handleSubmit }) => (
							<form onSubmit={handleSubmit}>
								{/*Field for title*/}
								<TextField
									fullWidth
									type='text'
									label='Добавить название'
									name='title'
									value={eventValue.title}
									onChange={(e) =>
										dispatch(setTitleData({ title: e.target.value }))
									}
									onBlur={handleBlur}
									error={!!touched.title && !!errors.title}
									helperText={touched.title && errors.title}
									variant='standard'
									sx={{
										marginBottom: '20px',
										'.MuiInputBase-input': { fontSize: '18px' },
									}}
								/>

								{/*Current date and field for time*/}
								<Box
									display={'flex'}
									justifyContent={'space-between'}
									alignItems={'start'}
								>
									<Box
										display={'flex'}
										justifyContent={'space-between'}
										alignItems={'center'}
									>
										<AccessTimeOutlinedIcon sx={{ marginRight: '10px' }} />
										<Typography variant={'h6'}>
											{getDate(eventValue.start)}
										</Typography>
									</Box>
									<Box
										width={'115px'}
										sx={{
											'& .MuiInputBase-input': {
												textAlign: 'center',
											},
										}}
									>
										<TimeField
											label='время'
											name='time'
											type='text'
											value={eventValue.time}
											onBlur={handleBlur}
											onChange={(value) =>
												dispatch(setTimeData({ time: value }))
											}
											error={!!touched.time && !!errors.time}
											helperText={touched.time && errors.time}
										/>
									</Box>
								</Box>

								{/*Customer selection field*/}
								<ClientsField
									name='clients'
									value={eventValue.clients}
									clients={names}
									error={!!errors.clients}
									helperText={errors.clients}
								/>

								{/*Field for comment*/}
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
									value={eventValue.comment}
									onChange={(e) =>
										dispatch(setCommentData({ comment: e.target.value }))
									}
								/>

								{/*Field for price*/}
								<FormControl
									fullWidth
									sx={{ margin: '20px 0' }}
									name='price'
									error={!!touched.price && !!errors.price}
								>
									<InputLabel htmlFor='outlined-adornment-amount'>
										Цена
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-amount'
										endAdornment={<CurrencyRubleIcon />}
										label='price'
										sx={{ fontSize: '16px' }}
										value={eventValue.price}
										onBlur={handleBlur}
										onChange={(e) =>
											dispatch(
												setPriceData({
													price: e.target.value.replace(/[^0-9:]/g, ''),
												})
											)
										}
									/>
									{errors.price && (
										<FormHelperText>{errors.price}</FormHelperText>
									)}
								</FormControl>

								<Button
									fullWidth
									type='submit'
									color='secondary'
									variant='contained'
								>
									Сохранить
								</Button>
							</form>
						)}
					</Formik>
				)}
			</Box>
		</Box>
	);
};

export default SidebarForEvent;
