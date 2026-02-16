import type { IDataObject, IExecuteFunctions, IHttpRequestMethods, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class ManageLandingPages implements INodeType {
    public description: INodeTypeDescription = {
        name: 'manageLandingPages',
        displayName: 'Manage Landing Page',
        usableAsTool: true,
        icon: {
            light: 'file:../../icons/cpvlabpro.svg',
            dark: 'file:../../icons/cpvlabpro.dark.svg'
        },
        group: ['organization'],
        version: 1,
        description: 'Add or edit a landing page. Also, add a landing page to a campaign',
        defaults: {
            name: 'Manage Landing Page'
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
                noDataExpression: true,
                options: [
                    { name: 'Add Landing Page', action: 'Add landing page', value: 'add-landing-page' },
                    { name: 'Edit Landing Page', action: 'Edit landing page', value: 'edit-landing-page' },
                    { name: 'Add Landing Page To Campaign', action: 'Add landing page to campaign', value: 'add-to-campaign' }
                ],
                default: 'add-landing-page',
                required: true,
                description: 'Choose whether to add, edit, or add a landing page to a campaign'
            },
            {
                displayName: 'Landing Page ID',
                name: 'id',
                type: 'string',
                default: '',
                required: true,
                description: 'The landing page ID to edit',
                displayOptions: {
                    show: {
                        operation: ['edit-landing-page']
                    }
                }
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                required: true,
                description: 'The landing page name',
                displayOptions: {
                    show: {
                        operation: ['add-landing-page']
                    }
                }
            },
            {
                displayName: 'Name',
                name: 'name_edit',
                type: 'string',
                default: '',
                description: 'The landing page name',
                displayOptions: {
                    show: {
                        operation: ['edit-landing-page']
                    }
                }
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                required: true,
                description: 'The complete landing page URL (should start with http:// or https://)',
                displayOptions: {
                    show: {
                        operation: ['add-landing-page']
                    }
                }
            },
            {
                displayName: 'URL',
                name: 'url_edit',
                type: 'string',
                default: '',
                description: 'The complete landing page URL (should start with http:// or https://)',
                displayOptions: {
                    show: {
                        operation: ['edit-landing-page']
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
                description: 'Whether the page is active or inactive',
                displayOptions: {
                    show: {
                        operation: ['add-landing-page']
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
                default: 'active',
                description: 'Whether the page is active or inactive',
                displayOptions: {
                    show: {
                        operation: ['edit-landing-page']
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
                description: 'Details or description of the landing page',
                displayOptions: {
                    show: {
                        operation: ['add-landing-page']
                    }
                }
            },
            {
                displayName: 'Group',
                name: 'group',
                type: 'string',
                default: 'Default',
                description: 'The group name the landing page belongs to',
                displayOptions: {
                    show: {
                        operation: ['add-landing-page']
                    }
                }
            },
            {
                displayName: 'New Group',
                name: 'new_group',
                type: 'string',
                default: '',
                description: 'The name of a new group to create and assign the landing page to',
                displayOptions: {
                    show: {
                        operation: ['add-landing-page']
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
                description: 'Details or description of the landing page',
                displayOptions: {
                    show: {
                        operation: ['edit-landing-page']
                    }
                }
            },
            {
                displayName: 'Group',
                name: 'group_edit',
                type: 'string',
                default: '',
                description: 'The group name the landing page belongs to',
                displayOptions: {
                    show: {
                        operation: ['edit-landing-page']
                    }
                }
            },
            {
                displayName: 'Campaign ID',
                name: 'campaign_id',
                type: 'string',
                default: '',
                required: true,
                description: 'The ID of the campaign to which the landing page will be added',
                displayOptions: {
                    show: {
                        operation: ['add-to-campaign']
                    }
                }
            },
            {
                displayName: 'Landing Page ID',
                name: 'landing_page_id',
                type: 'string',
                default: '',
                description: 'Existing predefined landing page ID',
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
                description: 'The name (required when adding a new landing page)',
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
                description: 'The complete URL (required when adding a new landing page and should start with http:// or https://)',
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
                description: 'Whether the page is active or inactive (required when adding a new landing page)',
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
                displayName: 'Level',
                name: 'level',
                type: 'number',
                default: 1,
                description: 'The level of the landing page',
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
                description: 'The page ID for the landing page',
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
                description: 'The path ID for the landing page',
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
                    throw new NodeOperationError(this.getNode(), 'CpvLabPro API credentials not configured', { itemIndex: i });

                const baseUrl = credentials.base_url as string;
                const apiKey = credentials.api_key as string;

                // Get parameters from the node configuration.

                const operation = this.getNodeParameter('operation', i, 'add-landing-page') as string;

                let apiUrl: string = '';
                let method: IHttpRequestMethods = 'POST';
                let body: IDataObject = {};

                if (operation === 'add-landing-page') {
                    // Get parameters for add-landing-page operation.

                    const name = this.getNodeParameter('name', i, '') as string;
                    const url = this.getNodeParameter('url', i, '') as string;
                    const status = this.getNodeParameter('status', i, 'active') as string;
                    const notes = this.getNodeParameter('notes', i, '') as string;
                    const group = this.getNodeParameter('group', i, 'Default') as string;
                    const newGroup = this.getNodeParameter('new_group', i, '') as string;

                    // Build request body

                    body = {
                        name: name,
                        url: url,
                        status: status
                    };

                    if (notes !== '')
                        body.notes = notes;

                    if (group !== '')
                        body.group = group;

                    if (newGroup !== '')
                        body.new_group = newGroup;

                    apiUrl = `${baseUrl}/api/v2/landing-pages/`;
                    method = 'POST';
                } else if (operation === 'edit-landing-page') {
                    // Get parameters for edit-landing-page operation.

                    const id = this.getNodeParameter('id', i, '') as string;
                    const nameEdit = this.getNodeParameter('name_edit', i, '') as string;
                    const urlEdit = this.getNodeParameter('url_edit', i, '') as string;
                    const statusEdit = this.getNodeParameter('status_edit', i, '') as string;
                    const notesEdit = this.getNodeParameter('notes_edit', i, '') as string;
                    const groupEdit = this.getNodeParameter('group_edit', i, '') as string;

                    // Build request body

                    body = {};

                    if (nameEdit !== '')
                        body.name = nameEdit;

                    if (urlEdit !== '')
                        body.url = urlEdit;

                    if (statusEdit !== '')
                        body.status = statusEdit;

                    if (notesEdit !== '')
                        body.notes = notesEdit;

                    if (groupEdit !== '')
                        body.group = groupEdit;

                    apiUrl = `${baseUrl}/api/v2/landing-pages/${id}`;
                    method = 'PUT';
                } else if (operation === 'add-to-campaign') {
                    // Get parameters for add-to-campaign operation.

                    const campaignId = this.getNodeParameter('campaign_id', i, '') as string;
                    const landingPageId = this.getNodeParameter('landing_page_id', i, '') as string;
                    const name = this.getNodeParameter('name_campaign', i, '') as string;
                    const url = this.getNodeParameter('url_campaign', i, '') as string;
                    const status = this.getNodeParameter('status_campaign', i, 'active') as string;
                    const share = this.getNodeParameter('share', i, '') as string;
                    const level = this.getNodeParameter('level', i, 1) as number;
                    const pageId = this.getNodeParameter('page_id', i, '') as string;
                    const pathId = this.getNodeParameter('path_id', i, '') as string;

                    // Build request body

                    body = {
                        campaign_id: campaignId
                    };

                    if (landingPageId !== '')
                        body.landing_page_id = landingPageId;

                    if (name !== '')
                        body.name = name;

                    if (url !== '')
                        body.url = url;

                    if (status !== '')
                        body.status = status;

                    if (share !== '')
                        body.share = share;

                    if (level)
                        body.level = level;

                    if (pageId !== '')
                        body.page_id = pageId;

                    if (pathId !== '')
                        body.path_id = pathId;

                    apiUrl = `${baseUrl}/api/v2/landing-pages/campaign`;
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

                returnData.push({ json: response, pairedItem: { item: i } } as INodeExecutionData);
            } catch (error) {
                const errorResponse: { status: number, message: string } = { status: 0, message: '' };

                if (error.response) {
                    let errorData = error.response.data;

                    if (typeof errorData === 'string')
                        errorData = JSON.parse(errorData);

                    if (typeof errorData === 'object' && errorData !== null) {
                        if (errorData.status !== undefined)
                            errorResponse.status = errorData.status;

                        if (errorData.message !== undefined)
                            errorResponse.message = errorData.message;
                    }
                } else if (error.message)
                    errorResponse.message = error.message;

                if (this.continueOnFail()) {
                    returnData.push({ json: errorResponse, pairedItem: { item: i } } as INodeExecutionData);

                    continue;
                }

                if (error.context) {
                    error.context.i = i;

                    throw error;
                }

                throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
            }
        }

        return [returnData];
    }
}
