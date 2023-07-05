import React from 'react';
import { TextField, useMediaQuery } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useShowPassword } from '../../hooks/useShowPassword';

const AuthField = ({
	name,
	inputLable,
	values,
	touched,
	errors,
	handleBlur,
	handleChange,
	isPasswordField,
}) => {
	const [showPassword, handleClickShowPassword, handleMouseDownPassword] = useShowPassword();
	const isMobileS = useMediaQuery('(max-width:413px)');

	return (
		<div>
			<InputLabel
				name={name}
				sx={{
					marginBottom: '10px',
				}}
			>
				{inputLable}
			</InputLabel>
			<TextField
				fullWidth
				variant='outlined'
				type={isPasswordField ? (showPassword ? 'password' : 'text') : 'text'}
				label={`Введите ${inputLable.toLowerCase()}`}
				onBlur={handleBlur}
				onChange={handleChange}
				value={values[name]}
				name={name}
				error={!!touched[name] && !!errors[name]}
				helperText={touched[name] && errors[name]}
				sx={{
					marginBottom: '20px',
				}}
				InputProps={{
					endAdornment: isPasswordField && (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								edge='end'
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</div>
	);
};

export default AuthField;
