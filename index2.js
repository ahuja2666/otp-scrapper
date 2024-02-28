const puppeteerVanilla = require('puppeteer')
const { addExtra } = require('puppeteer-extra')
const puppeteer = addExtra(puppeteerVanilla)

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
puppeteer.launch({ headless: false, args: ['--incognito'] }).then(async browser => {
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

  await page.waitForSelector('#flexCheckDefault');
  await page.waitForSelector('#flexCheck');

  // Check the checkboxes
  await page.evaluate(() => {
    document.querySelector('#flexCheckDefault').checked = true;
    document.querySelector('#flexCheck').checked = true;
  });
  const btn = '#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-register-section > form.as-email-form.mt-4.mt-md-7 > button'
  await page.waitForSelector(btn);
  await page.click(btn);
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
  const OTP = await page1.$eval('#templateBody > table > tbody > tr > td > table > tbody > tr > td > div > span > strong', element => element.textContent.trim());
  await page.bringToFront();
  await page.waitForSelector('#verification-code');
  await page.focus('#verification-code');
  await page.type('#verification-code', OTP, { delay: 100 });
  await page.waitForSelector('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-verify-section > form.as-verification-form > button');
  await page.click('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-verify-section > form.as-verification-form > button');
  await page.waitForSelector('#first-name')
  await page.focus('#first-name');
  await page.type('#first-name', "Random", { delay: 100 });
  await page.waitForSelector('#last-name')
  await page.focus('#last-name');
  await page.type('#last-name', "Text", { delay: 100 });
  await page.waitForSelector('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-set-name-section > form > button')
  await page.click('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-set-name-section > form > button')
  await page.waitForSelector('#set-pwd')
  await page.focus('#set-pwd');
  await page.type('#set-pwd', "Asdfg@#123", { delay: 100 });
  await page.waitForSelector('#confirm-pwd')
  await page.focus('#confirm-pwd');
  await page.type('#confirm-pwd', "Asdfg@#123", { delay: 100 });
  await page.waitForSelector('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-set-pwd > form.as-set-pwd-form.mt-5 > button')
  await page.click('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-set-pwd > form.as-set-pwd-form.mt-5 > button')
  await page.waitForSelector('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-success-section > button')
  await page.click('#create-account > div.container-fits-viewport-100.d-flex.bg-light > div.cart-width.px-1.px-sm-0 > div > div.pt-9.pt-md-6 > section.as-components.as-success-section > button')
  await page.waitForNavigation(),
    await page.goto('https://in.nothing.tech/pages/event?referral_code=Z6J6F3');
  await page.waitForSelector('#shopify-section-template--16089938133165__aero_referral_XwUdj8 > aero-referral > div.position-relative.aero-referral-template--16089938133165__aero_referral_XwUdj8.bg-dark.split-banner > div.position-relative.w-100.content-min-height > div > div.content-wrapper.row.justify-content-lg-end.align-items-lg-end.pt-0.pt-lg-4.pb-6.pb-lg-9.content-min-height.text-white > div > div.mt-5.mt-lg-6 > a.as-get-code-btn.btn.btn-content.btn-white.text-nowrap')
  await page.click('#shopify-section-template--16089938133165__aero_referral_XwUdj8 > aero-referral > div.position-relative.aero-referral-template--16089938133165__aero_referral_XwUdj8.bg-dark.split-banner > div.position-relative.w-100.content-min-height > div > div.content-wrapper.row.justify-content-lg-end.align-items-lg-end.pt-0.pt-lg-4.pb-6.pb-lg-9.content-min-height.text-white > div > div.mt-5.mt-lg-6 > a.as-get-code-btn.btn.btn-content.btn-white.text-nowrap')
  await page.waitForSelector('#phone2a-referral-template--16089938133165__aero_referral_XwUdj8 > div > div > div > div > div > div > div > div > div > div:nth-child(1) > div.mt-5.mt-md-6.d-block > div > div:nth-child(1) > button')
  // Close the browser
  // await browser.close();
});
