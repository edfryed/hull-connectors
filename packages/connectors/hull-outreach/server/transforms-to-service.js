/* @flow */
import type { Transform, ServiceTransforms } from "./shared/types";

const { HullOutgoingUser, HullOutgoingAccount } = require("./shared/hull-service-objects");
const { OutreachProspectWrite, OutreachAccountWrite } = require("./service-objects");

const transformsToService: ServiceTransforms = [
  {
    input: HullOutgoingUser,
    output: OutreachProspectWrite,
    strategy: "PropertyKeyedValue",
    transforms: [
      { outputPath: "data.type", outputFormat: "prospect" },
      { outputPath: "data.id", outputFormat: "${userId}" },
      { inputPath: "outreach/id", outputPath: "data.id" },
      { inputPath: "email", outputPath: "data.attributes.emails", outputFormat: ["${value}"] },
      {
        inputPath: "account.outreach/id",
        outputPath: "data.relationships.account.data",
        outputFormat: {
          type: "account",
          id: "${value}"
        }
      },
      {
        mapping: "connector.private_settings.prospect_attributes_outbound",
        inputPath: "${input_field_name}",
        outputPath: "data.attributes.${output_field_name}",
      }
    ]
  },
  {
    input: HullOutgoingAccount,
    output: OutreachAccountWrite,
    strategy: "PropertyKeyedValue",
    transforms: [
      { outputPath: "data.type", outputFormat: "account" },
      { inputPath: "outreach/id", outputPath: "data.id" },
      { inputPath: "domain", outputPath: "data.attributes.domain" },
      {
        mapping: "connector.private_settings.account_attributes_outbound",
        inputPath: "${input_field_name}",
        outputPath: "data.attributes.${output_field_name}",
      }
    ]
  },
  {
    input: HullProperties,
    output: HubspotProperties,
    transforms: [
      { inputPath: "properties", outputPath: "${name}", outputFormat: "account" }
    ]
  }

  const option =  {
    hidden: false,
    description: null,
    value: "${userSegments.name}",
    readOnly: false,
    doubleData: 0.0,
    label: "${userSegments.name}",
    displayOrder: i
  };
  const hullHubspotSegments = {
  options: "${options}",
  description: "All the Segments the User belongs to in Hull",
  label: "Hull Segments",
  groupName: "hull",
  fieldType: "checkbox",
  formField: false,
  name: "hull_segments",
  type: "enumeration",
  displayOrder: 0
  }
];

module.exports = {
  transformsToService
};
