const puppeteerVanilla = require('puppeteer')
const { addExtra } = require('puppeteer-extra')
const puppeteer = addExtra(puppeteerVanilla)

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function performTask() {
  const browser = await puppeteer.launch({ headless: false, args: ['--incognito'] });
  const page1 = await browser.newPage();
  await page1.goto('https://m.kuku.lu/index.php')
  await page1.waitForSelector('#link_addMailAddrByAuto');
  await page1.click('#link_addMailAddrByAuto');
  await page1.waitForSelector('#area-confirm-dialog-button-ok')
  await page1.click('#area-confirm-dialog-button-ok')
  await page1.waitForSelector('#link_newaddr_copyaddr')
  await page1.waitForSelector('#area-newaddress-view-data > div > div.noticebox > u > b')
  const textContent = await page1.$eval('#area-newaddress-view-data > div > div.noticebox > u > b', element => element.textContent.trim());
  console.log(textContent, "textContent")
  await page1.waitForSelector('#link_newaddr_close')
  await page1.click('#link_newaddr_close')
  await page1.screenshot({ path: 'example1.png' });
  await page1.waitForSelector('#area-master > div > div > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > a > img')
  await page1.click('#area-master > div > div > div:nth-child(3) > div > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > a > img')
  await page1.waitForSelector('#image_reload');

  //
  const page = await browser.newPage();
  await page.goto('https://in.nothing.tech/account/register');
  await page.waitForSelector('#email-register');
  await page.focus('#email-register');
  await page.type('#email-register', textContent, { delay: 100 });
  await new Promise(resolve => setTimeout(resolve, 5000));

  await page.waitForSelector('#flexCheckDefault');
  await page.waitForSelector('#flexCheck');

  // Check the checkboxes
  await page.evaluate(() => {
    document.querySelector('#flexCheckDefault').checked = true;
    document.querySelector('#flexCheck').checked = true;
  });
  const btn = '#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-register-section > form.as-email-form.mt-4.mt-md-7 > button'
  await page.waitForSelector(btn);
  await new Promise(resolve => setTimeout(resolve, 5000));

  await page.click(btn);
  await new Promise(resolve => setTimeout(resolve, 5000));

  await page1.bringToFront();
  let id = null
  let foundId = false
  while (!foundId) {
    await page1.click('#image_reload');

    // Check if the target element is found
    foundId = await page1.evaluate(() => {
      console.log(window.mailnumlis)
      return window.mailnumlist;
    });
    if (foundId) {
      id = foundId;
    }

    await new Promise(resolve => setTimeout(resolve, 5000));
  }

  await page1.waitForSelector(`#link_maildata_${id}`)
  await page1.click(`#link_maildata_${id}`)
  await new Promise(resolve => setTimeout(resolve, 10000));


  await page.bringToFront();
  await page.waitForSelector('#verification-code');
  await page.focus('#verification-code');
  await new Promise(resolve => setTimeout(resolve, 10000));

  // await page.type('#verification-code', OTP, { delay: 100 });
  await page.waitForSelector('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-verify-section > form.as-verification-form > button');
  await page.click('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-verify-section > form.as-verification-form > button');
  await new Promise(resolve => setTimeout(resolve, 5000));

  await page.waitForSelector('#first-name')
  await page.focus('#first-name');
  await page.type('#first-name', "Random", { delay: 100 });
  await page.waitForSelector('#last-name')
  await page.focus('#last-name');
  await page.type('#last-name', "Text", { delay: 100 });
  await new Promise(resolve => setTimeout(resolve, 5000));

  await page.waitForSelector('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-set-name-section > form > button')
  await page.click('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-set-name-section > form > button')
  await page.waitForSelector('#set-pwd')
  await page.focus('#set-pwd');
  await page.type('#set-pwd', "Asdfg@#123", { delay: 100 });
  await page.waitForSelector('#confirm-pwd')
  await page.focus('#confirm-pwd');
  await page.type('#confirm-pwd', "Asdfg@#123", { delay: 100 });
  await new Promise(resolve => setTimeout(resolve, 5000));

  await page.waitForSelector('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-set-pwd > form.as-set-pwd-form.mt-5 > button')
  await page.click('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-set-pwd > form.as-set-pwd-form.mt-5 > button')
  await new Promise(resolve => setTimeout(resolve, 5000));

  await page.waitForSelector('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-success-section > button')
  await new Promise(resolve => setTimeout(resolve, 5000));

  await page.click('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-success-section > button')
  await page.waitForNavigation(),
    await page.goto('https://in.nothing.tech/pages/event?referral_code=Z6J6F3');
  await new Promise(resolve => setTimeout(resolve, 5000));

  await new Promise(resolve => setTimeout(resolve, 5000));

  await new Promise(resolve => setTimeout(resolve, 5000));


  await browser.close();

}

async function run() {
  while (true) {
    await performTask();
    // You can add a delay here if needed
    // await new Promise(resolve => setTimeout(resolve, delayInMillis));
  }
}

// Start running the task
run().catch(error => console.error(error));