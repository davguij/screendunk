require('make-promises-safe'); // installs an 'unhandledRejection' handler

const fastify = require('fastify')();
const devices = require('puppeteer/DeviceDescriptors');

const validator = require('./validator');
const screenshot = require('./screenshoter');
const deviceSchema = require('./device-schema');

fastify.get('/status', (request, reply) => {
  reply.send({ status: 'All good!' });
});

fastify.get(
  '/screenshot',
  { schema: validator.screenshotValidator },
  async (request, reply) => {
    let emulateSettings;
    if (request.query.device) {
      const device = validator.deviceValidator(request.query.device);
      if (device === undefined) {
        reply.code(400);
        return new Error('Device not supported');
      } else {
        emulateSettings = device;
      }
    } else {
      emulateSettings = {
        userAgent: request.req.headers['user-agent'],
        viewport: { width: 1280, height: 800 },
      };
    }
    try {
      reply.type('image/png').code(200);
      return screenshot(request.query.url, emulateSettings);
    } catch (e) {
      reply.code(400);
      return e;
    }
  }
);

fastify.get('/devices', deviceSchema, (request, reply) => {
  reply.send(devices);
});

fastify.listen(process.env.PORT || 3001, '0.0.0.0', err => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
