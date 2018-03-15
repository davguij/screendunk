const fastify = require('fastify')();
const screenshot = require('./screenshots');

fastify.get('/api/v1/status', (request, reply) => {
  reply.send({ status: 'All good!' });
});

fastify.get('/screenshot', async (request, reply) => {
  console.log(request.query.url);
  try {
    reply.type('image/png').code(200);
    return screenshot(request.query.url);
  } catch (e) {
    reply.code(500);
    return e;
  }
});

fastify.listen(process.env.PORT || 3000, '0.0.0.0', err => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
