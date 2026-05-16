import { INodeProperties } from 'n8n-workflow';

export const clientOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['client'] } },
		options: [
			{ name: 'Create', value: 'create', description: 'Create a client', action: 'Create a client' },
			{ name: 'Delete', value: 'delete', description: 'Delete a client', action: 'Delete a client' },
			{ name: 'Get', value: 'get', description: 'Get a client', action: 'Get a client' },
			{ name: 'Get Many', value: 'getAll', description: 'Get many clients', action: 'Get many clients' },
			{ name: 'Update', value: 'update', description: 'Update a client', action: 'Update a client' },
		],
		default: 'getAll',
	},
];

export const clientFields: INodeProperties[] = [
	// ------ Get / Update / Delete ------
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['client'], operation: ['get', 'update', 'delete'] } },
		description: 'UUID of the client',
	},

	// ------ Create ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['client'], operation: ['create'] } },
		description: 'Client name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['client'], operation: ['create'] } },
		options: [
			{ displayName: 'Company', name: 'company', type: 'string', default: '' },
			{ displayName: 'Email', name: 'email', type: 'string', default: '', placeholder: 'name@example.com' },
			{ displayName: 'Notes', name: 'notes', type: 'string', default: '' },
			{ displayName: 'Phone', name: 'phone', type: 'string', default: '' },
		],
	},

	// ------ Update ------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['client'], operation: ['update'] } },
		options: [
			{ displayName: 'Company', name: 'company', type: 'string', default: '' },
			{ displayName: 'Email', name: 'email', type: 'string',
																																										placeholder: 'name@email.com', default: '' },
			{ displayName: 'Name', name: 'name', type: 'string', default: '' },
			{ displayName: 'Notes', name: 'notes', type: 'string', default: '' },
			{ displayName: 'Phone', name: 'phone', type: 'string', default: '' },
		],
	},
];
