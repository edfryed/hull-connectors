// @flow
const { Writable } = require("stream");
const debug = require("debug")("hull:promise-to-writable-stream");

/**
 * A helper function which allows to easily pipe any stream into a promise.
 * This promise will be called with every chunk of the stream,
 * and when it resolves next chunk will be passed into it if there is anything else to process.
 * When the promise rejects error will be passed to the wrapping stream as an error event.
 */
function promiseToWritableStream(
  promise: (chunk: any, encoding?: string) => Promise<any>
): Writable {
  return new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
      debug("writing to a promise");
      try {
        promise(chunk, encoding)
          .then(() => {
            debug("promise resolved");
            callback();
          })
          .catch(error => {
            debug("promise rejected", error);
            callback(error);
          });
      } catch (error) {
        debug("error thrown", error);
        callback(error);
      }
    }
  });
}
module.exports = promiseToWritableStream;
