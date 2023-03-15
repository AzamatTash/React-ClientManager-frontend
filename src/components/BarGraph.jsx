import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { mockBarData } from '../data/mockData';

const BarGraph = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<BarChart
				width={500}
				height={300}
				data={mockBarData}
				margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray='3 3' />
				<XAxis dataKey='month' />
				<YAxis />
				<Tooltip contentStyle={{ color: colors.grey[600] }} />
				<Legend />
				<Bar
					barSize={15}
					name='клиентов'
					dataKey='visits'
					fill={theme.palette.secondary.main}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default BarGraph;
