const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //console.log(browser.longDesc);
  await page.goto('http://localhost:4200');
  await page.waitFor(2000);
 // await page.click('.zz-btn.zz-btn--primary');
 // await page.click('.zz-nav__button');
  // await page.href(http://localhost:4200/profile);
 // await page.waitFor(2000);
  await page.screenshot({
    path: 'school_login.png'
  });

  await page.waitFor(2000);
 // await page.focus('#email');
  await page.type('#email','test@test.com');
 // await page.focus('#password');
  await page.type('#password','test99!');

  await page.click('.zz-btn.zz-btn--primary');
  // await page.click('.zz-nav__button');
  // await page.href(http://localhost:4200/profile);
  await page.waitFor(5000);

  await page.screenshot({
    path: 'school_dashboard.png'
  });

  await browser.close();
})();
