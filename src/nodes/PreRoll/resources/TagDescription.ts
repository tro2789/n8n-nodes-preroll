import { INodeProperties } from 'n8n-workflow';

export const tagOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['tag'] } },
		options: [
			{ name: 'Create', value: 'create', description: 'Create a tag', action: 'Create a tag' },
			{ name: 'Delete', value: 'delete', description: 'Delete a tag', action: 'Delete a tag' },
			{ name: 'Get Many', value: 'getAll', description: 'Get all tags', action: 'Get all tags' },
			{ name: 'Update', value: 'update', description: 'Update a tag', action: 'Update a tag' },
		],
		default: 'getAll',
	},
];

export const tagFields: INodeProperties[] = [
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['tag'], operation: ['update', 'delete'] } },
		description: 'UUID of the tag',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['tag'], operation: ['create'] } },
		description: 'Tag name',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '#6366f1',
		displayOptions: { show: { resource: ['tag'], operation: ['create'] } },
		description: 'Tag color (hex)',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['tag'], operation: ['update'] } },
		options: [
			{ displayName: 'Color', name: 'color', type: 'color', default: '#6366f1' },
			{ displayName: 'Name', name: 'name', type: 'string', default: '' },
		],
	},
];
