module.exports = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            userAgent: {
              type: 'string',
            },
            viewport: {
              type: 'object',
              properties: {
                width: { type: 'number' },
                height: { type: 'number' },
                deviceScaleFactor: { type: 'number' },
                isMobile: { type: 'boolean' },
                hasTouch: { type: 'boolean' },
                isLandscape: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
  },
};
