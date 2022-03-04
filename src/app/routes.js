const WordsController = require("./controllers/words");

function wordsRoutes(fastify, _options, done) {
    fastify.register(WordsController, { prefix: "/v1" });
    done();
  }

module.exports = wordsRoutes;

