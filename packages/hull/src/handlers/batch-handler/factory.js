// @flow
import type {
  HullUserUpdateMessage,
  HullAccountUpdateMessage
} from "hull-client";
import type { HullHandlersConfiguration, HullContextFull } from "../../types";

export type HullBatchHandlerOptions = {
  maxSize?: number
};

type HullBatchHandlerUserUpdateCallback = (
  ctx: HullContextFull,
  messages: Array<HullUserUpdateMessage>
) => Promise<*>;

type HullBatchHandlerAccountUpdateCallback = (
  ctx: HullContextFull,
  messages: Array<HullAccountUpdateMessage>
) => Promise<*>;

export type HullBatchHandlerCallback =
  | HullBatchHandlerUserUpdateCallback
  | HullBatchHandlerAccountUpdateCallback;

type HullBatchHandlerConfiguration = HullHandlersConfiguration<
  HullBatchHandlerCallback,
  HullBatchHandlerOptions
>;

const { Router } = require("express");

const {
  credentialsFromQueryMiddleware,
  clientMiddleware,
  timeoutMiddleware,
  haltOnTimedoutMiddleware,
  fullContextBodyMiddleware,
  fullContextFetchMiddleware,
  instrumentationContextMiddleware,
  instrumentationTransientErrorMiddleware
} = require("../../middlewares");
const { normalizeHandlersConfiguration } = require("../../utils");

const processingMiddleware = require("./processing-middleware");
const errorMiddleware = require("./error-middleware");

/**
 * [notificationHandlerFactory description]
 * @param  {HullNotificationHandlerConfiguration} configuration: HullNotificationHandlerConfiguration [description]
 * @return {[type]}                [description]
 * @example
 * app.use("/batch", notificationHandler({
 *   "user:update": (ctx, message) => {}
 * }));
 */
function batchExtractHandlerFactory(
  configuration: HullBatchHandlerConfiguration
): * {
  const router = Router();
  const normalizedConfiguration = normalizeHandlersConfiguration(configuration);
  router.use(timeoutMiddleware());
  router.use(credentialsFromQueryMiddleware()); // parse query
  router.use(clientMiddleware()); // initialize client
  router.use(haltOnTimedoutMiddleware());
  router.use(instrumentationContextMiddleware({ handler: "batch" }));
  router.use(
    fullContextBodyMiddleware({ requestName: "batch", strict: false })
  ); // get rest of the context from body
  router.use(fullContextFetchMiddleware({ requestName: "batch" })); // if something is missing at body
  router.use(haltOnTimedoutMiddleware());
  router.use(processingMiddleware(normalizedConfiguration));
  router.use(instrumentationTransientErrorMiddleware());
  router.use(errorMiddleware());
  return router;
}

module.exports = batchExtractHandlerFactory;
