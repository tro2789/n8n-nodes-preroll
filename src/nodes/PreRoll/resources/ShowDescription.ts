import { INodeProperties } from 'n8n-workflow';

export const showOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['show'] } },
		options: [
			{ name: 'Create', value: 'create', description: 'Create a show', action: 'Create a show' },
			{ name: 'Delete', value: 'delete', description: 'Delete a show', action: 'Delete a show' },
			{ name: 'Get', value: 'get', description: 'Get a show', action: 'Get a show' },
			{ name: 'Get Many', value: 'getAll', description: 'Get all shows', action: 'Get all shows' },
			{ name: 'Update', value: 'update', description: 'Update a show', action: 'Update a show' },
		],
		default: 'getAll',
	},
];

export const showFields: INodeProperties[] = [
	// ------ Get / Update / Delete ------
	{
		displayName: 'Show ID',
		name: 'showId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['show'], operation: ['get', 'update', 'delete'] } },
		description: 'UUID of the show',
	},

	// ------ Get Many — optional filter ------
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: ['show'], operation: ['getAll'] } },
		description: 'Filter shows by client UUID',
	},

	// ------ Create ------
	{
		displayName: 'Client ID',
		name: 'clientId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['show'], operation: ['create'] } },
		description: 'UUID of the client this show belongs to',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['show'], operation: ['create'] } },
		description: 'Show name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['show'], operation: ['create'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{
				displayName: 'Format', name: 'format', type: 'options', default: 'interview',
				options: [
					{ name: 'Interview', value: 'interview' },
					{ name: 'Narrative', value: 'narrative' },
					{ name: 'Other', value: 'other' },
					{ name: 'Panel', value: 'panel' },
					{ name: 'Solo', value: 'solo' },
				],
			},
			{ displayName: 'Schedule', name: 'schedule', type: 'string', default: '', placeholder: 'Weekly on Tuesdays' },
		],
	},

	// ------ Update ------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['show'], operation: ['update'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{
				displayName: 'Format', name: 'format', type: 'options', default: 'interview',
				options: [
					{ name: 'Interview', value: 'interview' },
					{ name: 'Narrative', value: 'narrative' },
					{ name: 'Other', value: 'other' },
					{ name: 'Panel', value: 'panel' },
					{ name: 'Solo', value: 'solo' },
				],
			},
			{ displayName: 'Name', name: 'name', type: 'string', default: '' },
			{ displayName: 'Schedule', name: 'schedule', type: 'string', default: '' },
			{
				displayName: 'AI Auto Generate', name: 'ai_auto_generate', type: 'multiOptions', default: [],
				options: [
					{ name: 'Description', value: 'description' },
					{ name: 'Show Notes', value: 'show_notes' },
					{ name: 'Social — Instagram', value: 'social_instagram' },
					{ name: 'Social — LinkedIn', value: 'social_linkedin' },
					{ name: 'Social — Twitter', value: 'social_twitter' },
					{ name: 'Titles', value: 'titles' },
				],
			},
			{ displayName: 'AI Auto Transcribe', name: 'ai_auto_transcribe', type: 'boolean', default: false },
			{
				displayName: 'AI Length', name: 'ai_length', type: 'options', default: 'standard',
				options: [
					{ name: 'Brief', value: 'brief' },
					{ name: 'Detailed', value: 'detailed' },
					{ name: 'Standard', value: 'standard' },
				],
			},
			{
				displayName: 'AI Tone', name: 'ai_tone', type: 'options', default: 'professional',
				options: [
					{ name: 'Casual', value: 'casual' },
					{ name: 'Energetic', value: 'energetic' },
					{ name: 'Professional', value: 'professional' },
				],
			},
		],
	},
];
