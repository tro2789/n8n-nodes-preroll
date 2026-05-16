import { INodeProperties } from 'n8n-workflow';

export const aiOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['ai'] } },
		options: [
			{ name: 'Generate Content', value: 'generate', description: 'Generate AI content from a transcript', action: 'Generate AI content' },
			{ name: 'Get Credits', value: 'getCredits', description: 'Get AI credit balance', action: 'Get AI credits' },
			{ name: 'Get Transcription', value: 'getTranscription', description: 'Get transcription for an episode', action: 'Get transcription' },
			{ name: 'Run Pipeline', value: 'runPipeline', description: 'Run full AI pipeline (transcribe + generate)', action: 'Run AI pipeline' },
			{ name: 'Transcribe Episode', value: 'transcribe', description: 'Submit episode audio for transcription', action: 'Transcribe episode' },
		],
		default: 'getCredits',
	},
];

export const aiFields: INodeProperties[] = [
	// ------ Episode ID (transcribe, generate, getTranscription, runPipeline) ------
	{
		displayName: 'Episode ID',
		name: 'episodeId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['ai'], operation: ['transcribe', 'generate', 'getTranscription', 'runPipeline'] } },
		description: 'UUID of the episode',
	},

	// ------ Show ID (for generate and runPipeline which need the show context) ------
	{
		displayName: 'Show ID',
		name: 'showId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['ai'], operation: ['runPipeline'] } },
		description: 'UUID of the show (needed for batch pipeline)',
	},

	// ------ Transcribe fields ------
	{
		displayName: 'Audio URL',
		name: 'audioUrl',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['ai'], operation: ['transcribe'] } },
		description: 'Public URL of the audio file to transcribe',
	},

	// ------ Generate fields ------
	{
		displayName: 'Generation Type',
		name: 'generationType',
		type: 'options',
		required: true,
		default: 'show_notes',
		displayOptions: { show: { resource: ['ai'], operation: ['generate'] } },
		options: [
			{ name: 'Description', value: 'description' },
			{ name: 'Show Notes', value: 'show_notes' },
			{ name: 'Social — Instagram', value: 'social_instagram' },
			{ name: 'Social — LinkedIn', value: 'social_linkedin' },
			{ name: 'Social — Twitter', value: 'social_twitter' },
			{ name: 'Titles', value: 'titles' },
		],
		description: 'Type of content to generate from the transcript',
	},

	// ------ Generate optional fields ------
	{
		displayName: 'Options',
		name: 'generateOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: { show: { resource: ['ai'], operation: ['generate'] } },
		options: [
			{
				displayName: 'Length', name: 'length', type: 'options', default: 'standard',
				options: [
					{ name: 'Brief', value: 'brief' },
					{ name: 'Detailed', value: 'detailed' },
					{ name: 'Standard', value: 'standard' },
				],
			},
			{
				displayName: 'Tone', name: 'tone', type: 'options', default: 'professional',
				options: [
					{ name: 'Casual', value: 'casual' },
					{ name: 'Energetic', value: 'energetic' },
					{ name: 'Professional', value: 'professional' },
				],
			},
		],
	},
];
