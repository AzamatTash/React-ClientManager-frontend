import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { setClientData } from '../../redux/slices/eventSlice';
import { useDispatch } from 'react-redux';
import { FormHelperText, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const ClientsField = ({ error, helperText, value, clients, name }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const dispatch = useDispatch();

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
	const handleChange = (event) => {
		const value = event.target.value;
		dispatch(setClientData({ client: value }));
	};

	return (
		<FormControl sx={{ margin: '20px 0', width: '100%' }} error={error} name={name}>
			<InputLabel id='multiple-name-label'>Клиент</InputLabel>
			<Select
				labelId='multiple-name-label'
				id='multiple-name'
				value={value}
				onChange={handleChange}
				input={<OutlinedInput label='Name' />}
				MenuProps={MenuProps}
				sx={{ '#multiple-name': { fontSize: '16px' } }}
			>
				{clients.map((client) => (
					<MenuItem
						key={client.id}
						value={client.name}
						style={{ color: theme.palette.secondary.main }}
					>
						{client.name}
					</MenuItem>
				))}
			</Select>
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</FormControl>
	);
};

export default ClientsField;
