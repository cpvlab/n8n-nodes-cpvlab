import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class ManageCampaigns implements INodeType {
    public description: INodeTypeDescription = {
        name: 'ManageCampaigns',
        displayName: 'Manage Campaigns',
        icon: {
            light: 'file:../../icons/cpvlabpro.svg',
            dark: 'file:../../icons/cpvlabpro.dark.svg'
        },
        group: ['organization'],
        version: 1,
        description: 'Get campaigns and conversions. Also, edit campaign options and pages',
        defaults: {
            name: 'Manage Campaigns'
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
                    { name: 'Get Campaigns', value: 'get-campaigns' },
                    { name: 'Get Conversions', value: 'get-conversions' },
                    { name: 'Edit Campaign Options', value: 'edit-options' },
                    { name: 'Edit Page From Campaign', value: 'edit-page' }
                ],
                default: 'get-campaigns',
                required: true,
                description: 'Choose an operation'
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
                        operation: ['edit-options', 'edit-page']
                    }
                }
            },
            {
                displayName: 'Campaign ID',
                name: 'campaign_id_conversions',
                type: 'string',
                default: '',
                required: true,
                description: 'The campaign ID (use 0 for all campaigns)',
                displayOptions: {
                    show: {
                        operation: ['get-conversions']
                    }
                }
            },
            {
                displayName: 'Fields',
                name: 'fields',
                type: 'string',
                default: [],
                typeOptions: {
                    multipleValues: true
                },
                description: 'Collections of column names to include in the response. If not provided, all fields are returned.',
                displayOptions: {
                    show: {
                        operation: ['get-campaigns', 'get-conversions']
                    }
                }
            },
            {
                displayName: 'Campaign Name',
                name: 'filter_campaign_name',
                type: 'string',
                default: '',
                description: 'Filter results by campaign name (case-insensitive, partial match).',
                displayOptions: {
                    show: {
                        operation: ['get-campaigns']
                    }
                }
            },
            {
                displayName: 'Source Name',
                name: 'filter_source_name',
                type: 'string',
                default: '',
                description: 'Filter results by traffic source name (case-insensitive, partial match).',
                displayOptions: {
                    show: {
                        operation: ['get-campaigns']
                    }
                }
            },
            {
                displayName: 'Group Name',
                name: 'filter_group_name',
                type: 'string',
                default: '',
                description: 'Filter results by group name (case-insensitive, partial match).',
                displayOptions: {
                    show: {
                        operation: ['get-campaigns']
                    }
                }
            },
            {
                displayName: 'Status',
                name: 'filter_status',
                type: 'options',
                default: 'all',
                options: [
                    { name: 'All', value: 'all' },
                    { name: 'Active', value: 'active' },
                    { name: 'Inactive', value: 'inactive' }
                ],
                description: 'Filter campaigns by status. Allowed values: \'all\', \'active\', \'inactive\'. Default is \'all\'.',
                displayOptions: {
                    show: {
                        operation: ['get-campaigns']
                    }
                }
            },
            {
                displayName: 'Campaign Type',
                name: 'filter_campaign_type',
                type: 'options',
                default: 'all',
                options: [
                    { name: "All", value: "all" },
                    { name: "Lead Capture / Opt-In Campaign", value: "lc" },
                    { name: "Multiple Path Campaign", value: "mp" },
                    { name: "Landing Page Sequence Campaign", value: "lps" },
                    { name: "Multiple Option Campaign", value: "mo" },
                    { name: "Direct Link & Landing Page Campaign", value: "dllp" },
                    { name: "Email Follow-Up Campaign", value: "email" }
                ],
                description: 'Filter campaigns by campaign type. Allowed values: \'all\', \'lc\', \'mp\', \'lps\', \'mo\', \'dllp\', \'email\'. Default is \'all\'.',
                displayOptions: {
                    show: {
                        operation: ['get-campaigns']
                    }
                }
            },
            {
                displayName: 'Interval',
                name: 'filter_interval_campaigns',
                type: 'options',
                default: 'all',
                options: [
                    { name: 'All', value: 'all' },
                    { name: 'Today', value: 'today' },
                    { name: 'Yesterday', value: 'yesterday' },
                    { name: 'Past 7 Days', value: 'past_7_days' },
                    { name: 'Past 14 Days', value: 'past_14_days' },
                    { name: 'Past 30 Days', value: 'past_30_days' },
                    { name: 'This Month', value: 'this_month' },
                    { name: 'Last Month', value: 'last_month' }
                ],
                description: 'Filter by time interval. Allowed values: \'all\', \'today\', \'yesterday\', \'past_7_days\', \'past_14_days\', \'past_30_days\', \'this_month\', \'last_month\'. Default is \'all\'.',
                displayOptions: {
                    show: {
                        operation: ['get-campaigns']
                    }
                }
            },
            {
                displayName: 'Interval',
                name: 'filter_interval_conversions',
                type: 'options',
                default: 'today',
                options: [
                    { name: 'All', value: 'all' },
                    { name: 'Custom', value: 'custom' },
                    { name: 'Today', value: 'today' },
                    { name: 'Yesterday', value: 'yesterday' },
                    { name: 'Past 7 Days', value: 'past_7_days' },
                    { name: 'Past 14 Days', value: 'past_14_days' },
                    { name: 'Past 30 Days', value: 'past_30_days' },
                    { name: 'This Month', value: 'this_month' },
                    { name: 'Last Month', value: 'last_month' }
                ],
                description: 'Filter by time interval',
                displayOptions: {
                    show: {
                        operation: ['get-conversions']
                    }
                }
            },
            {
                displayName: 'Start Date',
                name: 'filter_start_date',
                type: 'dateTime',
                default: '',
                description: 'Start date for custom date range filter',
                displayOptions: {
                    show: {
                        operation: ['get-conversions'],
                        filter_interval_conversions: ['custom']
                    }
                }
            },
            {
                displayName: 'End Date',
                name: 'filter_end_date',
                type: 'dateTime',
                default: '',
                description: 'End date for custom date range filter',
                displayOptions: {
                    show: {
                        operation: ['get-conversions'],
                        filter_interval_conversions: ['custom']
                    }
                }
            },
            {
                displayName: 'Sort Field',
                name: 'sort_field',
                type: 'string',
                default: '',
                description: 'Field to sort by',
                displayOptions: {
                    show: {
                        operation: ['get-conversions']
                    }
                }
            },
            {
                displayName: 'Sort Order',
                name: 'sort_order',
                type: 'options',
                options: [
                    { name: 'Ascending', value: 'asc' },
                    { name: 'Descending', value: 'desc' }
                ],
                default: 'asc',
                description: 'Sort order',
                displayOptions: {
                    show: {
                        operation: ['get-conversions']
                    }
                }
            },
            {
                displayName: 'Engage Rate',
                name: 'engage',
                type: 'number',
                default: '',
                description: 'The new Engage Rate',
                displayOptions: {
                    show: {
                        operation: ['edit-options']
                    }
                }
            },
            {
                displayName: 'Bid/Cost',
                name: 'bid',
                type: 'number',
                default: '',
                description: 'The new Bid/Cost',
                displayOptions: {
                    show: {
                        operation: ['edit-options']
                    }
                }
            },
            {
                displayName: 'Priority',
                name: 'priority',
                type: 'number',
                default: '',
                description: 'The new campaign Priority',
                displayOptions: {
                    show: {
                        operation: ['edit-options']
                    }
                }
            },
            {
                displayName: 'Page ID',
                name: 'page_id',
                type: 'string',
                default: '',
                required: true,
                description: 'The page ID of the page to edit from the campaign',
                displayOptions: {
                    show: {
                        operation: ['edit-page']
                    }
                }
            },
            {
                displayName: 'Name',
                name: 'name',
                type: 'string',
                default: '',
                description: 'The page name',
                displayOptions: {
                    show: {
                        operation: ['edit-page']
                    }
                }
            },
            {
                displayName: 'URL',
                name: 'url',
                type: 'string',
                default: '',
                description: 'The complete landing page URL (should start with http:// or https://)',
                displayOptions: {
                    show: {
                        operation: ['edit-page']
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
                        operation: ['edit-page']
                    }
                }
            },
            {
                displayName: 'Share',
                name: 'share',
                type: 'number',
                default: '',
                description: 'The share percentage of the page',
                displayOptions: {
                    show: {
                        operation: ['edit-page']
                    }
                }
            },
            {
                displayName: 'Level',
                name: 'level',
                type: 'number',
                default: '',
                description: 'The level for the page, only if you want to move the landing page on another level',
                displayOptions: {
                    show: {
                        operation: ['edit-page']
                    }
                }
            },
            {
                displayName: 'Source',
                name: 'source',
                type: 'string',
                default: '',
                description: 'The offer source, should be one of the available Offer Sources in your CPV Lab Pro instance',
                displayOptions: {
                    show: {
                        operation: ['edit-page']
                    }
                }
            },
            {
                displayName: 'Payout',
                name: 'payout',
                type: 'number',
                default: '',
                description: 'The payout (revenue) of the offer',
                displayOptions: {
                    show: {
                        operation: ['edit-page']
                    }
                }
            },
            {
                displayName: 'Path ID',
                name: 'path_id',
                type: 'number',
                default: '',
                description: 'The path ID for the landing page, only if you want to move the landing page or offer in a new path',
                displayOptions: {
                    show: {
                        operation: ['edit-page']
                    }
                }
            },
            {
                displayName: 'New Page ID',
                name: 'new_page_id',
                type: 'number',
                default: '',
                description: 'The new give Landing Page or Offer ID, only if you want to change the existing ID',
                displayOptions: {
                    show: {
                        operation: ['edit-page']
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

                const operation = this.getNodeParameter('operation', i, 'get-campaigns') as string;

                let apiUrl: string = '';
                let method: string = 'GET';
                let qs: any = {};
                let body: any = {};
                let response: any;

                if (operation === 'get-campaigns') {
                    // Get parameters for Get Campaigns operation.

                    const fields = this.getNodeParameter('fields', i, []) as Array<string>;
                    const filterCampaignName = this.getNodeParameter('filter_campaign_name', i, '') as string;
                    const filterSourceName = this.getNodeParameter('filter_source_name', i, '') as string;
                    const filterGroupName = this.getNodeParameter('filter_group_name', i, '') as string;
                    const filterStatus = this.getNodeParameter('filter_status', i, 'all') as string;
                    const filterCampaignType = this.getNodeParameter('filter_campaign_type', i, 'all') as string;
                    const filterInterval = this.getNodeParameter('filter_interval_campaigns', i, 'all') as string;

                    // Build query parameters based on user input.

                    if (fields && Array.isArray(fields) && fields.length)
                        qs.fields = fields;

                    const filter: any = {};

                    if (filterCampaignName)
                        filter.campaign_name = filterCampaignName;

                    if (filterSourceName)
                        filter.source_name = filterSourceName;

                    if (filterGroupName)
                        filter.group_name = filterGroupName;

                    if (filterStatus !== 'all')
                        filter.status = filterStatus;

                    if (filterCampaignType !== 'all')
                        filter.campaign_type = filterCampaignType;

                    if (filterInterval !== 'all')
                        filter.interval = filterInterval;

                    if (Object.keys(filter).length)
                        qs.filter = filter;

                    apiUrl = `${baseUrl}/api/v2/campaigns/`;
                    method = 'GET';
                } else if (operation === 'get-conversions') {
                    // Get parameters for Get Conversions operation.

                    const campaignId = this.getNodeParameter('campaign_id_conversions', i, '') as string;
                    const fields = this.getNodeParameter('fields', i, []) as Array<string>;
                    const filterInterval = this.getNodeParameter('filter_interval_conversions', i, 'today') as string;
                    const filterStartDate = this.getNodeParameter('filter_start_date', i, '') as string;
                    const filterEndDate = this.getNodeParameter('filter_end_date', i, '') as string;
                    const sortField = this.getNodeParameter('sort_field', i, '') as string;
                    const sortOrder = this.getNodeParameter('sort_order', i, 'asc') as string;

                    // Build query parameters based on user input.

                    if (fields && Array.isArray(fields) && fields.length)
                        qs.fields = fields;

                    const filter: any = {};

                    filter.interval = filterInterval;

                    if (filterInterval === 'custom') {
                        if (filterStartDate)
                            filter.start_date = filterStartDate;

                        if (filterEndDate)
                            filter.end_date = filterEndDate;
                    }

                    if (Object.keys(filter).length)
                        qs.filter = filter;

                    if (sortField) {
                        const sort: any = {};

                        if (sortField)
                            sort.field = sortField;

                        if (sortOrder)
                            sort.order = sortOrder;

                        qs.sort = sort;
                    }

                    apiUrl = `${baseUrl}/api/v2/campaigns/${campaignId}/conversions`;
                    method = 'GET';
                } else if (operation === 'edit-options') {
                    // Get parameters for Edit Options operation.

                    const campaignId = this.getNodeParameter('campaign_id', i, '') as string;
                    const engage = this.getNodeParameter('engage', i, '') as string;
                    const bid = this.getNodeParameter('bid', i, '') as string;
                    const priority = this.getNodeParameter('priority', i, '') as string;

                    // Build request body

                    if (engage !== '')
                        body.engage = engage;

                    if (bid !== '')
                        body.bid = bid;

                    if (priority !== '')
                        body.priority = priority;

                    apiUrl = `${baseUrl}/api/v2/campaigns/${campaignId}/options`;
                    method = 'PUT';
                } else if (operation === 'edit-page') {
                    // Get parameters for Edit Page operation.

                    const campaignId = this.getNodeParameter('campaign_id', i, '') as string;
                    const pageId = this.getNodeParameter('page_id', i, '') as string;
                    const name = this.getNodeParameter('name', i, '') as string;
                    const url = this.getNodeParameter('url', i, '') as string;
                    const status = this.getNodeParameter('status', i, '') as string;
                    const share = this.getNodeParameter('share', i, '') as string;
                    const level = this.getNodeParameter('level', i, '') as string;
                    const source = this.getNodeParameter('source', i, '') as string;
                    const payout = this.getNodeParameter('payout', i, '') as string;
                    const pathId = this.getNodeParameter('path_id', i, '') as string;
                    const newPageId = this.getNodeParameter('new_page_id', i, '') as string;

                    // Build request body

                    if (name !== '')
                        body.name = name;

                    if (url !== '')
                        body.url = url;

                    if (status !== '')
                        body.status = status;

                    if (share !== '')
                        body.share = share;

                    if (level !== '')
                        body.level = level;

                    if (source !== '')
                        body.source = source;

                    if (payout !== '')
                        body.payout = payout;

                    if (pathId !== '')
                        body.path_id = pathId;

                    if (newPageId !== '')
                        body.new_page_id = newPageId;

                    apiUrl = `${baseUrl}/api/v2/campaigns/${campaignId}/pages/${pageId}`;
                    method = 'PUT';
                }

                // Make the HTTP request to the CpvLabPro API.

                const requestOptions: any = {
                    method: method,
                    url: apiUrl,
                    headers: {
                        'API-Key': apiKey
                    },
                    json: true
                };

                if (method === 'GET' && Object.keys(qs).length > 0)
                    requestOptions.qs = qs;
                else if (method === 'PUT' && Object.keys(body).length > 0) {
                    requestOptions.headers['Content-Type'] = 'application/json';
                    requestOptions.body = body;
                }

                response = await this.helpers.httpRequest(requestOptions);

                // Process the response and add it to the return data.

                if (Array.isArray(response)) {
                    for (const item of response)
                        returnData.push({ json: item } as INodeExecutionData);
                } else
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
