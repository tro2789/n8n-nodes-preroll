import { INodeProperties } from 'n8n-workflow';

export const episodeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['episode'] } },
		options: [
			{ name: 'Create', value: 'create', description: 'Create an episode', action: 'Create an episode' },
			{ name: 'Delete', value: 'delete', description: 'Delete an episode', action: 'Delete an episode' },
			{ name: 'Get', value: 'get', description: 'Get an episode', action: 'Get an episode' },
			{ name: 'Get Many', value: 'getAll', description: 'Get many episodes', action: 'Get many episodes' },
			{ name: 'Update', value: 'update', description: 'Update an episode', action: 'Update an episode' },
		],
		default: 'getAll',
	},
];

export const episodeFields: INodeProperties[] = [
	// ------ Show ID (needed for all episode ops) ------
	{
		displayName: 'Show ID',
		name: 'showId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['episode'], operation: ['get', 'create', 'update', 'delete'] } },
		description: 'UUID of the show',
	},

	// ------ Episode ID (get / update / delete) ------
	{
		displayName: 'Episode ID',
		name: 'episodeId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['episode'], operation: ['get', 'update', 'delete'] } },
		description: 'UUID of the episode',
	},

	// ------ Get Many filters ------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['episode'], operation: ['getAll'] } },
		options: [
			{ displayName: 'Date From', name: 'from', type: 'string', default: '', placeholder: 'YYYY-MM-DD' },
			{ displayName: 'Date To', name: 'to', type: 'string', default: '', placeholder: 'YYYY-MM-DD' },
			{ displayName: 'Show ID', name: 'show_id', type: 'string', default: '' },
			{ displayName: 'Stage ID', name: 'stage_id', type: 'string', default: '' },
			{
				displayName: 'Status', name: 'status', type: 'options', default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Approved', value: 'approved' },
					{ name: 'Editing', value: 'editing' },
					{ name: 'Planning', value: 'planning' },
					{ name: 'Published', value: 'published' },
					{ name: 'Recording', value: 'recording' },
					{ name: 'Review', value: 'review' },
				],
			},
			{ displayName: 'Upcoming Only', name: 'upcoming', type: 'boolean', default: false },
		],
	},

	// ------ Create ------
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['episode'], operation: ['create'] } },
		description: 'Episode title',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['episode'], operation: ['create'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'Episode Number', name: 'episode_number', type: 'number', default: 0 },
			{ displayName: 'Notes', name: 'notes', type: 'string', default: '' },
			{ displayName: 'Scheduled Publish Date', name: 'scheduled_publish_date', type: 'string', default: '', placeholder: 'YYYY-MM-DD' },
			{ displayName: 'Stage ID', name: 'stage_id', type: 'string', default: '' },
		],
	},

	// ------ Update ------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['episode'], operation: ['update'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'Episode Number', name: 'episode_number', type: 'number', default: 0 },
			{ displayName: 'Notes', name: 'notes', type: 'string', default: '' },
			{ displayName: 'Scheduled Publish Date', name: 'scheduled_publish_date', type: 'string', default: '' },
			{ displayName: 'Stage ID', name: 'stage_id', type: 'string', default: '', description: 'Move episode to this pipeline stage' },
			{
				displayName: 'Status', name: 'status', type: 'options', default: 'approved',
				options: [
					{ name: 'Approved', value: 'approved' },
					{ name: 'Editing', value: 'editing' },
					{ name: 'Planning', value: 'planning' },
					{ name: 'Published', value: 'published' },
					{ name: 'Recording', value: 'recording' },
					{ name: 'Review', value: 'review' },
				],
			},
			{ displayName: 'Title', name: 'title', type: 'string', default: '' },
		],
	},
];
