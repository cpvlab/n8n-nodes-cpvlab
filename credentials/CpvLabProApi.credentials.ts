import type { ICredentialType, INodeProperties, Icon } from 'n8n-workflow';

export class CpvLabProApi implements ICredentialType {
    name = 'cpvLabProApi';
    displayName = 'CpvLabPro API';
    icon: Icon = {
        light: 'file:../icons/cpvlabpro.svg',
        dark: 'file:../icons/cpvlabpro.dark.svg'
    };
    properties: Array<INodeProperties> = [
        {
            displayName: 'Base URL',
            name: 'base_url',
            type: 'string',
            default: '',
            required: true,
            description: 'The base URL of the CpvLabPro API'
        },
        {
            displayName: 'API Key',
            name: 'api_key',
            type: 'string',
            default: '',
            required: true,
            typeOptions: {
                password: true
            },
            description: 'The API key for CpvLabPro API'
        }
    ];
}
