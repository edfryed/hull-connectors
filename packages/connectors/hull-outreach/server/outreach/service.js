/* @flow */
import type { RawRestApi, EndpointType, RequestType } from "./shared/types";

const _ = require("lodash");

const OAuth2Strategy = require("passport-oauth2");
const { OutreachProspectWrite, OutreachProspectRead, OutreachAccountWrite, OutreachAccountRead, OutreachWebhookWrite } = require("./service-objects");
const { SuperagentApi } = require("./shared/superagent-api");

const oAuthUrl = "https://api.outreach.io";

// What about linking calls?
const service: RawRestApi = {
  initialize: (context, api) => new SuperagentApi(context, api),
  prefix: "https://api.outreach.io/api/v2",
  endpoints: {
    getAccountById: {
      url: "/accounts/${accountId}",
      operation: "get",
      endpointType: "byId",
      returnObj: "body.data",
      output: OutreachAccountRead
    },
    getAccountByDomain: {
      url: "/accounts/${accountDomain}",
      operation: "get",
      endpointType: "byId",
      returnObj: "body.data",
      output: OutreachAccountRead
    },
    getAccountByProperty: {
      url: "/accounts/",
      operation: "get",
      query: "filter[${property}]=${value}",
      endpointType: "byProperty",
      returnObj: "body.data",
      output: OutreachAccountRead
    },
    getAccountsByLastSync: {
      url: "/accounts/",
      operation: "get",
      query: "filter[updatedAt]=${connector.private_settings.lastSync}",
      endpointType: "byLastSync",
      returnObj: "body.data",
      output: OutreachAccountRead
    },
    getAllAccounts: {
      url: "/accounts/",
      operation: "get",
      endpointType: "fetchAll",
      returnObj: "body.data",
      output: OutreachAccountRead
    },
    getAllProspects: {
      url: "/prospects/",
      operation: "get",
      endpointType: "fetchAll",
      returnObj: "body.data",
      output: OutreachProspectRead
    },
    insertAccount: {
      url: "/accounts/",
      operation: "post",
      endpointType: "create",
      returnObj: "body.data",
      input: OutreachAccountWrite,
      output: OutreachAccountRead
    },
    updateAccount: {
      url: "/accounts/${accountId}",
      operation: "patch",
      endpointType: "update",
      returnObj: "body.data",
      input: OutreachAccountWrite,
      output: OutreachAccountRead
    },
    getProspectById: {
      url: "/prospects/${userId}",
      operation: "get",
      endpointType: "byId",
      returnObj: "body.data",
      output: OutreachProspectRead
    },
    getProspectByEmail: {
      url: "/prospects/",
      operation: "get",
      query: "filter[emails]=${userEmail}",
      returnObj: "body.data[0]",
      endpointType: "byProperty",
      output: OutreachProspectRead
    },
    getProspectsByProperty: {
      url: "/prospects/",
      operation: "get",
      query: "filter[${property}]=${value}",
      returnObj: "body.data",
      endpointType: "byProperty",
      output: OutreachProspectRead
    },
    getProspectsByLastSync: {
      url: "/prospects/",
      operation: "get",
      returnObj: "body.data",
      query: "filter[updatedAt]=${lastSync}",
      endpointType: "byLastSync",
      output: OutreachProspectRead
    },
    insertProspect: {
      url: "/prospects/",
      operation: "post",
      endpointType: "create",
      returnObj: "body.data",
      input: OutreachProspectWrite,
      output: OutreachProspectRead
    },
    updateProspect: {
      url: "/prospects/${userId}",
      operation: "patch",
      endpointType: "update",
      returnObj: "body.data",
      input: OutreachProspectWrite,
      output: OutreachProspectRead
    },
    getAllWebhooks: {
      url: "/webhooks/",
      operation: "get",
      endpointType: "fetchAll",
      returnObj: "body.data"
    },
    insertWebhook: {
      url: "/webhooks/",
      operation: "post",
      endpointType: "create"
    },
    refreshToken: {
      url: "https://api.outreach.io/oauth/token",
      operation: "post",
      endpointType: "create"
    },
  },
  superagent: {
    settings: [
    { method: "set", params: { "Content-Type": "application/vnd.api+json" }},
    { method: "set", params: { "Authorization": "Bearer ${connector.private_settings.access_token}"}}
    ],
    headersToMetrics: {
      "x-rate-limit-limit": "ship.service_api.remaining",
      "x-rate-limit-remaining": "ship.service_api.limit"
    }
  },
  authentication: {
    strategy: "oauth2",
    params: {
      name: "Outreach",
      Strategy: OAuth2Strategy,
      tokenInUrl: true,
      options: {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        authorizationURL: "https://api.outreach.io/oauth/authorize",
        tokenURL: "https://api.outreach.io/oauth/token",
        grant_type: "authorization_code",
        scope: [
          "create_prospects",
          "prospects.all",
          "create_accounts",
          "accounts.all",
          "webhooks.all"
        ] // App Scope
      }
    }
  },
  retry: {
    templates: [{ truthy: { status: 401 } , route: "refreshToken", retry: 1 }]
  },
  error: {
    //error conditions templating
  }
}


module.exports = {
  service
};