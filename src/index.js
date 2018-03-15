const fastify = require('fastify')();
const screenshot = require('./screenshoter');

fastify.get('/status', (request, reply) => {
  reply.send({ status: 'All good!' });
});

fastify.get('/screenshot', async (request, reply) => {
  const UA = request.req.headers['user-agent'];
  try {
    reply.type('image/png').code(200);
    return screenshot(request.query.url, UA);
  } catch (e) {
    reply.code(500);
    return e;
  }
});

fastify.listen(process.env.PORT || 3001, '0.0.0.0', err => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
