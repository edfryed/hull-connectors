// @flow
/* global describe, it, beforeEach, afterEach */
const testScenario = require("hull-connector-framework/src/test-scenario");
const connectorServer = require("../../../server/server");

process.env.MAILCHIMP_CLIENT_ID = "1234";
process.env.MAILCHIMP_CLIENT_SECRET = "1234";

const connector = {
  id: "123456789012345678901234",
  private_settings: {
    api_key: "1",
    domain: "mock",
    mailchimp_list_id: "1",
    interest_category_id: "2",
    interests_mapping: {
      hullSegmentId: "MailchimpInterestId"
    },
    segment_mapping: {
      hullSegmentId: "MailchimpSegmentId"
    },
    synchronized_segments: ["hullSegmentId"],
    sync_fields_to_mailchimp: [
     { hull: "traits_custom_will_overwrite", name: "OVERWRITTEN_MERGE_FIELD", overwrite: true },
     { hull: "traits_custom_wont_overwrite", name: "NOT_OVERWRITTEN_MERGE_FIELD", overwrite: false },
     { hull: "account.custom_account_will_overwrite", name: "OVERWRITTEN_MERGE_FIELD_FROM_ACCOUNT", overwrite: true },
     { hull: "account.custom_account_wont_overwrite", name: "NOT_OVERWRITTEN_MERGE_FIELD_FROM_ACCOUNT", overwrite: false },
   ]
  }
};
const usersSegments = [
  {
    name: "testSegment",
    id: "hullSegmentId"
  }
];

it("should send matching user to the mailchimp and allowing to ", () => {
  const email = "email@email.com";
  return testScenario({ connectorServer }, ({ handlers, nock, expect }) => {
    return {
      handlerType: handlers.notificationHandler,
      handlerUrl: "smart-notifier",
      channel: "user:update",
      externalApiMock: () => {
        const scope = nock("https://mock.api.mailchimp.com/3.0");
        scope.get("/lists/1/webhooks")
          .reply(200, {
            webhooks: [
              { url: `localhost:8000/mailchimp?ship=123456789012345678901234` }
            ]
          });
        scope.post("/lists/1", {
            members: [
              {
                email_type: "html",
                merge_fields: {
                  OVERWRITTEN_MERGE_FIELD: "ovewriting value",
                  NOT_OVERWRITTEN_MERGE_FIELD: "won't be overwritten",
                  OVERWRITTEN_MERGE_FIELD_FROM_ACCOUNT: "ovewriting value",
                  NOT_OVERWRITTEN_MERGE_FIELD_FROM_ACCOUNT: "won't be overwritten"
                },
                interests: {
                  MailchimpInterestId: true
                },
                email_address: email,
                status_if_new: "subscribed"
              }
            ],
            update_existing: true
          })
          .reply(200);
        return scope;
      },
      connector,
      usersSegments,
      accountsSegments: [],
      messages: [
        {
          user: {
            email,
            traits_custom_will_overwrite: "ovewriting value",
            "traits_mailchimp/overwritten_merge_field": "will be overwritten",
            traits_custom_wont_overwrite: "ignored value",
            "traits_mailchimp/not_overwritten_merge_field": "won't be overwritten",
            "traits_mailchimp/overwritten_merge_field_from_account": "will be overwritten",
            "traits_mailchimp/not_overwritten_merge_field_from_account": "won't be overwritten"
          },
          account: {
            custom_account_will_overwrite: "ovewriting value",
            custom_account_wont_overwrite: "ignored value"
          },
          segments: [{ id: "hullSegmentId", name: "hullSegmentName" }]
        }
      ],
      response: {
        flow_control: {
          type: "next",
          in: 10,
          in_time: 30000,
          size: 50,
        }
      },
      logs: [
        [
          "debug",
          "outgoing.user.start",
          expect.objectContaining({ subject_type: "user", user_email: email }),
          { changes: {}, events: [], segments: ["hullSegmentName"] }
        ],
        ["debug", "outgoing.job.start", expect.whatever(), { messages: 1 }],
        ["debug", "connector.service_api.call", expect.whatever(), expect.objectContaining({ method: "GET", url: "/lists/{{listId}}/webhooks" })],
        ["debug", "connector.service_api.call", expect.whatever(), expect.objectContaining({ method: "POST", url: "/lists/{{listId}}" })],
        [
          "info",
          "outgoing.user.success",
          expect.objectContaining({ subject_type: "user", user_email: email }),
          {
            member: {
              email_address: email,
              email_type: "html",
              interests: {
                MailchimpInterestId: true,
              },
              merge_fields: {
                OVERWRITTEN_MERGE_FIELD: "ovewriting value",
                NOT_OVERWRITTEN_MERGE_FIELD: "won't be overwritten",
                OVERWRITTEN_MERGE_FIELD_FROM_ACCOUNT: "ovewriting value",
                NOT_OVERWRITTEN_MERGE_FIELD_FROM_ACCOUNT: "won't be overwritten"
              },
              status_if_new: "subscribed"
            }
          }
        ],
        ["debug", "outgoing.job.success", expect.whatever(), { errors: 0, successes: 1 }]
      ],
      firehoseEvents: [],
      metrics: [
        ["increment", "connector.request", 1],
        ["increment", "ship.service_api.call", 1],
        ["value", "connector.service_api.response_time", expect.whatever()],
        ["increment", "ship.service_api.call", 1],
        ["value", "connector.service_api.response_time", expect.whatever()],
        ["value", "connector.send_user_update_messages.time", expect.whatever()],
        ["value", "connector.send_user_update_messages.messages", 1],
        ["increment", "ship.outgoing.users", 1]
      ]
    };
  });
});