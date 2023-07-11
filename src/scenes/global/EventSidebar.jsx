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
	fetchUpdateEvent,
	fetchRemoveEvent,
} from '../../redux/slices/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import TimeField from '../../components/customFields/TimeField';
import ClientsField from '../../components/customFields/ClientsField';
import { CheckoutSchema } from '../../utils/getCheckoutSchema';
import { tokens } from '../../theme';
import { getDate } from '../../utils/getDate';
import { useEffect } from 'react';
import { fetchGetClients } from '../../redux/slices/clientSlice';

const EventSidebar = ({
	createMode,
	readMode,
	setCreateMode,
	setReadMode,
	handleSaveEvent,
	setIsVisibleAlert,
	setAlertData,
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const dispatch = useDispatch();
	const { event, status } = useSelector((state) => state.event);
	const { data } = useSelector((state) => state.client);

	const handleEditEvent = () => {
		setReadMode(false);
		setCreateMode(true);
	};

	const handleDeleteEvent = async () => {
		const { payload } = await dispatch(fetchRemoveEvent(event.id));
		if (payload.message) {
			setAlertData({
				type: 'success',
				message: payload.message,
			});
			setIsVisibleAlert(true);
		}
		setTimeout(() => {
			setIsVisibleAlert(false);
		}, 2000);
		setReadMode(false);
		setCreateMode(false);
	};

	const handleChangeStatus = (e) => {
		dispatch(
			fetchUpdateEvent({
				...event,
				status: e.target.checked,
			})
		);
	};

	useEffect(() => {
		dispatch(fetchGetClients());
	}, []);

	return (
		<Box
			sx={
				createMode
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
			onClick={() => {
				setCreateMode(false);
			}}
		>
			<Box
				sx={{
					padding: '10px 20px 20px',
					width: '320px',
					position: 'fixed',
					top: 0,
					left: '100%',
					zIndex: 1000,
					height: '100%',
					backgroundColor: colors.primary[400],
					transform: createMode ? 'translateX(-320px)' : 'translateX(0px)',
					transition:
						'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s, opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s',
					'& .MuiFormHelperText-root': { marginRight: '0px', textAlign: 'right' },
					overflow: 'hidden',
					overflowY: 'auto',
				}}
				onClick={(e) => e.stopPropagation()}
			>
				<IconButton onClick={() => setCreateMode(!createMode)}>
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
								<ListItemText
									primary='Название'
									secondary={
										status === 'loading' ? 'загружаем данные...' : event.title
									}
								/>
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
									secondary={
										status === 'loading'
											? 'загружаем данные...'
											: getDate(event.start) + ' ' + event.time
									}
								/>
							</ListItem>
							<Divider variant='inset' component='li' />
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<PermIdentityOutlinedIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary='Клиент'
									secondary={
										status === 'loading' ? 'загружаем данные...' : event.client
									}
								/>
							</ListItem>
							<Divider variant='inset' component='li' />
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<MessageOutlinedIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary='Комметарий'
									secondary={
										status === 'loading' ? 'загружаем данные...' : event.comment
									}
								/>
							</ListItem>
							<Divider variant='inset' component='li' />
							<ListItem>
								<ListItemAvatar>
									<Avatar>
										<CurrencyRubleIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary='Цена'
									secondary={
										status === 'loading' ? 'загружаем данные...' : event.price
									}
								/>
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
									label={
										status === 'loading'
											? 'обнавляем статус...'
											: event.status
											? 'Выполнено'
											: 'Не выполнено'
									}
									checked={event.status}
									onChange={handleChangeStatus}
								/>
							</ListItem>
						</List>
						<Button
							fullWidth
							type='submit'
							color='secondary'
							variant='contained'
							onClick={handleEditEvent}
							sx={{
								marginBottom: '20px',
							}}
						>
							редактировать
						</Button>
						<Button
							fullWidth
							type='submit'
							color='secondary'
							variant='contained'
							onClick={handleDeleteEvent}
						>
							удалить
						</Button>
					</>
				) : (
					<Formik
						enableReinitialize={true}
						onSubmit={handleSaveEvent}
						initialValues={event}
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
									value={event?.title}
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
											{getDate(event.start)}
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
											value={event.time}
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
									name='client'
									value={event.client}
									clients={
										data
											? data.map((item) => ({
													id: item.id,
													name: `${item.firstName} ${item.lastName}`,
											  }))
											: []
									}
									error={!!touched.client && !!errors.client}
									helperText={errors.client}
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
									value={event.comment}
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
										value={event.price}
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
									disabled={status === 'loading'}
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

export default EventSidebar;
