import type { IExecuteFunctions, IHttpRequestMethods, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class ManageOffers implements INodeType {
    public description: INodeTypeDescription = {
        name: 'ManageOffers',
        displayName: 'Manage Offer',
        icon: {
            light: 'file:../../icons/cpvlabpro.svg',
            dark: 'file:../../icons/cpvlabpro.dark.svg'
        },
        group: ['organization'],
        version: 1,
        description: 'Add or edit an offer. Also, add an offer to a campaign',
        defaults: {
            name: 'Manage Offer'
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'cpvLabProApi',
                required: true
            }
        ],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                options: [
                    { name: 'Add Offer', value: 'add-offer' },
                    { name: 'Edit Offer', value: 'edit-offer' },
                    { name: 'Add Offer To Campaign', value: 'add-to-campaign' }
                ],
                default: 'add-offer',
                required: true,
                description: 'Choose whether to add, edit, or add an offer to a campaign'
            },
            {
                displayName: 'Offer ID',
                name: 'id',
                type: 'string',
                default: '',
                required: true,
                description: 'The offer ID',
                displayOptions: {
                    show: {
                        operation: ['edit-offer']
                    }
                }
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                required: true,
                description: 'The offer name',
                displayOptions: {
                    show: {
                        operation: ['add-offer']
                    }
                }
            },
            {
                displayName: 'Name',
                name: 'name_edit',
                type: 'string',
                default: '',
                description: 'The offer name',
                displayOptions: {
                    show: {
                        operation: ['edit-offer']
                    }
                }
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                required: true,
                description: 'The complete offer URL (should start with http:// or https://)',
                displayOptions: {
                    show: {
                        operation: ['add-offer']
                    }
                }
            },
            {
                displayName: 'URL',
                name: 'url_edit',
                type: 'string',
                default: '',
                description: 'The complete offer URL (should start with http:// or https://)',
                displayOptions: {
                    show: {
                        operation: ['edit-offer']
                    }
                }
            },
            {
                displayName: 'Source',
                name: 'source',
                type: 'string',
                default: '',
                required: true,
                description: 'Offer source (affiliate network) that must exist in CPV Lab Pro',
                displayOptions: {
                    show: {
                        operation: ['add-offer']
                    }
                }
            },
            {
                displayName: 'Source',
                name: 'source_edit',
                type: 'string',
                default: '',
                description: 'Offer source (affiliate network) that must exist in CPV Lab Pro',
                displayOptions: {
                    show: {
                        operation: ['edit-offer']
                    }
                }
            },
            {
                displayName: 'Payout',
                name: 'payout',
                type: 'number',
                default: '',
                required: true,
                description: 'Offer payout (revenue)',
                displayOptions: {
                    show: {
                        operation: ['add-offer']
                    }
                }
            },
            {
                displayName: 'Payout',
                name: 'payout_edit',
                type: 'number',
                default: '',
                description: 'Offer payout (revenue)',
                displayOptions: {
                    show: {
                        operation: ['edit-offer']
                    }
                }
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'options',
                options: [
                    { name: 'Active', value: 'active' },
                    { name: 'Inactive', value: 'inactive' }
                ],
                default: 'active',
                description: 'Whether the offer is active or inactive',
                displayOptions: {
                    show: {
                        operation: ['add-offer']
                    }
                }
            },
            {
                displayName: 'Status',
                name: 'status_edit',
                type: 'options',
                options: [
                    { name: 'Active', value: 'active' },
                    { name: 'Inactive', value: 'inactive' }
                ],
                default: '',
                description: 'Whether the offer is active or inactive',
                displayOptions: {
                    show: {
                        operation: ['edit-offer']
                    }
                }
            },
            {
                displayName: 'Notes',
                name: 'notes',
                type: 'string',
                default: '',
                typeOptions: {
                    rows: 2
                },
                description: 'Details or description of the offer',
                displayOptions: {
                    show: {
                        operation: ['add-offer']
                    }
                }
            },
            {
                displayName: 'Notes',
                name: 'notes_edit',
                type: 'string',
                default: '',
                typeOptions: {
                    rows: 2
                },
                description: 'Details or description of the offer',
                displayOptions: {
                    show: {
                        operation: ['edit-offer']
                    }
                }
            },
            {
                displayName: 'Campaign ID',
                name: 'campaign_id',
                type: 'string',
                default: '',
                required: true,
                description: 'The campaign ID',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'Offer ID',
                name: 'offer_id_campaign',
                type: 'string',
                default: '',
                description: 'Existing predefined offer ID',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'Name',
                name: 'name_campaign',
                type: 'string',
                default: '',
                description: 'Offer name (required when adding a new offer)',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'URL',
                name: 'url_campaign',
                type: 'string',
                default: '',
                description: 'The complete URL (required when adding a new offer and should start with http:// or https://)',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'Source',
                name: 'source_campaign',
                type: 'string',
                default: '',
                description: 'Offer source (affiliate network) that must exist in CPV Lab Pro (required when adding a new offer)',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'Payout',
                name: 'payout_campaign',
                type: 'number',
                default: '',
                description: 'Offer payout (required when adding a new offer)',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'Status',
                name: 'status_campaign',
                type: 'options',
                options: [
                    { name: 'Active', value: 'active' },
                    { name: 'Inactive', value: 'inactive' }
                ],
                default: 'active',
                description: 'Whether the offer is active or inactive (required when adding a new offer)',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'Share',
                name: 'share',
                type: 'number',
                default: '',
                description: 'The share percentage',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'Page ID',
                name: 'page_id',
                type: 'number',
                default: '',
                description: 'The page ID',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'Path ID',
                name: 'path_id',
                type: 'number',
                default: '',
                description: 'The path ID',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            }
        ]
    };

    /**
     * Execute the node
     * 
     * @param this The execution functions
     * @return {Promise<Array<Array<INodeExecutionData>>>} The execution data
     */
    public async execute(this: IExecuteFunctions): Promise<Array<Array<INodeExecutionData>>> {
        const items = this.getInputData();
        const returnData: Array<INodeExecutionData> = [];

        for (let i = 0; i < items.length; i++) {
            try {

                // Get authentication parameters.

                const credentials = await this.getCredentials('cpvLabProApi');

                if (!credentials)
                    throw new Error('CpvLabPro API credentials not configured');

                const baseUrl = credentials.base_url as string;
                const apiKey = credentials.api_key as string;

                // Get parameters from the node configuration.

                const operation = this.getNodeParameter('operation', i, 'add-offer') as string;

                let apiUrl: string = '';
                let method: IHttpRequestMethods = 'POST';
                let body: any;

                if (operation === 'add-offer') {
                    // Get parameters for add operation.

                    const name = this.getNodeParameter('name', i, '') as string;
                    const url = this.getNodeParameter('url', i, '') as string;
                    const source = this.getNodeParameter('source', i, '') as string;
                    const payout = this.getNodeParameter('payout', i, '') as string;
                    const status = this.getNodeParameter('status', i, 'active') as string;
                    const notes = this.getNodeParameter('notes', i, '') as string;

                    // Build request body

                    body = {
                        name: name,
                        url: url,
                        source: source,
                        payout: payout,
                        status: status
                    };

                    if (notes !== '')
                        body.notes = notes;

                    apiUrl = `${baseUrl}/api/v2/offers/`;
                    method = 'POST';
                } else if (operation === 'edit-offer') {
                    // Get parameters for edit operation.

                    const id = this.getNodeParameter('id', i, '') as string;
                    const nameEdit = this.getNodeParameter('name_edit', i, '') as string;
                    const urlEdit = this.getNodeParameter('url_edit', i, '') as string;
                    const sourceEdit = this.getNodeParameter('source_edit', i, '') as string;
                    const payoutEdit = this.getNodeParameter('payout_edit', i, '') as string;
                    const statusEdit = this.getNodeParameter('status_edit', i, '') as string;
                    const notesEdit = this.getNodeParameter('notes_edit', i, '') as string;

                    // Build request body

                    body = {};

                    if (nameEdit !== '')
                        body.name = nameEdit;

                    if (urlEdit !== '')
                        body.url = urlEdit;

                    if (sourceEdit !== '')
                        body.source = sourceEdit;

                    if (payoutEdit !== '')
                        body.payout = payoutEdit;

                    if (statusEdit !== '')
                        body.status = statusEdit;

                    if (notesEdit !== '')
                        body.notes = notesEdit;

                    apiUrl = `${baseUrl}/api/v2/offers/${id}`;
                    method = 'PUT';
                } else if (operation === 'add-to-campaign') {
                    // Get parameters for add-to-campaign operation.

                    const campaignId = this.getNodeParameter('campaign_id', i, '') as string;
                    const offerId = this.getNodeParameter('offer_id_campaign', i, '') as string;
                    const name = this.getNodeParameter('name_campaign', i, '') as string;
                    const url = this.getNodeParameter('url_campaign', i, '') as string;
                    const source = this.getNodeParameter('source_campaign', i, '') as string;
                    const payout = this.getNodeParameter('payout_campaign', i, '') as string;
                    const status = this.getNodeParameter('status_campaign', i, 'active') as string;
                    const share = this.getNodeParameter('share', i, '') as string;
                    const pageId = this.getNodeParameter('page_id', i, '') as string;
                    const pathId = this.getNodeParameter('path_id', i, '') as string;

                    // Build request body

                    body = {
                        campaign_id: campaignId
                    };

                    if (offerId !== '')
                        body.offer_id = offerId;

                    if (name !== '')
                        body.name = name;

                    if (url !== '')
                        body.url = url;

                    if (source !== '')
                        body.source = source;

                    if (payout !== '')
                        body.payout = payout;

                    if (status !== '')
                        body.status = status;

                    if (share !== '')
                        body.share = share;

                    if (pageId !== '')
                        body.page_id = pageId;

                    if (pathId !== '')
                        body.path_id = pathId;

                    apiUrl = `${baseUrl}/api/v2/offers/campaign`;
                    method = 'POST';
                }

                // Make the HTTP request to the CpvLabPro API.

                const response = await this.helpers.httpRequest({
                    method: method,
                    url: apiUrl,
                    headers: {
                        'API-Key': apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: body,
                    json: true
                });

                // Process the response and add it to the return data.

                returnData.push({ json: response } as INodeExecutionData);
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: (error as Error).message } } as INodeExecutionData);

                    continue;
                }

                if ((error as any).context) {
                    (error as any).context.i = i;

                    throw error;
                }

                throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
            }
        }

        return [returnData];
    }
}
