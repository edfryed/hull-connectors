/* @flow */
const { service } = require("./service");

const {
  ifLogic,
  route,
  cond,
  hull,
  set,
  get,
  filter,
  utils,
  input,
  inputParameter,
  cache,
  Svc
} = require("./shared/language")

const COMPANY_DEFAULT_MAPPING = require("./company-default-mapping");

// function outreach(op: string, query: any): Svc { return new Svc("outreach", op, query, null)};
// function outreach(op: string, data: any): Svc { return new Svc("outreach", op, null, data)};


function hubspot(op: string): Svc { return new Svc("outreach", op)};
function hubspotSend(op: string, param: any): Svc { return new Svc("outreach", op, param)};
function hubspotSendInput(op: string): Svc { return new Svc("outreach", op, input())};


// TODO need support for parallel paths too
// arrays of objects paths or just object
// Think about objects (class defs) vs pipes (type defs)
// Objects don't just define a shape, they're a specific type that must be translated
// where as pipes (transforms and endpoints) just define behaviors

const webhookDataTemplate = {
      data: {
        type: "webhook",
        attributes: {
          url: "${webhookUrl}"
        }
      }
    };

const refreshTokenDataTemplate = {
  refresh_token: "${connector.private_settings.refresh_token}",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: "https://${connectorHostname}/auth/callback",
  grant_type: "refresh_token"
}

// conditionals are a specific type of instruction
// who can only be executed if inside of an "if" instruction....
// everything else can be nested, which means, the if/else
// flow is special somehow....

// glue is a list of routes....
// a route has a name, and a parameter to be evaluated....
// a route is a named instruction....
// everything else doesn't have a name....

const glue = {
  syncContactProperties: [route("ensureHullGroup"), route("ensureCustomProperties")],
  ensureHullGroup:
    ifLogic(cond("isEmpty", filter(cache("hubspotContactProperties", hubspot("getContactPropertyGroups")), {name: "hull"})), {
      true: hubspot("ensureHullGroup"),
      false: {}
    }),
  ensureCustomProperties:
    [
      set("expectedPropertiesList", concat("${userSegments}", route("getContactOutgoingMapping"))),
      set("flattenedProperties", concat()),
      expand(set("expectedProperty", "${expectedPropertiesList}"),
        ifLogic(cond("isEmpty", set("existingValue", get("${flattenedProperties}", get("name")))), {
          true:
            ifLogic(cond("isEmpty", set("existingProperty", get("${flattenedProperties}", replace(get("name"), "/^hull_/, ")))), {
              true: route("insertNewProperty"),
              false: route("checkIfNeedsUpdate")
            }),
          false: route("checkIfNeedsUpdate")
        })
      )
    ],

  ensureCustomProperties:
    ifLogic(cond("notEqual", map("${expectedProperty}", "options.label"), map("${existingProperty}", "options.label")), {
      true: hubspot("updateProperty", "${expectedProperty}"),
      false: {}
    }),
  getContactOutgoingMapping: {
    cache("hubspotContactProperties", hubspot("getContactPropertyGroups")
  }

};




const flattenProperties = _.flatten(
  hubspotGroupProperties.map(g => g.properties)
).reduce((props, prop) => {
  return Object.assign(props, { [prop.name]: prop });
}, {});



    {
        "name": "companyinformation",
        "displayName": "Company Information",
        "displayOrder": 1,
        "hubspotDefined": true,
        "properties": [
            {
                "name": "about_us",
                "label": "About Us",
                "description": "Short about-company",
                "groupName": "companyinformation",
                "type": "string",
                "fieldType": "text",
                "hidden": false,
                "options": [],
                "createdUserId": null,
                "deleted": null,
                "favorited": false,
                "favoritedOrder": -1,
                "updatedUserId": null,
                "searchableInGlobalSearch": false,
                "hasUniqueValue": false,
                "formField": false,
                "mutableDefinitionNotDeletable": true,
                "externalOptions": false,
                "displayMode": "current_value",
                "numberDisplayHint": null,
                "textDisplayHint": null,
                "optionsAreMutable": null,
                "referencedObjectType": null,
                "isCustomizedDefault": false,
                "createdAt": null,
                "updatedAt": null,
                "displayOrder": -1,
                "readOnlyValue": false,
                "readOnlyDefinition": true,
                "calculated": false,
                "showCurrencySymbol": null,
                "currencyPropertyName": null,
                "hubspotDefined": true
            },
            {
                "name": "first_deal_created_date",
                "label": "First Deal Created Date",
                "description": "The date the first deal for this contact was created",
                "groupName": "companyinformation",
                "type": "datetime",
                "fieldType": "text",
                "hidden": false,
                "options": [],
                "createdUserId": null,
                "deleted": null,














module.exports = { glue };
