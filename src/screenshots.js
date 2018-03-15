'use strict';

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

module.exports = async url => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // await page.emulate(devices['iPhone 6']);
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });
    const screenshot = await page.screenshot({ fullPage: true });
    await browser.close();
    return screenshot;
  } catch (err) {
    return err;
  }
};
