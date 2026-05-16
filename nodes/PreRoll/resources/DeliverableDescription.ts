import { INodeProperties } from 'n8n-workflow';

export const deliverableOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['deliverable'] } },
		options: [
			{ name: 'Create', value: 'create', description: 'Create a deliverable', action: 'Create a deliverable' },
			{ name: 'Get', value: 'get', description: 'Get a deliverable', action: 'Get a deliverable' },
			{ name: 'Get Many', value: 'getAll', description: 'Get many deliverables', action: 'Get many deliverables' },
			{ name: 'Update', value: 'update', description: 'Update a deliverable', action: 'Update a deliverable' },
		],
		default: 'getAll',
	},
];

export const deliverableFields: INodeProperties[] = [
	// ------ Get / Update ------
	{
		displayName: 'Deliverable ID',
		name: 'deliverableId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['deliverable'], operation: ['get', 'update'] } },
		description: 'UUID of the deliverable',
	},

	// ------ Get Many filters ------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['deliverable'], operation: ['getAll'] } },
		options: [
			{ displayName: 'Episode ID', name: 'episode_id', type: 'string', default: '' },
			{ displayName: 'Show ID', name: 'show_id', type: 'string', default: '' },
			{
				displayName: 'Status', name: 'status', type: 'options', default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Approved', value: 'approved' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Revision Requested', value: 'revision_requested' },
				],
			},
		],
	},

	// ------ Create ------
	{
		displayName: 'Show ID',
		name: 'showId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['deliverable'], operation: ['create'] } },
		description: 'UUID of the show',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['deliverable'], operation: ['create'] } },
		description: 'Deliverable title',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['deliverable'], operation: ['create'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'Episode ID', name: 'episode_id', type: 'string', default: '' },
			{ displayName: 'File URL', name: 'file_url', type: 'string', default: '' },
			{ displayName: 'Producer Notes', name: 'producer_notes', type: 'string', default: '' },
			{
				displayName: 'Type', name: 'type', type: 'options', default: 'other',
				options: [
					{ name: 'Cover Art', value: 'cover_art' },
					{ name: 'Final Cut', value: 'final_cut' },
					{ name: 'Intro', value: 'intro' },
					{ name: 'Other', value: 'other' },
					{ name: 'Outro', value: 'outro' },
					{ name: 'Rough Cut', value: 'rough_cut' },
					{ name: 'Show Notes', value: 'show_notes' },
					{ name: 'Social Clip', value: 'social_clip' },
					{ name: 'Thumbnail', value: 'thumbnail' },
				],
			},
		],
	},

	// ------ Update ------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['deliverable'], operation: ['update'] } },
		options: [
			{ displayName: 'Description', name: 'description', type: 'string', default: '' },
			{ displayName: 'File URL', name: 'file_url', type: 'string', default: '' },
			{ displayName: 'Producer Notes', name: 'producer_notes', type: 'string', default: '' },
			{
				displayName: 'Status', name: 'status', type: 'options', default: 'pending',
				options: [
					{ name: 'Approved', value: 'approved' },
					{ name: 'Pending', value: 'pending' },
					{ name: 'Revision Requested', value: 'revision_requested' },
				],
			},
			{ displayName: 'Title', name: 'title', type: 'string', default: '' },
		],
	},
];
