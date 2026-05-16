import { INodeProperties } from 'n8n-workflow';

export const meetingNoteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['meetingNote'] } },
		options: [
			{ name: 'Create', value: 'create', description: 'Create a meeting note', action: 'Create a meeting note' },
			{ name: 'Get Many', value: 'getAll', description: 'Get many meeting notes for a client', action: 'Get many meeting notes' },
		],
		default: 'getAll',
	},
];

export const meetingNoteFields: INodeProperties[] = [
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['meetingNote'] } },
		description: 'UUID of the client',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['meetingNote'], operation: ['create'] } },
		description: 'Note content',
		typeOptions: { rows: 4 },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['meetingNote'], operation: ['create'] } },
		options: [
			{ displayName: 'Meeting Date', name: 'meeting_date', type: 'string', default: '', placeholder: 'YYYY-MM-DD' },
			{ displayName: 'Title', name: 'title', type: 'string', default: '' },
		],
	},
];
