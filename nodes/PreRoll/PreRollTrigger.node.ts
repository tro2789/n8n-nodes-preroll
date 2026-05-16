import { createHmac } from 'crypto';
import {
	IDataObject,
	IHookFunctions,
	IHttpRequestOptions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	NodeConnectionTypes,
} from 'n8n-workflow';

export class PreRollTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'PreRoll.io Trigger',
		usableAsTool: true,
		name: 'preRollTrigger',
		icon: 'file:preroll.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["events"].join(", ")}}',
		description: 'Triggers when events occur in PreRoll.io',
		defaults: {
			name: 'PreRoll.io Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'preRollApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{ name: 'Deliverable — Approved', value: 'deliverable.approved' },
					{ name: 'Deliverable — Resubmitted', value: 'deliverable.resubmitted' },
					{ name: 'Deliverable — Revision Requested', value: 'deliverable.revision_requested' },
					{ name: 'Deliverable — Submitted', value: 'deliverable.submitted' },
					{ name: 'Episode — Published', value: 'episode.published' },
					{ name: 'Episode — Scheduled', value: 'episode.scheduled' },
					{ name: 'Episode — Stage Changed', value: 'episode.stage_changed' },
					{ name: 'Episode — Status Changed', value: 'episode.status_changed' },
				],
				description: 'Which events to listen for',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Optional description for this webhook endpoint in PreRoll',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId) {
					const credentials = await this.getCredentials('preRollApi') as IDataObject;
					const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');
					try {
						await this.helpers.httpRequestWithAuthentication.call(this, 'preRollApi', {
							method: 'GET',
							url: `${baseUrl}/api/v1/webhook-endpoints/${webhookData.webhookId}`,
							json: true,
						} as IHttpRequestOptions);
						return true;
					} catch {
						return false;
					}
				}
				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const events = this.getNodeParameter('events') as string[];
				const description = this.getNodeParameter('description', '') as string;
				const credentials = await this.getCredentials('preRollApi') as IDataObject;
				const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

				const body: IDataObject = {
					url: webhookUrl,
					events,
				};
				if (description) {
					body.description = `n8n: ${description}`;
				} else {
					body.description = 'n8n webhook trigger';
				}

				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'preRollApi', {
					method: 'POST',
					url: `${baseUrl}/api/v1/webhook-endpoints`,
					body,
					json: true,
				} as IHttpRequestOptions);

				const data = response.data ?? response;
				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = (data as IDataObject).id;
				webhookData.webhookSecret = (data as IDataObject).secret;

				return true;
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (!webhookData.webhookId) return true;

				const credentials = await this.getCredentials('preRollApi') as IDataObject;
				const baseUrl = (credentials.baseUrl as string).replace(/\/$/, '');

				try {
					await this.helpers.httpRequestWithAuthentication.call(this, 'preRollApi', {
						method: 'DELETE',
						url: `${baseUrl}/api/v1/webhook-endpoints/${webhookData.webhookId}`,
						json: true,
					} as IHttpRequestOptions);
				} catch {
					// Endpoint may already be deleted
				}

				delete webhookData.webhookId;
				delete webhookData.webhookSecret;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = this.getBodyData() as IDataObject;

		const webhookData = this.getWorkflowStaticData('node');
		const secret = webhookData.webhookSecret as string | undefined;

		if (secret) {
			const signature = req.headers['x-preroll-signature'] as string | undefined;
			if (signature) {
				const rawBody = JSON.stringify(body);
				const expected = createHmac('sha256', secret)
					.update(rawBody)
					.digest('hex');
				if (signature !== expected) {
					return { workflowData: [] };
				}
			}
		}

		return {
			workflowData: [
				this.helpers.returnJsonArray(body),
			],
		};
	}
}
