const getHighFrecuencyWords= require("../services/wordService");
const {InvalidFileExt} = require("../errors/index");

async function create(req, reply) {
  try {
    const files = await req.saveRequestFiles()
    let {filepath, fields: {topN: {value:topN = 3} = {}} = {}} = files[0]
    const result  = await getHighFrecuencyWords(filepath, Number(topN))

    reply.send(result);
  } catch(error){
    if (error instanceof InvalidFileExt) {
      return  reply.send({error: error.toString()});
    }

    throw error;
  }
}

module.exports = async (fastify) => {
    fastify.route({
      method: "POST",
      url: "/",
      handler: create,
    });
  };

