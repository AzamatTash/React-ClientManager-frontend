import { Box } from '@mui/material';
import imgBack from './background.jpg';

const AuthBackground = () => {
	return (
		<Box
			sx={{
				position: 'absolute',
				filter: 'blur(5px)',
				zIndex: -1,
				bottom: 0,
			}}
		>
			<img className='auth_background-img' src={imgBack} alt='background' />
		</Box>
	);
};

export default AuthBackground;
