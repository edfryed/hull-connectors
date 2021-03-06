/* @flow */
import type { HullContext } from "hull";

/**
 * Queue SyncOut and SyncIn jobs here. We cannot guarantee the order
 * of these operations to be finished since both of them include
 * requesting userbase extract from Hull API and Mailchimp API.
 */
function syncOut(ctx: HullContext) {
  return ctx.enqueue("syncOut").then(() => {
    return "ok";
  });
}

module.exports = syncOut;
