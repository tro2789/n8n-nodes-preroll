import { INodeProperties } from 'n8n-workflow';

export const pipelineStageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['pipelineStage'] } },
		options: [
			{ name: 'Get Many', value: 'getAll', description: 'Get all pipeline stages for a show', action: 'Get all pipeline stages' },
		],
		default: 'getAll',
	},
];

export const pipelineStageFields: INodeProperties[] = [
	{
		displayName: 'Show ID',
		name: 'showId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['pipelineStage'] } },
		description: 'UUID of the show',
	},
];
