import React, { useState } from 'react';
import { TextField } from '@mui/material';

const TimeField = (props) => {
	const [value, setValue] = useState(props.value || '');

	const handleChange = (event) => {
		const { value } = event.target;
		let formattedValue = value.replace(/[^0-9:]/g, '');

		if (formattedValue.length > 5) {
			formattedValue = formattedValue.slice(0, 5);
		}

		if (formattedValue.length > 2 && formattedValue[2] !== ':') {
			formattedValue = `${formattedValue.slice(0, 2)}:${formattedValue.slice(2)}`;
		}

		setValue(formattedValue);
		props.onChange && props.onChange(formattedValue);
	};

	return (
		<TextField
			{...props}
			value={value}
			onChange={handleChange}
			inputProps={{
				maxLength: 5,
				pattern: '[0-9:]*',
				inputMode: 'numeric',
			}}
		/>
	);
};

export default TimeField;
