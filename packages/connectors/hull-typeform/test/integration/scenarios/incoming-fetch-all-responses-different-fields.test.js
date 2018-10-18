// @flow

const testScenario = require("hull-connector-framework/src/test-scenario");

// workaround to allow connector start
process.env.CLIENT_ID = "123";
const hullTypeformServer = require("../../../server/server");

test("incoming fetch all responses basic", () => {
  return testScenario(hullTypeformServer, ({ handlers, requireFixture, expect, nock }) => {
    return {
      handlerType: handlers.scheduleHandler,
      handlerUrl: "fetch-all-responses",
      externalApiMock: () => {
        const scope = nock("https://api.typeform.com");
        scope.get("/forms/TYPEFORM1").reply(200, require("../fixtures/example-form"));
        scope.get("/forms/TYPEFORM1/responses").query({ completed: true }).reply(200, require("../fixtures/example-form-responses"))
        return scope;
      },
      connector: {
        private_settings: {
          form_id: "TYPEFORM1",
          field_as_email: "SMEUb7VJz92Q",
          incoming_user_attributes: [
            { service: "RUqkXSeXBXSd", hull: "traits_boolean_trait" },
            { service: "JwWggjAKtOkA", hull: "traits_short_text_trait" },
            { service: "pn48RmPazVdM", hull: "traits_number_trait" },
            { service: "PNe8ZKBK8C2Q", hull: "traits_array_trait" },
            { service: "KoJxDM3c6x8h", hull: "traits_date_trait_at" },
            { service: "score", hull: "traits_calculated_score_trait" },
          ]
        }
      },
      usersSegments: [],
      accountsSegments: [],
      response: { response: "ok" },
      logs: [
        ["info", "incoming.job.start", expect.whatever(), expect.whatever()],
        ["debug", "connector.service_api.call", expect.whatever(), expect.whatever()],
        ["debug", "connector.service_api.call", expect.whatever(), expect.whatever()],
        ["info", "incoming.job.progress", expect.whatever(), { progress: 4 }],
        ["info", "incoming.user.success", { subject_type: "user", user_email: "lian1078@other.com" }, {
          array_trait: [ "New York", "Tokyo" ],
          boolean_trait: false,
          date_trait_at: "2012-03-20T00:00:00Z",
          number_trait: 1,
          short_text_trait: "Lian",
          calculated_score_trait: 2
        }],
        [
          "info",
          "incoming.user-event.success",
          { subject_type: "user", user_email: "lian1078@other.com" },
          {
            event: "Form Submitted",
            eventProperties: {
            "form_title": "title",
            "form_id": "FORM1",
            "score": 2
            },
            eventContext: expect.whatever()
          }
        ],
        [
          "info",
          "incoming.user.success",
          {
            "subject_type": "user",
            "user_email": "sarahbsmith@example.com"
          },
          {
            array_trait: ["London", "New York"],
            boolean_trait: true,
            date_trait_at: "2016-05-13T00:00:00Z",
            number_trait: 1,
            short_text_trait: "Sarah",
            calculated_score_trait: 4
          }
        ],
        [
          "info",
          "incoming.user-event.success",
          {
            "subject_type": "user",
            "user_email": "sarahbsmith@example.com"
          },
          {
            "event": "Form Submitted",
            "eventProperties": {
              "form_title": "title",
              "form_id": "FORM1",
              "score": 4
            },
            "eventContext": expect.whatever()
          }
        ],
        [
          "info",
          "incoming.user.skip",
          {
            "subject_type": "user"
          },
          {
            "reason": "No identification claims defined, please refer to Identification section of documentation",
            "rawResponse": expect.whatever()
          }
        ],
        [
          "info",
          "incoming.user.skip",
          {
            "subject_type": "user"
          },
          {
            "reason": "No identification claims defined, please refer to Identification section of documentation",
            "rawResponse": expect.whatever()
          }
        ],
        ["info", "incoming.job.success", expect.whatever(), expect.whatever()]
      ],
      metrics: [
        ["increment", "connector.request", 1],
        ["increment", "ship.service_api.call", 1],
        ["value", "connector.service_api.response_time", expect.whatever()],
        ["increment", "ship.service_api.call", 1],
        ["value", "connector.service_api.response_time", expect.whatever()],
        ["increment", "ship.incoming.users", 1],
        ["increment", "ship.incoming.users", 1]
      ],
      firehoseEvents: [
        [
          "traits",
          {
            asUser: {
              email: "lian1078@other.com"
            },
            subjectType: "user"
          },
          {
            array_trait: [ "New York", "Tokyo" ],
            boolean_trait: false,
            date_trait_at: "2012-03-20T00:00:00Z",
            number_trait: 1,
            short_text_trait: "Lian",
            calculated_score_trait: 2
          }
        ],
        [
          "track",
          {
            asUser: {
              email: "lian1078@other.com",
            },
            subjectType: "user"
          },
          expect.whatever()
        ],
        [
          "traits",
          {
            asUser: {
              email: "sarahbsmith@example.com"
            },
            subjectType: "user"
          },
          {
            array_trait: ["London", "New York"],
            boolean_trait: true,
            date_trait_at: "2016-05-13T00:00:00Z",
            number_trait: 1,
            short_text_trait: "Sarah",
            calculated_score_trait: 4
          }
        ],
        [
          "track",
          {
            asUser: {
              email: "sarahbsmith@example.com",
            },
            subjectType: "user"
          },
          expect.whatever()
        ]
      ]
    };
  });
});