const NodeCache = require("node-cache");

// cria a instancia do NodeCache e define o tempo de cache para 30 segundos
module.exports = new NodeCache({ stdTTL: 30 });