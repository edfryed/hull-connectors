// @flow
/* global describe, it, beforeEach, afterEach */
const testScenario = require("hull-connector-framework/src/test-scenario");
const _ = require("lodash");
const connectorServer = require("../../../server/server");
const connectorManifest = require("../../../manifest");

process.env.OVERRIDE_HUBSPOT_URL = "";

const incomingData = require("../fixtures/get-companies-recent-modified");

const connector = {
  private_settings: {
    token: "hubToken",
    companies_last_fetch_at: 1419967066626,
    handle_accounts: true
  }
};

it("should fetch recent companies using settings", () => {
  return testScenario({ connectorServer, connectorManifest }, ({ handlers, nock, expect }) => {
    return {
      handlerType: handlers.scheduleHandler,
      handlerUrl: "fetch-recent-companies",
      externalApiMock: () => {
        const scope = nock("https://api.hubapi.com");
        scope.get("/contacts/v2/groups?includeProperties=true")
          .reply(200, []);
        scope.get("/properties/v1/companies/groups?includeProperties=true")
          .reply(200, []);
        scope.get("/companies/v2/companies/recent/modified?count=100&offset")
          .reply(200, incomingData);
        return scope;
      },
      connector,
      usersSegments: [],
      accountsSegments: [],
      response: {"status": "deffered"},
      logs: [
        ["debug", "connector.service_api.call", expect.whatever(), expect.whatever()],
        ["debug", "connector.service_api.call", expect.whatever(), expect.whatever()],
        [
          "info",
          "incoming.job.start",
          expect.whatever(),
          {
            jobName: "fetch",
            lastFetchAt: 1419967066626,
            propertiesToFetch: ["domain"],
            stopFetchAt: expect.whatever(),
            type: "account"
          }
        ],
        ["debug", "connector.service_api.call", expect.whatever(), expect.objectContaining({ "method": "GET", "status": 200, "url": "/companies/v2/companies/recent/modified" })],
        ["info", "incoming.job.progress", {}, { jobName: "fetch", progress: 2, type: "account" }],
        ["debug", "saveContacts", {}, 2],
        [
          "debug",
          "incoming.account",
          {},
          {
            claims: { domain: "foo.com", anonymous_id: "hubspot:19411477" },
            traits: { "hubspot/id": 19411477, name: { operation: "setIfNull", value: "madison Inc" } }
          }
        ],
        [
          "info",
          "incoming.account.skip",
          {},
          {
            company: incomingData.results[1],
            reason: "Value of field \"properties.domain.value\" is empty, cannot map it to domain, but it's required."
          }
        ],
        [
          "info",
          "incoming.account.success",
          expect.objectContaining({
            "subject_type": "account",
            "account_domain": "foo.com",
            "account_anonymous_id": "hubspot:19411477"
          }),
          {
            traits: {
              "hubspot/id": 19411477,
              name: {
                operation: "setIfNull",
                value: "madison Inc"
              }
            }
          }
        ],
        [
          "info",
          "incoming.account.link.skip",
          {
            account_anonymous_id: "hubspot:19411477",
            account_domain: "foo.com",
            subject_type: "account"
          },
          {
            reason: "incoming linking is disabled, you can enabled it in the settings"
          }
        ],
        [
          "info",
          "incoming.job.success",
          {},
          {
            "jobName": "fetch",
          }
        ]
      ],
      firehoseEvents: [
        [
          "traits",
          {
            "asAccount": {
              "domain": "foo.com",
              "anonymous_id": "hubspot:19411477"
            },
            "subjectType": "account",
          },
          {
            "hubspot/id": 19411477,
            "name": {
              "operation": "setIfNull",
              "value": "madison Inc"
            }
          }
        ]
      ],
      metrics: [
        ["increment", "connector.request", 1],
        ["increment", "ship.service_api.call", 1],
        ["value", "connector.service_api.response_time", expect.any(Number)],
        ["increment", "ship.service_api.call", 1],
        ["value", "connector.service_api.response_time", expect.any(Number)],
        ["increment", "ship.service_api.call", 1],
        ["value", "connector.service_api.response_time", expect.any(Number)],
        ["increment", "ship.incoming.accounts", 2]
      ],
      platformApiCalls: [
        ["GET", "/api/v1/search/user_reports/bootstrap", {}, {}],
        ["GET", "/api/v1/search/account_reports/bootstrap", {}, {}],
        ["GET", "/api/v1/app", {}, {}],
        [
          "PUT",
          "/api/v1/9993743b22d60dd829001999",
          {},
          {
            "private_settings": {
              "companies_last_fetch_at": expect.whatever(),
              "handle_accounts": true,
              "token": "hubToken"
            }
          }
        ]
      ]
    };
  });
});
