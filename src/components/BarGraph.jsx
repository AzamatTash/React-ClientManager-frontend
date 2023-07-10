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

const BarGraph = ({ data }) => {
	const initialData = [
		{
			month: 'янв',
			amount: 0,
		},
		{
			month: 'февр',
			amount: 0,
		},
		{
			month: 'март',
			amount: 0,
		},
		{
			month: 'апр',
			amount: 0,
		},
		{
			month: 'май',
			amount: 0,
		},
		{
			month: 'июнь',
			amount: 0,
		},
		{
			month: 'июль',
			amount: 0,
		},
		{
			month: 'авг',
			amount: 0,
		},
		{
			month: 'сент',
			amount: 0,
		},
		{
			month: 'окт',
			amount: 0,
		},
		{
			month: 'нояб',
			amount: 0,
		},
		{
			month: 'дек',
			amount: 0,
		},
	];

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<BarChart
				width={500}
				height={300}
				data={data}
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
					dataKey='amount'
					fill={theme.palette.secondary.main}
				/>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default BarGraph;
