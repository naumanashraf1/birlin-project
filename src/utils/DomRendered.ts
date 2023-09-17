import Puppeteer, { Page } from 'puppeteer';

export const waitForDOMStable = (
  page: Page,
  options = { timeout: 10000, idleTime: 1000 }
) =>
  page.evaluate(
    ({ timeout, idleTime }) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          observer.disconnect();
          const msg =
            `timeout of ${timeout} ms ` +
            'exceeded waiting for DOM to stabilize';
          reject(Error(msg));
        }, timeout);
        const observer = new MutationObserver(() => {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(finish, idleTime);
        });
        const config = {
          attributes: true,
          childList: true,
          subtree: true,
        };
        observer.observe(document.body, config);
        const finish = () => {
          observer.disconnect();
          resolve(2);
        };
        let timeoutId = setTimeout(finish, idleTime);
      }),
    options
  );
