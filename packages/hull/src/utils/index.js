// @flow
/**
 * General utilities
 * @namespace Utils
 * @public
 */
module.exports.normalizeHandlersConfigurationEntry = require("./normalize-handlers-configuration-entry");
module.exports.normalizeHandlersConfiguration = require("./normalize-handlers-configuration");

module.exports.staticRouter = require("./static-router");
module.exports.PromiseReuser = require("./promise-reuser");
module.exports.onExit = require("./on-exit");

module.exports.notificationDefaultFlowControl = require("./notification-default-flow-control");
module.exports.NotificationValidator = require("./notification-validator");

module.exports.superagentUrlTemplatePlugin = require("./superagent-url-template-plugin");
module.exports.superagentInstrumentationPlugin = require("./superagent-intrumentation-plugin.js");
module.exports.superagentErrorPlugin = require("./superagent-error-plugin.js");

module.exports.devMode = require("./dev-mode");

module.exports.pipeStreamToPromise = require("./pipe-stream-to-promise");
module.exports.promiseToReadableStream = require("./promise-to-readable-stream");
module.exports.promiseToWritableStream = require("./promise-to-writable-stream");
module.exports.promiseToTransformStream = require("./promise-to-transform-stream");

module.exports.extractStream = require("./extract-stream");
module.exports.trimTraitsPrefixFromUserMessage = require("./trim-traits-prefix-from-user-message");
module.exports.applyConnectorSettingsDefaults = require("./apply-connector-settings-defaults");
module.exports.trimTraitsPrefixFromConnector = require("./trim-traits-prefix-from-connector");
