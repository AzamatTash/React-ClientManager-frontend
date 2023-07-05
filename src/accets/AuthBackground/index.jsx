import { Box, useTheme } from '@mui/material';
import imgBack from './background.jpg';

const AuthBackground = () => {
	const theme = useTheme();

	return (
		<Box
			sx={{
				position: 'absolute',
				filter: 'blur(1px)',
				zIndex: -1,
				bottom: 0,
				top: 0,
				backgroundColor: theme.palette.secondary.main,
			}}
		>
			<img className='auth_background-img' src={imgBack} alt='background' />
		</Box>
	);
};

export default AuthBackground;
