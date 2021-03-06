/* @flow */
const Hull = require("hull");
const { Cache } = require("hull/src/infra");
const express = require("express");
const redisStore = require("cache-manager-redis");

const server = require("./server");

const {
  LOG_LEVEL,
  SHIP_CACHE_TTL = 180,
  CACHE_REDIS_URL,
  SECRET = "1234",
  PORT = 8082,
  OVERRIDE_FIREHOSE_URL,
  CLIENT_ID,
  CLIENT_SECRET
} = process.env;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error("some environment variables missing");
}

if (LOG_LEVEL) {
  Hull.Client.logger.transports.console.level = LOG_LEVEL;
}

let cache;
if (CACHE_REDIS_URL) {
  cache = new Cache({
    store: redisStore,
    url: CACHE_REDIS_URL,
    ttl: SHIP_CACHE_TTL
  });
}

const app = express();
const connector = new Hull.Connector({
  cache,
  hostSecret: SECRET,
  port: PORT,
  clientConfig: {
    firehoseUrl: OVERRIDE_FIREHOSE_URL
  }
});

connector.setupApp(app);
server(app);
connector.startApp(app);
