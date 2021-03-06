// @flow
import type { $Request, $Application } from "express";
import type {
  HullSegment,
  HullNotification,
  HullConnector,
  HullUserUpdateMessage,
  HullAccountUpdateMessage,
  HullClientConfiguration,
  HullEntityType,
  HullEntityClaims
} from "hull-client";

import type { HullHelperExtractRequestOptions } from "./helpers/extract-request";

const HullClient = require("hull-client/src");
const ConnectorCache = require("./infra/cache/connector-cache");
const MetricAgent = require("./infra/instrumentation/metric-agent");

/**
 * @module Types
 */

export type HullConnectorOptions = {
  hostSecret: string,
  port: number,
  clientConfig: HullClientConfiguration,
  instrumentation: Object,
  cache: Object,
  queue: Object,
  connectorName: string,
  segmentFilterSetting: any,
  skipSignatureValidation: boolean,
  notificationValidatorHttpClient?: Object,
  timeout: number | string,
  captureMetrics: Array<Object>,
  captureLogs: Array<any>,
  disableOnExit?: boolean
};

export type HullNotificationFlowControl = {
  type: "next" | "retry",
  size: number,
  in: number,
  in_time: number
};

export type HullClientCredentials = {
  id: $PropertyType<HullClientConfiguration, "id">,
  secret: $PropertyType<HullClientConfiguration, "secret">,
  organization: $PropertyType<HullClientConfiguration, "organization">
};

export type HullContextBase = {
  requestId?: string, // request id
  hostname: string, // req.hostname
  options: Object, // req.query
  isBatch: boolean,
  HullClient: typeof HullClient,

  connectorConfig: HullConnectorOptions, // configuration passed to Hull.Connector
  clientConfig: HullClientConfiguration, // configuration which will be applied to Hull Client

  cache: ConnectorCache,
  metric: MetricAgent,
  enqueue: (
    jobName: string,
    jobPayload?: Object,
    options?: Object
  ) => Promise<*>,

  clientCredentials?: HullClientCredentials, // HullClient credentials
  clientCredentialsToken?: string // encrypted token with HullClient credentials
};

export type HullContextWithCredentials = {
  ...$Exact<HullContextBase>,
  clientCredentials: HullClientCredentials, // HullClient configuration
  clientCredentialsToken?: string,

  connector?: HullConnector,
  usersSegments?: Array<HullSegment>,
  accountsSegments?: Array<HullSegment>
};

export type HullContextWithClient = {
  ...$Exact<HullContextWithCredentials>,
  clientCredentialsToken: string,
  client: HullClient,
  helpers: {
    settingsUpdate: (
      $PropertyType<HullConnector, "private_settings">
    ) => Promise<HullConnector>,
    extractRequest: HullHelperExtractRequestOptions => Promise<*>,
    incomingClaims: (
      HullEntityType,
      Object,
      ?{ anonymous_id_service: string, anonymous_id_prefix?: string }
    ) => {
      claims?: HullEntityClaims,
      error?: string
    }
  },
  notification?: HullNotification
};

/*
 * Context added to the express app request by hull-node connector sdk.
 * Accessible via `req.hull` param.
 * @public
 * @memberof Types
 */
export type HullContextFull = {
  ...$Exact<HullContextWithClient>,
  connector: HullConnector,
  usersSegments: Array<HullSegment>,
  accountsSegments: Array<HullSegment>,

  notification?: HullNotification,
  notificationResponse?: {
    flow_control: HullNotificationFlowControl
  },
  handlerName?: string
};

export type HullContext = HullContextFull;

export type HullRequestBase = {
  ...$Request,
  headers: {
    [string]: string
  },
  hull: HullContextBase
};

export type HullRequestWithCredentials = {
  ...$Request,
  headers: {
    [string]: string
  },
  hull: HullContextWithCredentials
};

export type HullRequestWithClient = {
  ...$Request,
  headers: {
    [string]: string
  },
  hull: HullContextWithClient
};

/*
 * Since Hull Middleware adds new parameter to the Reuqest object from express application
 * we are providing an extended type to allow using HullReqContext
 * @public
 * @memberof Types
 */
export type HullRequestFull = {
  ...$Request,
  hull: HullContextFull
};

export type HullRequest = HullRequestFull;

// TODO: evolve this introducing envelope etc.
export type HullSendResponse = Promise<*>;
export type HullSyncResponse = Promise<*>;

// OOP types
export interface HullSyncAgent {
  constructor(ctx: HullContextFull): void;
  sendUserUpdateMessages(
    messages: Array<HullUserUpdateMessage>
  ): HullSendResponse;
  sendAccountUpdateMessages(
    messages: Array<HullAccountUpdateMessage>
  ): HullSendResponse;
  syncConnectorUpdateMessage(): HullSyncResponse;
  syncSegmentUpdateMessage(): HullSyncResponse;
}

export type HullServerFunction = (
  app: $Application,
  extra?: Object
) => $Application;

export type HullNormalizedHandlersConfigurationEntry<Callback, Options> = {
  callback: Callback,
  options: Options
};

export type HullNormalizedHandlersConfiguration<Callback, Options> = {
  [HullChannelName: string]: HullNormalizedHandlersConfigurationEntry<
    Callback,
    Options
  >
};

export type HullHandlersConfigurationEntry<Callback, Options> =
  | Callback
  | HullNormalizedHandlersConfigurationEntry<Callback, Options>;

export type HullHandlersConfiguration<Callback, Options> = {
  [HullChannelName: string]: HullHandlersConfigurationEntry<Callback, Options>
};

export type HullConnectorSettingsTraitMapping = Array<{
  hull?: string,
  service?: string,
  name?: string,
  overwrite?: boolean
}>;

export type HullIncomingClaimsSetting = {
  hull?: string,
  service?: string,
  required?: boolean
};
