import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class ManageStats implements INodeType {
    public description: INodeTypeDescription = {
        name: 'ManageStats',
        displayName: 'Manage Stats',
        icon: {
            light: 'file:../../icons/cpvlabpro.svg',
            dark: 'file:../../icons/cpvlabpro.dark.svg'
        },
        group: ['organization'],
        version: 1,
        description: 'Retrieve various stats for a given campaign',
        defaults: {
            name: 'Manage Stats'
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
                    { name: 'Get Target Stats', value: 'target-stats' },
                    { name: 'Get Ad Stats', value: 'ad-stats' },
                    { name: 'Get Landing Stats', value: 'landing-stats' },
                    { name: 'Get Offer Stats', value: 'offer-stats' },
                    { name: 'Get Performance Stats', value: 'performance-stats' },
                    { name: 'Get Visitor Stats', value: 'visitor-stats' },
                    { name: 'Get Sub ID Stats', value: 'subid-lookup' }

                ],
                default: 'target-stats',
                required: true,
                description: 'The type of stats to retrieve'
            },
            {
                displayName: 'Campaign ID',
                name: 'campaign_id',
                type: 'string',
                default: '',
                required: true,
                description: 'The campaign id to fetch stats for',
                displayOptions: {
                    show: {
                        operation: ['target-stats', 'ad-stats', 'landing-stats', 'offer-stats', 'performance-stats']
                    }
                }
            },
            {
                displayName: 'Campaign IDs',
                name: 'campaign_ids',
                type: 'string',
                default: [],
                typeOptions: {
                    multipleValues: true
                },
                required: false,
                description: 'Campaign IDs to fetch visitor stats for',
                displayOptions: {
                    show: {
                        operation: ['visitor-stats']
                    }
                }
            },
            {
                displayName: 'Sub ID',
                name: 'sub_id',
                type: 'string',
                default: '',
                required: true,
                description: 'The sub ID to look up',
                displayOptions: {
                    show: {
                        operation: ['subid-lookup']
                    }
                }
            },
            {
                displayName: 'Quick View ID',
                name: 'quick_view_id',
                type: 'number',
                default: 0,
                description: 'Quick view identifier',
                displayOptions: {
                    show: {
                        operation: ['target-stats']
                    }
                }
            },
            {
                displayName: 'Group Fields',
                name: 'group_fields',
                type: 'string',
                default: [],
                typeOptions: {
                    multipleValues: true
                },
                description: 'Fields to group by',
                displayOptions: {
                    show: {
                        operation: ['target-stats']
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
                        operation: ['visitor-stats']
                    }
                }
            },
            {
                displayName: 'Records',
                name: 'records',
                type: 'options',
                options: [
                    { name: '0', value: 0 },
                    { name: '50', value: 50 },
                    { name: '100', value: 100 },
                    { name: '200', value: 200 },
                    { name: '500', value: 500 },
                    { name: '1000', value: 1000 },
                    { name: '2000', value: 2000 },
                    { name: '5000', value: 5000 }
                ],
                default: 50,
                description: 'Selected number of records',
                displayOptions: {
                    show: {
                        operation: ['target-stats', 'visitor-stats']
                    }
                }
            },
            {
                displayName: 'IP',
                name: 'filter_ip',
                type: 'string',
                default: '',
                description: 'Filter by IP address',
                displayOptions: {
                    show: {
                        operation: ['visitor-stats']
                    }
                }
            },
            {
                displayName: 'Country',
                name: 'filter_country',
                type: 'string',
                default: '',
                description: 'Filter by country code or name',
                displayOptions: {
                    show: {
                        operation: ['visitor-stats']
                    }
                }
            },
            {
                displayName: 'Target',
                name: 'filter_target',
                type: 'string',
                default: '',
                description: 'Filter by target identifier or name',
                displayOptions: {
                    show: {
                        operation: ['visitor-stats']
                    }
                }
            },
            {
                displayName: 'Interval',
                name: 'filter_interval_two',
                type: 'options',
                options: [
                    { name: '24 Hours', value: '24_hours' },
                    { name: 'Today', value: 'today' },
                    { name: 'Yesterday', value: 'yesterday' },
                    { name: 'Past 7 Days', value: 'past_7_days' },
                    { name: 'Past 14 Days', value: 'past_14_days' },
                    { name: 'Past 30 Days', value: 'past_30_days' },
                    { name: 'This Month', value: 'this_month' },
                    { name: 'Last Month', value: 'last_month' }
                ],
                default: '24_hours',
                description: 'Filter by time interval',
                displayOptions: {
                    show: {
                        operation: ['visitor-stats']
                    }
                }
            },
            {
                displayName: 'Interval',
                name: 'filter_interval_one',
                type: 'options',
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
                default: 'today',
                description: 'Filter by time interval',
                displayOptions: {
                    show: {
                        operation: ['target-stats', 'ad-stats', 'landing-stats', 'offer-stats', 'performance-stats']
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
                        operation: ['target-stats', 'ad-stats', 'landing-stats', 'offer-stats', 'performance-stats'],
                        filter_interval_one: ['custom']
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
                        operation: ['target-stats', 'ad-stats', 'landing-stats', 'offer-stats', 'performance-stats'],
                        filter_interval_one: ['custom']
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
                        operation: ['target-stats', 'ad-stats', 'landing-stats', 'offer-stats', 'visitor-stats']
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
                default: 'desc',
                description: 'Sort order',
                displayOptions: {
                    show: {
                        operation: ['target-stats', 'ad-stats', 'landing-stats', 'offer-stats', 'visitor-stats']
                    }
                }
            }
        ]
    };

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

                const campaignId = this.getNodeParameter('campaign_id', i, '') as string;
                const campaignIds = this.getNodeParameter('campaign_ids', i, []) as Array<string>;
                const subId = this.getNodeParameter('sub_id', i, '') as string;
                const operation = this.getNodeParameter('operation', i, 'target-stats') as string;
                const quickViewId = this.getNodeParameter('quick_view_id', i, '') as string;
                const groupFields = this.getNodeParameter('group_fields', i, []) as Array<string>;
                const records = this.getNodeParameter('records', i, 50) as number;
                const filterIp = this.getNodeParameter('filter_ip', i, '') as string;
                const filterCountry = this.getNodeParameter('filter_country', i, '') as string;
                const filterTarget = this.getNodeParameter('filter_target', i, '') as string;
                const filterIntervalOne = this.getNodeParameter('filter_interval_one', i, 'all') as string;
                const filterIntervalTwo = this.getNodeParameter('filter_interval_two', i, '24_hours') as string;
                const filterStartDate = this.getNodeParameter('filter_start_date', i, '') as string;
                const filterEndDate = this.getNodeParameter('filter_end_date', i, '') as string;
                const sortField = this.getNodeParameter('sort_field', i, '') as string;
                const sortOrder = this.getNodeParameter('sort_order', i, 'desc') as string;

                // Build query parameters based on user input.

                let qs: any = {};
                let apiUrl: string;

                if (operation == 'target-stats') {
                    qs.records = records;

                    if (quickViewId)
                        qs.quick_view_id = quickViewId;

                    if (groupFields && groupFields.length > 0)
                        qs.group_fields = groupFields;

                    const filter: any = {};

                    filter.interval = filterIntervalOne;

                    if (filterIntervalOne === 'custom') {
                        if (filterStartDate)
                            filter.start_date = filterStartDate;

                        if (filterEndDate)
                            filter.end_date = filterEndDate;
                    }

                    if (Object.keys(filter).length)
                        qs.filter = filter;

                    if (sortField || sortOrder !== 'desc') {
                        const sort: any = {};

                        if (sortField)
                            sort.field = sortField;

                        if (sortOrder)
                            sort.order = sortOrder;

                        qs.sort = sort;
                    }

                    apiUrl = `${baseUrl}/api/v2/stats/${campaignId}/${operation}`;
                } else if (operation === 'ad-stats' || operation === 'landing-stats' || operation === 'offer-stats') {
                    const filter: any = {};

                    filter.interval = filterIntervalOne;

                    if (filterIntervalOne === 'custom') {
                        if (filterStartDate)
                            filter.start_date = filterStartDate;

                        if (filterEndDate)
                            filter.end_date = filterEndDate;
                    }

                    if (Object.keys(filter).length)
                        qs.filter = filter;

                    if (sortField || sortOrder !== 'desc') {
                        const sort: any = {};

                        if (sortField)
                            sort.field = sortField;

                        if (sortOrder)
                            sort.order = sortOrder;

                        qs.sort = sort;
                    }

                    apiUrl = `${baseUrl}/api/v2/stats/${campaignId}/${operation}`;
                } else if (operation === 'visitor-stats') {
                    qs.campaign_ids = campaignIds;
                    qs.records = records;

                    const filter: any = {};

                    if (filterIp)
                        filter.ip = filterIp;

                    if (filterCountry)
                        filter.country = filterCountry;

                    if (filterTarget)
                        filter.target = filterTarget;

                    filter.interval = filterIntervalTwo;

                    if (Object.keys(filter).length)
                        qs.filter = filter;

                    if (sortField || sortOrder !== 'desc') {
                        const sort: any = {};

                        if (sortField)
                            sort.field = sortField;

                        if (sortOrder)
                            sort.order = sortOrder;

                        qs.sort = sort;
                    }

                    apiUrl = `${baseUrl}/api/v2/stats/visitor-stats`;
                } else if (operation === 'subid-lookup') {
                    apiUrl = `${baseUrl}/api/v2/stats/subid-lookup/${subId}`;
                } else {
                    const filter: any = {};

                    filter.interval = filterIntervalOne;

                    if (filterIntervalOne === 'custom') {
                        if (filterStartDate)
                            filter.start_date = filterStartDate;

                        if (filterEndDate)
                            filter.end_date = filterEndDate;
                    }

                    if (Object.keys(filter).length)
                        qs.filter = filter;

                    apiUrl = `${baseUrl}/api/v2/stats/${campaignId}/${operation}`;
                }

                // Make the HTTP request to the CpvLabPro API.

                const response = await this.helpers.httpRequest({
                    method: 'GET',
                    url: apiUrl,
                    headers: {
                        'API-Key': apiKey
                    },
                    qs: Object.keys(qs).length > 0 ? qs : undefined,
                    json: true
                });

                // Process the response and add it to the return data.

                if (Array.isArray(response)) {
                    for (const item of response)
                        returnData.push({ json: item } as INodeExecutionData);
                } else
                    returnData.push({ json: response } as INodeExecutionData);
            } catch (error) {
                const errorResponse: any = {};
                const errorObj = error as any;

                if (errorObj.response) {
                    let errorData = errorObj.response.data;

                    if (typeof errorData === 'string')
                        errorData = JSON.parse(errorData);

                    if (typeof errorData === 'object' && errorData !== null) {
                        if (errorData.status !== undefined)
                            errorResponse.status = errorData.status;

                        if (errorData.message !== undefined)
                            errorResponse.message = errorData.message;
                    }
                } else if (errorObj.message)
                    errorResponse.message = errorObj.message;

                if (this.continueOnFail()) {
                    returnData.push({ json: errorResponse } as INodeExecutionData);

                    continue;
                }

                if (errorObj.context) {
                    errorObj.context.i = i;

                    throw error;
                }

                throw new NodeOperationError(this.getNode(), error as Error, { itemIndex: i });
            }
        }

        return [returnData];
    }
}
