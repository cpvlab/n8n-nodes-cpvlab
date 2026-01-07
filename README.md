# n8n-nodes-cpvlab

[![npm version](https://badge.fury.io/js/n8n-nodes-cpvlab.svg)](https://badge.fury.io/js/n8n-nodes-cpvlab)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-cpvlab.svg)](https://www.npmjs.com/package/n8n-nodes-cpvlab)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

n8n community nodes for integrating CPV Lab Pro API with your n8n workflows.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Credentials](#credentials)
- [Nodes](#nodes)
  - [Mnanage Campaigns](#manage-campaigns)
  - [Manage Stats](#manage-stats)
  - [Manage Landing Pages](#manage-landing-pages)
  - [Manage Offers](#manage-offers)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Changelog](#changelog)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)
- [Repository Info](#repository-info)

## Overview

This package provides custom n8n nodes for integrating with CPV Lab Pro, a powerful and affordable Ad and Affiliate Tracker that optimizes your campaigns, enhances conversions, and increases ROI.

**Package Name:** n8n-nodes-cpvlab  
**Version:** 1.0.0  
**Author:** UptechVision Solutions  
**Homepage:** [https://cpvone.com](https://cpvone.com)

### What is CPV Lab Pro?

CPV Lab Pro is a comprehensive tracking solution designed for affiliate marketers and digital advertisers. It provides detailed analytics, campaign management, and traffic source integration to help optimize advertising spend and maximize returns.

## Installation

### From NPM

```bash
npm install n8n-nodes-cpvlab
```

### From GitHub

```bash
npm install github:radu-uptech/n8n-nodes-cpvlab
```

### In n8n

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Search for `n8n-nodes-cpvlab`
4. Click **Install**

For detailed installation instructions, see the [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/installation/).

## Credentials

### CPV Lab Pro API

Before using these nodes, you need to configure credentials for your CPV Lab Pro instance.

#### Authentication Setup

**Credential Type:** CPV Lab Pro API

**Required Fields:**

| Field        | Description                                                                        | Required | Type              |
| ------------ | ---------------------------------------------------------------------------------- | -------- | ----------------- |
| **Base URL** | The base URL of your CPV Lab Pro API instance (e.g., `https://cpvlab.example.com`) | Yes      | String            |
| **API Key**  | Your CPV Lab Pro API authentication key                                            | Yes      | String (Password) |

#### How to Get Your API Key

1. Log in to your CPV Lab Pro account
2. Navigate to **Settings** → **API**
3. Copy your API Key
4. For Base URL, use your CPV Lab Pro instance URL

#### Creating Credentials in n8n

1. Click on your name in the bottom left
2. Select **Credentials**
3. Click **New**
4. Search for **CPV Lab Pro API**
5. Enter your **Base URL** and **API Key**
6. Click **Save**

## Nodes

### Manage Campaigns

Retrieve campaigns and conversions from your CPV Lab Pro instance. Edit campaign options and manage campaign pages with advanced filtering and field selection options.

#### Node Name

- **Display Name:** Manage Campaigns
- **Node Type:** Organization
- **Version:** 1

#### Inputs

- **Input Type:** Main (accepts incoming data from previous nodes)

#### Outputs

- **Output Type:** Main (returns campaign data)

#### Configuration

**Operation**

| Operation Name              | Value             | Description                                   |
| --------------------------- | ----------------- | --------------------------------------------- |
| **Get Campaigns**           | `get-campaigns`   | Retrieve campaigns with filtering and sorting |
| **Get Conversions**         | `get-conversions` | Retrieve conversion data for campaigns        |
| **Edit Campaign Options**   | `edit-options`    | Modify campaign settings and options          |
| **Edit Page From Campaign** | `edit-page`       | Edit pages associated with a campaign         |

**Authentication**

This node uses CPV Lab Pro API credentials configured in your n8n instance. Set up your credentials in **Settings** → **Credentials** before using this node.

#### Get Campaigns

| Field             | Description                                                                   | Required | Type                                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Fields**        | Columns to include in the response (if not provided, all fields are returned) | No       | Array of Strings                                                                                                              |
| **Campaign Name** | Filter by campaign name (case-insensitive, partial match)                     | No       | String                                                                                                                        |
| **Source Name**   | Filter by traffic source name (case-insensitive, partial match)               | No       | String                                                                                                                        |
| **Group Name**    | Filter by group name (case-insensitive, partial match)                        | No       | String                                                                                                                        |
| **Status**        | Filter by campaign status                                                     | No       | Options: `all` \| `active` \| `inactive`                                                                                      |
| **Campaign Type** | Filter by campaign type                                                       | No       | Options: `all` \| `lc` \| `mp` \| `lps` \| `mo` \| `dllp` \| `email`                                                          |
| **Interval**      | Filter by time interval                                                       | No       | Options: `all` \| `today` \| `yesterday` \| `past_7_days` \| `past_14_days` \| `past_30_days` \| `this_month` \| `last_month` |

#### Get Conversions

| Field           | Description                                                                   | Required | Type             |
| --------------- | ----------------------------------------------------------------------------- | -------- | ---------------- |
| **Campaign ID** | The ID of the campaign to retrieve conversions                                | Yes      | String           |
| **Fields**      | Columns to include in the response (if not provided, all fields are returned) | No       | Array of Strings |

#### Edit Campaign Options

| Field                    | Description                               | Required | Type                            |
| ------------------------ | ----------------------------------------- | -------- | ------------------------------- |
| **Campaign ID**          | The ID of the campaign to edit            | Yes      | String                          |
| **Campaign Name**        | Update the campaign name                  | No       | String                          |
| **Status**               | Update campaign status                    | No       | Options: `active` \| `inactive` |
| **Daily Cap**            | Set daily spending cap                    | No       | Number                          |
| **Default Landing Page** | Set default landing page for the campaign | No       | String (Page ID)                |
| **Default Offer**        | Set default offer for the campaign        | No       | String (Offer ID)               |
| **Notes**                | Update campaign notes/description         | No       | String                          |

#### Edit Page From Campaign

| Field           | Description                        | Required | Type                            |
| --------------- | ---------------------------------- | -------- | ------------------------------- |
| **Campaign ID** | The ID of the campaign             | Yes      | String                          |
| **Page ID**     | The ID of the page to edit         | Yes      | String                          |
| **Status**      | Update page status in the campaign | No       | Options: `active` \| `inactive` |
| **Name**        | Update the page name               | No       | String                          |
| **URL**         | Update the page URL                | No       | String                          |
| **Notes**       | Update notes for the page          | No       | String                          |

#### Output Format

The node returns an array of campaign objects. Each campaign object contains the fields requested (or all available fields if not specified).

#### API Endpoint

- **Method:** GET/POST/PUT
- **Endpoints:**
  - `/api/v2/campaigns/` - Get campaigns
  - `/api/v2/campaigns/{id}/conversions/` - Get conversions
  - `/api/v2/campaigns/{id}/edit/` - Edit campaign options
  - `/api/v2/campaigns/{id}/pages/edit/` - Edit campaign pages

---

### Manage Stats

Retrieve detailed statistics for a specific campaign from your CPV Lab Pro instance.

#### Node Name

- **Display Name:** Manage Stats
- **Node Type:** Organization
- **Version:** 1

#### Inputs

- **Input Type:** Main (accepts incoming data from previous nodes)

#### Outputs

- **Output Type:** Main (returns statistics data)

#### Configuration

**Operation**

| Operation Name            | Value               | Description                              |
| ------------------------- | ------------------- | ---------------------------------------- |
| **Get Target Stats**      | `target-stats`      | Retrieve target/audience statistics      |
| **Get Ad Stats**          | `ad-stats`          | Retrieve advertisement statistics        |
| **Get Landing Stats**     | `landing-stats`     | Retrieve landing page statistics         |
| **Get Offer Stats**       | `offer-stats`       | Retrieve offer statistics                |
| **Get Performance Stats** | `performance-stats` | Retrieve performance statistics          |
| **Get Visitor Stats**     | `visitor-stats`     | Retrieve visitor statistics              |
| **Get Sub ID Stats**      | `subid-lookup`      | Look up statistics for a specific Sub ID |

**Authentication**

This node uses CPV Lab Pro API credentials configured in your n8n instance. Set up your credentials in **Settings** → **Credentials** before using this node.

#### Get Target Stats

| Field             | Description                             | Required | Type                                                                                                            |
| ----------------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| **Campaign ID**   | The ID of the campaign to fetch stats   | Yes      | String                                                                                                          |
| **Quick View ID** | Quick view identifier for filtering     | No       | Number                                                                                                          |
| **Group Fields**  | Fields to group the results by          | No       | Array of Strings                                                                                                |
| **Records**       | Number of records to return             | No       | Options: 0, 50, 100, 200, 500, 1000, 2000, 5000                                                                 |
| **Interval**      | Time interval for the statistics        | No       | Options: `today`, `yesterday`, `past_7_days`, `past_14_days`, `past_30_days`, `this_month`, `last_month`, `all` |
| **Sort Field**    | Field to sort the results by            | No       | String                                                                                                          |
| **Sort Order**    | Order to sort the results (default asc) | No       | Options: `asc` (Ascending) \| `desc` (Descending)                                                               |

#### Get Ad Stats

| Field           | Description                             | Required | Type                                                                                                            |
| --------------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| **Campaign ID** | The ID of the campaign to fetch stats   | Yes      | String                                                                                                          |
| **Records**     | Number of records to return             | No       | Options: 0, 50, 100, 200, 500, 1000, 2000, 5000                                                                 |
| **Interval**    | Time interval for the statistics        | No       | Options: `today`, `yesterday`, `past_7_days`, `past_14_days`, `past_30_days`, `this_month`, `last_month`, `all` |
| **Sort Field**  | Field to sort the results by            | No       | String                                                                                                          |
| **Sort Order**  | Order to sort the results (default asc) | No       | Options: `asc` (Ascending) \| `desc` (Descending)                                                               |

#### Get Landing Stats

| Field           | Description                             | Required | Type                                                                                                            |
| --------------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| **Campaign ID** | The ID of the campaign to fetch stats   | Yes      | String                                                                                                          |
| **Records**     | Number of records to return             | No       | Options: 0, 50, 100, 200, 500, 1000, 2000, 5000                                                                 |
| **Interval**    | Time interval for the statistics        | No       | Options: `today`, `yesterday`, `past_7_days`, `past_14_days`, `past_30_days`, `this_month`, `last_month`, `all` |
| **Sort Field**  | Field to sort the results by            | No       | String                                                                                                          |
| **Sort Order**  | Order to sort the results (default asc) | No       | Options: `asc` (Ascending) \| `desc` (Descending)                                                               |

#### Get Offer Stats

| Field           | Description                             | Required | Type                                                                                                            |
| --------------- | --------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| **Campaign ID** | The ID of the campaign to fetch stats   | Yes      | String                                                                                                          |
| **Records**     | Number of records to return             | No       | Options: 0, 50, 100, 200, 500, 1000, 2000, 5000                                                                 |
| **Interval**    | Time interval for the statistics        | No       | Options: `today`, `yesterday`, `past_7_days`, `past_14_days`, `past_30_days`, `this_month`, `last_month`, `all` |
| **Sort Field**  | Field to sort the results by            | No       | String                                                                                                          |
| **Sort Order**  | Order to sort the results (default asc) | No       | Options: `asc` (Ascending) \| `desc` (Descending)                                                               |

#### Get Performance Stats

| Field           | Description                           | Required | Type                                                                                                            |
| --------------- | ------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| **Campaign ID** | The ID of the campaign to fetch stats | Yes      | String                                                                                                          |
| **Interval**    | Time interval for the statistics      | No       | Options: `today`, `yesterday`, `past_7_days`, `past_14_days`, `past_30_days`, `this_month`, `last_month`, `all` |

#### Get Visitor Stats

| Field            | Description                                                                   | Required | Type                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| **Campaign IDs** | Campaign IDs to fetch visitor stats for                                       | Yes      | Array of Strings                                                                                                |
| **Fields**       | Columns to include in the response (if not provided, all fields are returned) | No       | Array of Strings                                                                                                |
| **Records**      | Number of records to return                                                   | No       | Options: 0, 50, 100, 200, 500, 1000, 2000, 5000                                                                 |
| **Interval**     | Time interval for the statistics                                              | No       | Options: `today`, `yesterday`, `past_7_days`, `past_14_days`, `past_30_days`, `this_month`, `last_month`, `all` |
| **Sort Field**   | Field to sort the results by                                                  | No       | String                                                                                                          |
| **Sort Order**   | Order to sort the results (default asc)                                       | No       | Options: `asc` (Ascending) \| `desc` (Descending)                                                               |

#### Get Sub ID Stats

| Field        | Description                      | Required | Type                                                                                                            |
| ------------ | -------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| **Sub ID**   | The sub ID value                 | Yes      | String                                                                                                          |
| **Interval** | Time interval for the statistics | No       | Options: `today`, `yesterday`, `past_7_days`, `past_14_days`, `past_30_days`, `this_month`, `last_month`, `all` |

#### Output Format

The node returns an array of statistics objects based on the selected stat type. Each object contains the fields requested (or all available fields if not specified).

#### API Endpoints

- **Method:** GET
- **Endpoints:**
  - `/api/v2/campaigns/{id}/stats/target-stats/` - Target stats
  - `/api/v2/campaigns/{id}/stats/ad-stats/` - Ad stats
  - `/api/v2/campaigns/{id}/stats/landing-stats/` - Landing stats
  - `/api/v2/campaigns/{id}/stats/offer-stats/` - Offer stats
  - `/api/v2/campaigns/{id}/stats/performance-stats/` - Performance stats
  - `/api/v2/campaigns/{id}/stats/visitor-stats/` - Visitor stats
  - `/api/v2/subid-lookup/` - Sub ID lookup

---

### Manage Landing Pages

Add, edit, or assign landing pages to campaigns in your CPV Lab Pro instance.

#### Node Name

- **Display Name:** Manage Landing Pages
- **Node Type:** Organization
- **Version:** 1

#### Inputs

- **Input Type:** Main (accepts incoming data from previous nodes)

#### Outputs

- **Output Type:** Main (returns landing page data)

#### Configuration

**Operation**

| Operation Name                   | Value               | Description                         |
| -------------------------------- | ------------------- | ----------------------------------- |
| **Add Landing Page**             | `add-landing-page`  | Create a new landing page           |
| **Edit Landing Page**            | `edit-landing-page` | Modify an existing landing page     |
| **Add Landing Page To Campaign** | `add-to-campaign`   | Assign a landing page to a campaign |

**Authentication**

This node uses CPV Lab Pro API credentials configured in your n8n instance. Set up your credentials in **Settings** → **Credentials** before using this node.

#### Add Landing Page

| Field         | Description                                                           | Required | Type                            |
| ------------- | --------------------------------------------------------------------- | -------- | ------------------------------- |
| **Name**      | The landing page name                                                 | Yes      | String                          |
| **URL**       | The complete landing page URL (should start with http:// or https://) | Yes      | String                          |
| **Status**    | Whether the page is active or inactive                                | No       | Options: `active` \| `inactive` |
| **Notes**     | Details or description of the landing page                            | No       | String                          |
| **Group**     | Assign to an existing group                                           | No       | String                          |
| **New Group** | Create a new group for this landing page                              | No       | String                          |

#### Edit Landing Page

| Field       | Description                                | Required | Type                            |
| ----------- | ------------------------------------------ | -------- | ------------------------------- |
| **Page ID** | The landing page ID                        | Yes      | String                          |
| **Name**    | The landing page name                      | No       | String                          |
| **URL**     | The landing page URL                       | No       | String                          |
| **Status**  | Whether the page is active or inactive     | No       | Options: `active` \| `inactive` |
| **Notes**   | Details or description of the landing page | No       | String                          |
| **Group**   | Assign to an existing group                | No       | String                          |

#### Add Landing Page To Campaign

| Field           | Description                           | Required | Type   |
| --------------- | ------------------------------------- | -------- | ------ |
| **Page ID**     | The landing page ID                   | Yes      | String |
| **Campaign ID** | The campaign ID to assign the page to | Yes      | String |

#### API Endpoints

- **Method:** POST/PUT/GET
- **Endpoints:**
  - `/api/v2/landing-pages/` - Add landing page
  - `/api/v2/landing-pages/{id}/` - Edit landing page
  - `/api/v2/campaigns/{id}/landing-pages/add/` - Add to campaign

---

### Manage Offers

Add, edit, or assign offers (affiliate products) to campaigns in your CPV Lab Pro instance.

#### Node Name

- **Display Name:** Manage Offers
- **Node Type:** Organization
- **Version:** 1

#### Inputs

- **Input Type:** Main (accepts incoming data from previous nodes)

#### Outputs

- **Output Type:** Main (returns offer data)

#### Configuration

**Operation**

| Operation Name            | Value             | Description                   |
| ------------------------- | ----------------- | ----------------------------- |
| **Add Offer**             | `add-offer`       | Create a new offer            |
| **Edit Offer**            | `edit-offer`      | Modify an existing offer      |
| **Add Offer To Campaign** | `add-to-campaign` | Assign an offer to a campaign |

**Authentication**

This node uses CPV Lab Pro API credentials configured in your n8n instance. Set up your credentials in **Settings** → **Credentials** before using this node.

#### Add Offer

| Field         | Description                                                     | Required | Type                            |
| ------------- | --------------------------------------------------------------- | -------- | ------------------------------- |
| **Name**      | The offer name                                                  | Yes      | String                          |
| **URL**       | The complete offer URL (should start with http:// or https://)  | Yes      | String                          |
| **Source**    | Offer source (affiliate network) that must exist in CPV Lab Pro | Yes      | String                          |
| **Payout**    | Offer payout (revenue)                                          | Yes      | Number                          |
| **Status**    | Whether the offer is active or inactive                         | No       | Options: `active` \| `inactive` |
| **Notes**     | Details or description of the offer                             | No       | String                          |
| **Group**     | Assign to an existing group                                     | No       | String                          |
| **New Group** | Create a new group for this offer                               | No       | String                          |

#### Edit Offer

| Field        | Description                             | Required | Type                            |
| ------------ | --------------------------------------- | -------- | ------------------------------- |
| **Offer ID** | The offer ID                            | Yes      | String                          |
| **Name**     | The offer name                          | No       | String                          |
| **URL**      | The offer URL                           | No       | String                          |
| **Source**   | Offer source (affiliate network)        | No       | String                          |
| **Payout**   | Offer payout (revenue)                  | No       | Number                          |
| **Status**   | Whether the offer is active or inactive | No       | Options: `active` \| `inactive` |
| **Notes**    | Details or description of the offer     | No       | String                          |
| **Group**    | Assign to an existing group             | No       | String                          |

#### Add Offer To Campaign

| Field           | Description                        | Required | Type   |
| --------------- | ---------------------------------- | -------- | ------ |
| **Offer ID**    | The offer ID                       | Yes      | String |
| **Campaign ID** | The campaign ID to assign offer to | Yes      | String |

#### API Endpoints

- **Method:** POST/PUT/GET
- **Endpoints:**
  - `/api/v2/offers/` - Add offer
  - `/api/v2/offers/{id}/` - Edit offer
  - `/api/v2/campaigns/{id}/offers/add/` - Add to campaign

---

## Features

- **Credentials-Based Authentication:** Secure API authentication through n8n credentials
- **Campaign Management:** Get campaigns, conversions, and edit campaign options and pages
- **Advanced Statistics:** Access various statistical views of your campaign data
- **Landing Page Management:** Add, edit, and assign landing pages to campaigns
- **Offer Management:** Add, edit, and assign offers to campaigns with payout tracking
- **Advanced Sorting:** Sort statistics by any field in ascending or descending order
- **Pagination Support:** Control the number of records returned
- **Field Selection:** Choose specific fields to retrieve or get all available data
- **Advanced Filtering:** Partial matching and case-insensitive filtering
- **Error Handling:** Robust error handling with detailed error messages

---

## API Documentation

### Base Requirements

- **API Key:** Required for all API calls
- **Base URL:** Your CPV Lab Pro instance URL
- **Authentication Header:** `API-Key: {your_api_key}`

### Rate Limiting

Please refer to your CPV Lab Pro API documentation for rate limiting policies and best practices.

### Response Codes

| Code | Description                           |
| ---- | ------------------------------------- |
| 200  | Successful request                    |
| 400  | Bad request (invalid parameters)      |
| 401  | Unauthorized (invalid API key)        |
| 404  | Not found (campaign ID doesn't exist) |
| 500  | Internal server error                 |

### Error Handling

The nodes include comprehensive error handling:

- **Invalid Credentials:** Clear error message when authentication fails
- **Missing Required Parameters:** Validation ensures all required fields are provided
- **API Errors:** Full error details from the CPV Lab Pro API are returned
- **Network Errors:** Handled gracefully with retry capability

---

## Project Structure

```
n8n-nodes-cpvlab/
├── credentials/
│   └── CpvLabProApi.credentials.ts      # API credentials definition
├── nodes/
│   ├── ManageCampaigns/
│   │   ├── ManageCampaigns.node.ts      # Campaign management node
│   │   └── ManageCampaigns.node.json    # Node metadata
│   ├── ManageLandingPages/
│   │   ├── ManageLandingPages.node.ts    # Landing page management node
│   │   └── ManageLandingPages.node.json  # Node metadata
│   ├── ManageOffers/
│   │   ├── ManageOffers.node.ts          # Offer management node
│   │   └── ManageOffers.node.json        # Node metadata
│   └── ManageStats/
│       ├── ManageStats.node.ts          # Statistics retrieval node
│       └── ManageStats.node.json        # Node metadata
├── icons/
│   ├── cpvlabpro.svg                    # Light theme icon
│   └── cpvlabpro.dark.svg               # Dark theme icon
├── dist/                                # Compiled JavaScript output
├── package.json                         # Package configuration
├── tsconfig.json                        # TypeScript configuration
├── eslint.config.mjs                    # ESLint configuration
├── .prettierrc.js                       # Code formatting configuration
└── README.md                            # This file
```

---

## Changelog

### Version 1.0.0 (Initial Release)

- Manage Campaigns node with Get Campaigns, Get Conversions, Edit Campaign Options, and Edit Page operations
- Manage Landing Pages node with Add, Edit, and Add to Campaign operations
- Manage Offers node with Add, Edit, and Add to Campaign operations
- Manage Stats node with Target Stats, Ad Stats, Landing Stats, Offer Stats, Performance Stats, Visitor Stats and Sub ID Stats

---

## FAQ

**Q: How do I get my API key?**  
A: Log into your CPV Lab Pro account, navigate to Settings → API, and copy your API key.

**Q: Do I need to set up credentials before using these nodes?**  
A: Yes, you must configure your CPV Lab Pro API credentials in n8n through **Settings** → **Credentials** before using these nodes.

**Q: What are the rate limits?**  
A: Please check your CPV Lab Pro account settings or contact support for rate limit information.

**Q: How do I troubleshoot API errors?**  
A: Check your API key and Base URL are correct, ensure your account has access to the data you're querying, and review the CPV Lab Pro API documentation.

**Q: Can I filter campaigns by multiple criteria?**  
A: Yes, you can combine multiple filters in the Get Campaigns node (e.g., status AND source_name AND interval).

**Q: How do I schedule recurring tasks with these nodes?**  
A: Use the n8n Schedule Trigger node to run your workflow at specific times, then use these nodes to fetch and process data.

---

## Support

- **Documentation:** https://cpvone.com
- **Email:** support@cpvone.com
- **Issues:** GitHub Issues on the repository
- **n8n Community:** n8n Community Forum

---

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

## Repository Info

- **Repository:** https://github.com/cpvlab/n8n-nodes-cpvlab
- **Author:** UptechVision Solutions
- **Email:** support@cpvone.com

---

**Last Updated:** January 7, 2026  
**Package Version:** 1.0.0
