/* @flow */
const _ = require("lodash");

const { doVariableReplacement } = require("./variable-utils");
const uri = require("urijs");

class FrameworkUtils {

  createWebhookUrl(context: Object, params: any): string {
    const client = context.client;
    const { organization, id, secret } = client.configuration();
    const search = {
      organization,
      secret,
      ship: id
    };
    return uri(`https://${context.hostname}/webhooks`)
      .search(search)
      .toString();
  }

  getConnectorHostname(context: Object, params: any): string {
    return context.hostname;
  }


  const TYPES_MAPPING = {
    string: { type: "string", fieldType: "text" },
    number: { type: "number", fieldType: "text" },
    date: { type: "datetime", fieldType: "text" },
    boolean: {
      type: "bool",
      fieldType: "booleancheckbox",
      options: [
        {
          description: null,
          doubleData: 0,
          label: "Yes",
          displayOrder: -1,
          hidden: false,
          readOnly: false,
          value: true
        },
        {
          description: null,
          doubleData: 0,
          label: "No",
          displayOrder: -1,
          hidden: false,
          readOnly: false,
          value: false
        }
      ]
    }
  };

  //Default mapping
  //What's currently in the valid outgoing traffic
  //user segments
  //what's in the target system
  //types

    createHubspotPropertiesSettings(context: Object, params: any) {
      sync(this.mappingUtil.contactOutgoingMapping ->
        const mappingFromDefault = CONTACT_DEFAULT_MAPPING.reduce(
        (mapping, defaultMapping) => {

          //return this.hullClient.utils.properties.get();
          const hullTrait = this.hullUserProperties[defaultMapping.hull];

          //this.hubspotClient.getContactPropertyGroups();
      //     _.flatten(
      //   config.hubspotContactPropertyGroups.map(group => group.properties)
      // );
          //checking hubspot contact properties to see if this exists...
          const hubspotContactProperty = _.find(this.hubspotContactProperties, {
            name: defaultMapping.name
          });

          if (hubspotContactProperty === undefined) {
            return mapping;
          }
          return mapping.concat([
            {
              hull_trait_name: defaultMapping.hull,
              hull_default_trait_name:
                (defaultMapping && defaultMapping.name) || null,
              hull_trait_type: _.get(hullTrait, "type", undefined),
              hull_overwrite_hubspot: true,
              hubspot_property_name: defaultMapping.name,
              hubspot_property_label: defaultMapping.name,
              hubspot_property_read_only:
                hubspotContactProperty && hubspotContactProperty.readOnlyValue,
              hubspot_property_type:
                hubspotContactProperty && hubspotContactProperty.type,
              hubspot_property_field_type:
                hubspotContactProperty && hubspotContactProperty.fieldType,
              hubspot_property_display_order:
                hubspotContactProperty && hubspotContactProperty.displayOrder
            }
          ]);

          // config.connectorSettings.sync_fields_to_hubspot
          const mappingFromSettings = this.contactAttributesOutgoingSettings.reduce(
        (outboundMapping, setting) => {
          if (!setting.name || !setting.hull) {
            return outboundMapping;
          }
          // let's find a default mapping
          const defaultMapping = _.find(CONTACT_DEFAULT_MAPPING, {
            name: setting.name
          });

          // let's generate a slug version of the hubspot property
          let hubspotPropertyName = slug(setting.name, {
            replacement: "_",
            lower: true
          });

          // let's try to find an existing contact property directly by slug
          let hubspotContactProperty = _.find(this.hubspotContactProperties, {
            name: hubspotPropertyName
          });

          // if we couldn't find the existing contact property
          // we will prepend it with `hull_` and see if this was
          // a property created by this connector
          if (hubspotContactProperty === undefined) {
            hubspotPropertyName =
              (defaultMapping && defaultMapping.name) ||
              `hull_${hubspotPropertyName}`;
            hubspotContactProperty = _.find(this.hubspotContactProperties, {
              name: hubspotPropertyName
            });
          }

          const hullTrait = _.find(this.hullUserProperties, { id: setting.hull });
          if (hullTrait === undefined) {
            return outboundMapping;
          }

          return outboundMapping.concat([
            {
              hull_trait_name: setting.hull,
              hull_default_trait_name:
                (defaultMapping && defaultMapping.hull) || null,
              hull_trait_type: hullTrait.type,
              hull_overwrite_hubspot: setting.overwrite,
              hubspot_property_name: hubspotPropertyName,
              hubspot_property_label: setting.name,
              hubspot_property_read_only:
                hubspotContactProperty && hubspotContactProperty.readOnlyValue,
              hubspot_property_type:
                hubspotContactProperty && hubspotContactProperty.type,
              hubspot_property_field_type:
                hubspotContactProperty && hubspotContactProperty.fieldType,
              hubspot_property_display_order:
                hubspotContactProperty && hubspotContactProperty.displayOrder
            }
          ]);
        },
        []
      );
      return mappingFromDefault.concat(mappingFromSettings);



          _uniqueBy name: ctx.userSegments
          const expectedPropertiesList = [
    this.getHullSegmentsProperty(uniqueSegments)

    getHullSegmentsProperty(segments: Array<THullSegment> = []) {
    const options = _.map(segments, (s, i) => this.optionsHash(s.name, i));
    return {
      options,
      description: "All the Segments the User belongs to in Hull",
      label: "Hull Segments",
      groupName: "hull",
      fieldType: "checkbox",
      formField: false,
      name: "hull_segments",
      type: "enumeration",
      displayOrder: 0
    };
  }

  optionsHash(name: string, i: any) {
    return {
      hidden: false,
      description: null,
      value: _.trim(name),
      readOnly: false,
      doubleData: 0.0,
      label: name,
      displayOrder: i
    };
  }

  ].concat(this.getPropertiesList(outboundMapping));
      return outboundMapping.map(mappingEntry => {
        const name = mappingEntry.hubspot_property_name;
        const label = mappingEntry.hubspot_property_label;
        const displayOrder = mappingEntry.hubspot_property_display_order;
        const propType =
          TYPES_MAPPING[mappingEntry.hubspot_property_type] ||
          TYPES_MAPPING.string;
        return {
          ...propType,
          name,
          label,
          displayOrder,
          calculated: false,
          groupName: "hull",
          formField: false
        };


  this.ensureCustomProperties
  //return this.hubspotClient.getContactPropertyGroups();
  this.hubspotProperties,
  expectedPropertiesList
  )


  const flattenProperties = _.flatten(
    hubspotGroupProperties.map(g => g.properties)
  ).reduce((props, prop) => {
    return Object.assign(props, { [prop.name]: prop });
  }, {});
  return Promise.all(
    expectedPropertiesList.map(property =>
      this.ensureProperty(flattenProperties, property)
    )


    ensureProperty(
    groupProperties: { [string]: HubspotContactProperty },
    property: HubspotContactPropertyWrite
  ) {
  const existing =
    groupProperties[property.name] ||
    groupProperties[property.name.replace(/^hull_/, "")];
  if (existing) {
    if (this.shouldUpdateProperty(existing, property)) {
      debug("ensureProperty %o", property);

  }

module.exports = {
  FrameworkUtils
}
