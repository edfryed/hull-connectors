/* @flow */

const PROSPECT_FIELDDEFS: Array<any> = [
  {
    value: "addedAt",
    label: "Added At",
    in: true,
    out: true,
    type: "datetime"
  },
  {
    value: "addressStreet",
    label: "Address Street",
    in: true,
    out: true
  },
  {
    value: "addressStreet2",
    label: "Address Street2",
    in: true,
    out: true
  },
  {
    value: "addressCity",
    label: "Address City",
    in: true,
    out: true
  },
  {
    value: "addressState",
    label: "Address State",
    in: true,
    out: true
  },
  {
    value: "addressZip",
    label: "Address Zip",
    in: true,
    out: true
  },
  {
    value: "addressCountry",
    label: "Address Country",
    in: true,
    out: true
  },
  {
    value: "angelListUrl",
    label: "AngelList Url",
    in: true,
    out: true
  },
  {
    value: "availableAt",
    label: "Available At",
    in: true,
    out: true,
    type: "datetime"
  },
  {
    value: "callsOptedOutAt",
    label: "Calls OptedOut At",
    in: true,
    out: false,
    type: "datetime"
  },
  {
    value: "campaignName",
    label: "Campaign Name",
    in: true,
    out: true
  },
  {
    value: "clickCount",
    label: "Click Count",
    in: true,
    out: false,
    type: "number"
  },
  {
    value: "createdAt",
    label: "Created At",
    in: true,
    out: false,
    type: "datetime"
  },
  {
    value: "custom1",
    label: "Custom1",
    in: true,
    out: true
  },
  {
    value: "custom2",
    label: "Custom2",
    in: true,
    out: true
  },
  {
    value: "custom3",
    label: "Custom3",
    in: true,
    out: true
  },
  {
    value: "custom4",
    label: "Custom4",
    in: true,
    out: true
  },
  {
    value: "custom5",
    label: "Custom5",
    in: true,
    out: true
  },
  {
    value: "custom6",
    label: "Custom6",
    in: true,
    out: true
  },
  {
    value: "custom7",
    label: "Custom7",
    in: true,
    out: true
  },
  {
    value: "custom8",
    label: "Custom8",
    in: true,
    out: true
  },
  {
    value: "custom9",
    label: "Custom9",
    in: true,
    out: true
  },
  {
    value: "custom10",
    label: "Custom10",
    in: true,
    out: true
  },
  {
    value: "custom11",
    label: "Custom11",
    in: true,
    out: true
  },
  {
    value: "custom12",
    label: "Custom12",
    in: true,
    out: true
  },
  {
    value: "custom13",
    label: "Custom13",
    in: true,
    out: true
  },
  {
    value: "custom14",
    label: "Custom14",
    in: true,
    out: true
  },
  {
    value: "custom15",
    label: "Custom15",
    in: true,
    out: true
  },
  {
    value: "custom16",
    label: "Custom16",
    in: true,
    out: true
  },
  {
    value: "custom17",
    label: "Custom17",
    in: true,
    out: true
  },
  {
    value: "custom18",
    label: "Custom18",
    in: true,
    out: true
  },
  {
    value: "custom19",
    label: "Custom19",
    in: true,
    out: true
  },
  {
    value: "custom20",
    label: "Custom20",
    in: true,
    out: true
  },
  {
    value: "custom21",
    label: "Custom21",
    in: true,
    out: true
  },
  {
    value: "custom22",
    label: "Custom22",
    in: true,
    out: true
  },
  {
    value: "custom23",
    label: "Custom23",
    in: true,
    out: true
  },
  {
    value: "custom24",
    label: "Custom24",
    in: true,
    out: true
  },
  {
    value: "custom25",
    label: "Custom25",
    in: true,
    out: true
  },
  {
    value: "custom26",
    label: "Custom26",
    in: true,
    out: true
  },
  {
    value: "custom27",
    label: "Custom27",
    in: true,
    out: true
  },
  {
    value: "custom28",
    label: "Custom28",
    in: true,
    out: true
  },
  {
    value: "custom29",
    label: "Custom29",
    in: true,
    out: true
  },
  {
    value: "custom30",
    label: "Custom30",
    in: true,
    out: true
  },
  {
    value: "custom31",
    label: "Custom31",
    in: true,
    out: true
  },
  {
    value: "custom32",
    label: "Custom32",
    in: true,
    out: true
  },
  {
    value: "custom33",
    label: "Custom33",
    in: true,
    out: true
  },
  {
    value: "custom34",
    label: "Custom34",
    in: true,
    out: true
  },
  {
    value: "custom35",
    label: "Custom35",
    in: true,
    out: true
  },
  {
    value: "dateOfBirth",
    label: "Date Of Birth",
    in: true,
    out: true,
    type: "date"
  },
  {
    value: "degree",
    label: "Degree",
    in: true,
    out: true
  },
  {
    value: "emails",
    label: "Emails",
    in: false,
    out: false,
    type: "array"
  },
  {
    value: "emailsOptedOutAt",
    label: "Emails Opted Out At",
    in: true,
    out: false,
    type: "datetime"
  },
  {
    value: "engagedAt",
    label: "Engaged At",
    in: true,
    out: false,
    type: "datetime"
  },
  {
    value: "engagedScore",
    label: "Engaged Score",
    in: true,
    out: false,
    type: "number"
  },
  {
    value: "eventName",
    label: "Event Name",
    in: true,
    out: true
  },
  {
    value: "externalId",
    label: "External Id",
    in: true,
    out: true
  },
  {
    value: "externalOwner",
    label: "External Owner",
    in: true,
    out: true
  },
  {
    value: "externalSource",
    label: "External Source",
    in: true,
    out: false
  },
  {
    value: "facebookUrl",
    label: "Facebook Url",
    in: true,
    out: true
  },
  {
    value: "firstName",
    label: "First Name",
    in: true,
    out: true
  },
  {
    value: "gender",
    label: "Gender",
    in: true,
    out: true
  },
  {
    value: "githubUrl",
    label: "Github Url",
    in: true,
    out: true
  },
  {
    value: "githubUsername",
    label: "Github Username",
    in: true,
    out: true
  },
  {
    value: "googlePlusUrl",
    label: "GooglePlus Url",
    in: true,
    out: true
  },
  {
    value: "graduationDate",
    label: "Graduation Date",
    in: true,
    out: true
  },
  {
    value: "homePhones",
    label: "Home Phones",
    in: true,
    out: true,
    type: "array"
  },
  {
    value: "jobStartDate",
    label: "Job Start Date",
    in: true,
    out: true
  },
  {
    value: "lastName",
    label: "Last Name",
    in: true,
    out: true
  },
  {
    value: "linkedInConnections",
    label: "LinkedIn Connections",
    in: true,
    out: true,
    type: "number"
  },
  {
    value: "linkedInId",
    label: "LinkedIn Id",
    in: true,
    out: true
  },
  {
    value: "linkedInSlug",
    label: "LinkedIn Slug",
    in: true,
    out: false
  },
  {
    value: "linkedInUrl",
    label: "LinkedIn Url",
    in: true,
    out: true
  },
  {
    value: "middleName",
    label: "Middle Name",
    in: true,
    out: true
  },
  {
    value: "mobilePhones",
    label: "Mobile Phones",
    in: true,
    out: true,
    type: "array"
  },
  {
    value: "name",
    label: "Name",
    in: true,
    out: false
  },
  {
    value: "nickname",
    label: "Nickname",
    in: true,
    out: true
  },
  {
    value: "occupation",
    label: "Occupation",
    in: true,
    out: true
  },
  {
    value: "openCount",
    label: "Open Count",
    in: true,
    out: false,
    type: "number"
  },
  {
    value: "optedOut",
    label: "Opted Out",
    in: true,
    out: true,
    type: "boolean"
  },
  {
    value: "optedOutAt",
    label: "Opted Out At",
    in: true,
    out: false
  },
  {
    value: "otherPhones",
    label: "Other Phones",
    in: true,
    out: true,
    type: "array"
  },
  {
    value: "personalNote1",
    label: "Personal Note1",
    in: true,
    out: true
  },
  {
    value: "personalNote2",
    label: "Personal Note2",
    in: true,
    out: true
  },
  {
    value: "preferredContact",
    label: "Preferred Contact",
    in: true,
    out: true
  },
  {
    value: "quoraUrl",
    label: "Quora Url",
    in: true,
    out: true
  },
  {
    value: "region",
    label: "Region",
    in: true,
    out: true
  },
  {
    value: "replyCount",
    label: "Reply Count",
    in: true,
    out: false,
    type: "number"
  },
  {
    value: "school",
    label: "School",
    in: true,
    out: true
  },
  {
    value: "score",
    label: "Score",
    in: true,
    out: true,
    type: "number"
  },
  {
    value: "smsOptedOutAt",
    label: "SmsOuptedOutAt",
    in: true,
    out: false,
    type: "datetime"
  },
  {
    value: "source",
    label: "Source",
    in: true,
    out: true
  },
  {
    value: "specialties",
    label: "Specialties",
    in: true,
    out: true
  },
  {
    value: "stackOverflowId",
    label: "StackOverflowId",
    in: true,
    out: true
  },
  {
    value: "stackOverflowUrl",
    label: "StackOverflowUrl",
    in: true,
    out: true
  },
  {
    value: "tags",
    label: "Tags",
    in: true,
    out: true,
    type: "array"
  },
  {
    value: "timeZone",
    label: "TimeZone",
    in: true,
    out: true
  },
  {
    value: "timeZoneIana",
    label: "TimeZone Iana",
    in: true,
    out: false
  },
  {
    value: "timeZoneInferred",
    label: "TimeZone Inferred",
    in: true,
    out: false
  },
  {
    value: "title",
    label: "Title",
    in: true,
    out: true
  },
  {
    value: "touchedAt",
    label: "Touched At",
    in: true,
    out: false,
    type: "datetime"
  },
  {
    value: "twitterUrl",
    label: "Twitter Url",
    in: true,
    out: true
  },
  {
    value: "twitterUsername",
    label: "Twitter Username",
    in: true,
    out: true
  },
  {
    value: "updatedAt",
    label: "Updated At",
    in: true,
    out: false,
    type: "datetime"
  },
  {
    value: "voipPhones",
    label: "Voip Phones",
    in: true,
    out: true,
    type: "array"
  },
  {
    value: "websiteUrl1",
    label: "Website Url1",
    in: true,
    out: true
  },
  {
    value: "websiteUrl2",
    label: "Website Url2",
    in: true,
    out: true
  },
  {
    value: "websiteUrl3",
    label: "Website Url3",
    in: true,
    out: true
  },
  {
    value: "workPhones",
    label: "Work Phones",
    in: true,
    out: true,
    type: "array"
  }
];

module.exports = PROSPECT_FIELDDEFS;
