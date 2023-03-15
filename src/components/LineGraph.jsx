import React from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { mockLineData } from '../data/mockData';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';

const LineGraph = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart
				width={500}
				height={300}
				data={mockLineData}
				margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='month' />
				<YAxis dataKey='amount' tickFormatter={(value) => `${value / 1000}K`} />
				<Tooltip contentStyle={{ color: colors.grey[600] }} />
				<Legend />
				<Line
					type='monotone'
					dataKey='amount'
					stroke={theme.palette.secondary.main}
					name='сумма ₽'
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default LineGraph;
