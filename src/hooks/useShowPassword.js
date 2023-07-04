import { useState } from 'react';

export const useShowPassword = () => {
	const [showPassword, setShowPassword] = useState(true);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return [showPassword, handleClickShowPassword, handleMouseDownPassword];
};
