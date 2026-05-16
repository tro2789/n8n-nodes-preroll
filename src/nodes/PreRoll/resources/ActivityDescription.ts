import { INodeProperties } from 'n8n-workflow';

export const activityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['activity'] } },
		options: [
			{ name: 'Get Many', value: 'getAll', description: 'Get recent activity for a show', action: 'Get recent activity' },
		],
		default: 'getAll',
	},
];

export const activityFields: INodeProperties[] = [
	{
		displayName: 'Show ID',
		name: 'showId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['activity'] } },
		description: 'UUID of the show',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		displayOptions: { show: { resource: ['activity'] } },
		description: 'Max number of activity entries to return',
		typeOptions: { minValue: 1, maxValue: 200 },
	},
];
