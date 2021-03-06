// @flow
import type {
  HullHandlersConfigurationEntry,
  HullNormalizedHandlersConfigurationEntry
} from "../types";

function parseHandlersConfigurationEntry<C, O>(
  configurationEntry: HullHandlersConfigurationEntry<C, O>
): HullNormalizedHandlersConfigurationEntry<C, O> {
  let callback: C | void;
  // $FlowFixMe
  let options: O = {};
  if (typeof configurationEntry === "function") {
    callback = configurationEntry;
  } else if (
    configurationEntry &&
    typeof configurationEntry === "object" &&
    typeof configurationEntry.callback === "function"
  ) {
    callback = configurationEntry.callback;
    options =
      typeof configurationEntry.options === "object" &&
      configurationEntry.options !== null
        ? configurationEntry.options
        : {};
  }
  if (callback === undefined) {
    throw new Error("Callback is missing in handler configuration entry");
  }

  return {
    callback,
    options
  };
}

module.exports = parseHandlersConfigurationEntry;
