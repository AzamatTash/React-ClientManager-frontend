import React, { useState } from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme, useMediaQuery } from '@mui/material';
import RenderActiveShape from './RenderActiveShape';

const ActiveShapePieChart = ({ data, rate, text }) => {
	const isMobileM = useMediaQuery('(max-width:376px)');
	const theme = useTheme();
	const [activeIndex, setActiveIndex] = useState(0);

	const onPieEnter = (_, index) => {
		setActiveIndex(index);
	};

	return (
		<ResponsiveContainer width='100%' height='100%'>
			<PieChart width={400} height={400}>
				<Pie
					activeIndex={activeIndex}
					activeShape={
						<RenderActiveShape
							theme={theme}
							rate={rate}
							text={text}
							isMobileM={isMobileM}
						/>
					}
					data={data}
					cx='50%'
					cy='50%'
					innerRadius={70}
					outerRadius={90}
					fill={theme.palette.secondary.main}
					dataKey='value'
					onMouseEnter={onPieEnter}
				/>
				{isMobileM && <Tooltip />}
			</PieChart>
		</ResponsiveContainer>
	);
};

export default ActiveShapePieChart;
