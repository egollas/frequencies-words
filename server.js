const build = require('./app');

const start = async () => {
  const fastify = await build({});

  try {
    fastify.listen(8080);
  } catch (error) {
    console.log(error);
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
