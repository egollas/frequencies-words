require('dotenv').config({
    path: `.env${process.env.NODE_ENV && `.${process.env.NODE_ENV}`}`,
  });


  async function build(opts = {}) {
    const fastify = require('fastify')({ logger: true, ...opts });

    fastify.register(require('fastify-multipart'));
    fastify.register(require('fastify-swagger'), {
      exposeRoutes: true,
      routePrefix: '/docs',
      swagger: {
        info: { title: 'fastify-api' },
      },
    });
    fastify.register(require('./src/app/routes'));
    return fastify;
  }

  module.exports = build;
