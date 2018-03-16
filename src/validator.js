const devices = require('puppeteer/DeviceDescriptors');

const screenshotInputValidator = {
  querystring: {
    type: 'object',
    properties: {
      url: { type: 'string', format: 'uri' },
      device: { type: 'string' },
    },
    required: ['url'],
  },
};

const deviceValidator = requestedDevice => {
  return devices.find(device => {
    return device.name === requestedDevice;
  });
};

module.exports = { screenshotInputValidator, deviceValidator };
