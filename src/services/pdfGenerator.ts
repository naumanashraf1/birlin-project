import { NextFunction } from 'express';
import puppeteer, { BoundingBox, Browser } from 'puppeteer';
import ErrorHandler from '../utils/ErrorHandler';
import { waitForDOMStable } from '../utils/DomRendered';
const minimal_args = [
  '--autoplay-policy=user-gesture-required',
  '--disable-background-networking',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-domain-reliability',
  '--disable-extensions',
  '--disable-features=AudioServiceOutOfProcess',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-popup-blocking',
  '--disable-prompt-on-repost',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
];
let browser: Browser;
(async () => {
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disabled-setupid-sandbox'],
    });
  } catch (error) {
    console.log(error);
  }
})();
export const pdfMaker = async function (
  data: string,
  numDivs: number, // The number of divs to render on a page
  next: NextFunction
): Promise<Buffer> {
  return new Promise(async (res, rej) => {
    try {
      const page = await browser.newPage();
      await page?.setContent(data, {
        waitUntil: ['domcontentloaded', 'load', 'networkidle0'],
      });
      await waitForDOMStable(page);

      const divs = await page.$$('.wrapper > div'); // Select all the divs within the .wrapper

      for (let i = 0; i < divs.length; i++) {
        // Hide all divs initially
        await divs[i].evaluate((el: any) => (el.style.display = 'none'));
      }

      for (let i = 0; i < numDivs; i++) {
        // Show only the divs you want to include on the current page
        if (divs[i]) {
          await divs[i].evaluate((el: any) => (el.style.display = 'block'));
        }
      }

      const buffer: Buffer = await page.pdf({
        format: 'A4',
        preferCSSPageSize: true,
        printBackground: true,
      });

      // Restore the initial state (hide all divs)
      for (let i = 0; i < divs.length; i++) {
        await divs[i].evaluate((el: any) => (el.style.display = 'block'));
      }

      await page.close();
      res(buffer);
    } catch (e) {
      console.log(e);
      next(new ErrorHandler('problem in pdf generation', 400));
    }
  });
};
