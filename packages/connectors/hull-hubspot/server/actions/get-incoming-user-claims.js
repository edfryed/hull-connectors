/* @flow */
import type { HullContext } from "hull";

const SyncAgent = require("../lib/sync-agent");

function getIncomingUserClaims(ctx: HullContext) {
  const syncAgent = new SyncAgent(ctx);

  return syncAgent.getIncomingUserClaims();
}

module.exports = getIncomingUserClaims;
