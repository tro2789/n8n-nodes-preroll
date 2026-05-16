import {
	IExecuteFunctions,
	IDataObject,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { clientOperations, clientFields } from './resources/ClientDescription';
import { showOperations, showFields } from './resources/ShowDescription';
import { episodeOperations, episodeFields } from './resources/EpisodeDescription';
import { deliverableOperations, deliverableFields } from './resources/DeliverableDescription';
import { tagOperations, tagFields } from './resources/TagDescription';
import { meetingNoteOperations, meetingNoteFields } from './resources/MeetingNoteDescription';
import { pipelineStageOperations, pipelineStageFields } from './resources/PipelineStageDescription';
import { activityOperations, activityFields } from './resources/ActivityDescription';
import { aiOperations, aiFields } from './resources/AiDescription';
import { dashboardOperations, dashboardFields } from './resources/DashboardDescription';

export class PreRoll implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PreRoll.io',
		name: 'preRoll',
		icon: 'file:preroll.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with PreRoll.io — podcast production management',
		defaults: {
			name: 'PreRoll.io',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'preRollApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Activity', value: 'activity' },
					{ name: 'AI', value: 'ai' },
					{ name: 'Client', value: 'client' },
					{ name: 'Dashboard', value: 'dashboard' },
					{ name: 'Deliverable', value: 'deliverable' },
					{ name: 'Episode', value: 'episode' },
					{ name: 'Meeting Note', value: 'meetingNote' },
					{ name: 'Pipeline Stage', value: 'pipelineStage' },
					{ name: 'Show', value: 'show' },
					{ name: 'Tag', value: 'tag' },
				],
				default: 'episode',
			},
			...clientOperations,
			...clientFields,
			...showOperations,
			...showFields,
			...episodeOperations,
			...episodeFields,
			...deliverableOperations,
			...deliverableFields,
			...tagOperations,
			...tagFields,
			...meetingNoteOperations,
			...meetingNoteFields,
			...pipelineStageOperations,
			...pipelineStageFields,
			...activityOperations,
			...activityFields,
			...aiOperations,
			...aiFields,
			...dashboardOperations,
			...dashboardFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('preRollApi') as IDataObject;
		const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[];

				// ────────── Client ──────────
				if (resource === 'client') {
					if (operation === 'getAll') {
						responseData = await apiRequest.call(this, 'GET', baseUrl, '/clients');
					} else if (operation === 'get') {
						const id = this.getNodeParameter('clientId', i) as string;
						responseData = await apiRequest.call(this, 'GET', baseUrl, `/clients/${id}`);
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additional = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'POST', baseUrl, '/clients', { name, ...additional });
					} else if (operation === 'update') {
						const id = this.getNodeParameter('clientId', i) as string;
						const fields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'PATCH', baseUrl, `/clients/${id}`, fields);
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('clientId', i) as string;
						await apiRequest.call(this, 'DELETE', baseUrl, `/clients/${id}`);
						responseData = { success: true };
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ────────── Show ──────────
				} else if (resource === 'show') {
					if (operation === 'getAll') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const qs = clientId ? `?client_id=${clientId}` : '';
						responseData = await apiRequest.call(this, 'GET', baseUrl, `/shows${qs}`);
					} else if (operation === 'get') {
						const id = this.getNodeParameter('showId', i) as string;
						responseData = await apiRequest.call(this, 'GET', baseUrl, `/shows/${id}`);
					} else if (operation === 'create') {
						const clientId = this.getNodeParameter('clientId', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additional = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'POST', baseUrl, '/shows', { client_id: clientId, name, ...additional });
					} else if (operation === 'update') {
						const id = this.getNodeParameter('showId', i) as string;
						const fields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'PATCH', baseUrl, `/shows/${id}`, fields);
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('showId', i) as string;
						await apiRequest.call(this, 'DELETE', baseUrl, `/shows/${id}`);
						responseData = { success: true };
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ────────── Episode ──────────
				} else if (resource === 'episode') {
					if (operation === 'getAll') {
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const params = new URLSearchParams();
						for (const [key, val] of Object.entries(filters)) {
							if (val !== '' && val !== undefined && val !== false) params.set(key, String(val));
						}
						const qs = params.toString() ? `?${params}` : '';
						responseData = await apiRequest.call(this, 'GET', baseUrl, `/episodes${qs}`);
					} else if (operation === 'get') {
						const showId = this.getNodeParameter('showId', i) as string;
						const episodeId = this.getNodeParameter('episodeId', i) as string;
						responseData = await apiRequest.call(this, 'GET', baseUrl, `/shows/${showId}/episodes/${episodeId}`);
					} else if (operation === 'create') {
						const showId = this.getNodeParameter('showId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const additional = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'POST', baseUrl, `/shows/${showId}/episodes`, { title, ...additional });
					} else if (operation === 'update') {
						const showId = this.getNodeParameter('showId', i) as string;
						const episodeId = this.getNodeParameter('episodeId', i) as string;
						const fields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'PATCH', baseUrl, `/shows/${showId}/episodes/${episodeId}`, fields);
					} else if (operation === 'delete') {
						const showId = this.getNodeParameter('showId', i) as string;
						const episodeId = this.getNodeParameter('episodeId', i) as string;
						await apiRequest.call(this, 'DELETE', baseUrl, `/shows/${showId}/episodes/${episodeId}`);
						responseData = { success: true };
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ────────── Deliverable ──────────
				} else if (resource === 'deliverable') {
					if (operation === 'getAll') {
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const params = new URLSearchParams();
						for (const [key, val] of Object.entries(filters)) {
							if (val !== '' && val !== undefined) params.set(key, String(val));
						}
						const qs = params.toString() ? `?${params}` : '';
						responseData = await apiRequest.call(this, 'GET', baseUrl, `/deliverables${qs}`);
					} else if (operation === 'get') {
						const id = this.getNodeParameter('deliverableId', i) as string;
						responseData = await apiRequest.call(this, 'GET', baseUrl, `/deliverables/${id}`);
					} else if (operation === 'create') {
						const showId = this.getNodeParameter('showId', i) as string;
						const title = this.getNodeParameter('title', i) as string;
						const additional = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'POST', baseUrl, '/deliverables', { show_id: showId, title, ...additional });
					} else if (operation === 'update') {
						const id = this.getNodeParameter('deliverableId', i) as string;
						const fields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'PATCH', baseUrl, `/deliverables/${id}`, fields);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ────────── Tag ──────────
				} else if (resource === 'tag') {
					if (operation === 'getAll') {
						responseData = await apiRequest.call(this, 'GET', baseUrl, '/tags');
					} else if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const color = this.getNodeParameter('color', i) as string;
						responseData = await apiRequest.call(this, 'POST', baseUrl, '/tags', { name, color });
					} else if (operation === 'update') {
						const id = this.getNodeParameter('tagId', i) as string;
						const fields = this.getNodeParameter('updateFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'PATCH', baseUrl, `/tags/${id}`, fields);
					} else if (operation === 'delete') {
						const id = this.getNodeParameter('tagId', i) as string;
						await apiRequest.call(this, 'DELETE', baseUrl, `/tags/${id}`);
						responseData = { success: true };
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ────────── Meeting Note ──────────
				} else if (resource === 'meetingNote') {
					const clientId = this.getNodeParameter('clientId', i) as string;
					if (operation === 'getAll') {
						responseData = await apiRequest.call(this, 'GET', baseUrl, `/clients/${clientId}/notes`);
					} else if (operation === 'create') {
						const content = this.getNodeParameter('content', i) as string;
						const additional = this.getNodeParameter('additionalFields', i) as IDataObject;
						responseData = await apiRequest.call(this, 'POST', baseUrl, `/clients/${clientId}/notes`, { content, ...additional });
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ────────── Pipeline Stage ──────────
				} else if (resource === 'pipelineStage') {
					const showId = this.getNodeParameter('showId', i) as string;
					responseData = await apiRequest.call(this, 'GET', baseUrl, `/shows/${showId}/stages`);

				// ────────── Activity ──────────
				} else if (resource === 'activity') {
					const showId = this.getNodeParameter('showId', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					responseData = await apiRequest.call(this, 'GET', baseUrl, `/activity?show_id=${showId}&limit=${limit}`);

				// ────────── AI ──────────
				} else if (resource === 'ai') {
					if (operation === 'getCredits') {
						responseData = await apiRequest.call(this, 'GET', baseUrl, '/ai/credits');
					} else if (operation === 'getTranscription') {
						const episodeId = this.getNodeParameter('episodeId', i) as string;
						responseData = await apiRequest.call(this, 'GET', baseUrl, `/episodes/${episodeId}/transcription`);
					} else if (operation === 'transcribe') {
						const episodeId = this.getNodeParameter('episodeId', i) as string;
						const audioUrl = this.getNodeParameter('audioUrl', i) as string;
						responseData = await apiRequest.call(this, 'POST', baseUrl, `/episodes/${episodeId}/transcribe`, {
							source_type: 'url',
							audio_url: audioUrl,
						});
					} else if (operation === 'generate') {
						const episodeId = this.getNodeParameter('episodeId', i) as string;
						const generationType = this.getNodeParameter('generationType', i) as string;
						const options = this.getNodeParameter('generateOptions', i) as IDataObject;
						responseData = await apiRequest.call(this, 'POST', baseUrl, `/episodes/${episodeId}/generate`, {
							type: generationType,
							...options,
						});
					} else if (operation === 'runPipeline') {
						const showId = this.getNodeParameter('showId', i) as string;
						const episodeId = this.getNodeParameter('episodeId', i) as string;
						responseData = await apiRequest.call(this, 'POST', baseUrl, `/shows/${showId}/episodes/${episodeId}/pipeline`, {});
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}

				// ────────── Dashboard ──────────
				} else if (resource === 'dashboard') {
					responseData = await apiRequest.call(this, 'GET', baseUrl, '/dashboard');

				} else {
					throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData as IDataObject),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

async function apiRequest(
	this: IExecuteFunctions,
	method: string,
	baseUrl: string,
	path: string,
	body?: IDataObject,
): Promise<IDataObject | IDataObject[]> {
	const options: IHttpRequestOptions = {
		method: method as IHttpRequestOptions['method'],
		url: `${baseUrl}/api/v1${path}`,
		json: true,
	};

	if (body && Object.keys(body).length > 0) {
		options.body = body;
	}

	const response = await this.helpers.httpRequestWithAuthentication.call(
		this,
		'preRollApi',
		options,
	);

	if (method === 'DELETE') {
		return { success: true };
	}

	return (response.data ?? response) as IDataObject | IDataObject[];
}
