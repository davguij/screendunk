'use strict';

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

module.exports = async (url, emulateSettings) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    // await page.emulate(devices['iPhone 6']);
    // 1280x800 by default
    await page.emulate(emulateSettings);
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
