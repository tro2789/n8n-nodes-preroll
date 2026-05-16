import { INodeProperties } from 'n8n-workflow';

export const dashboardOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['dashboard'] } },
		options: [
			{ name: 'Get Overview', value: 'getOverview', description: 'Get dashboard overview with stats, deadlines, and activity', action: 'Get dashboard overview' },
		],
		default: 'getOverview',
	},
];

export const dashboardFields: INodeProperties[] = [];
