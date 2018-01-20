const puppeteer = require('puppeteer');

(async () => {
  const screensizes = [{name: 'desktop', height: 1000, width: 1200}, {name: 'mobile', height: 1500, width: 480}];

  for(var i = 0; i < screensizes.length; i++){
    let  x = screensizes[i];
   console.log(x.name);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
    width: x.width,
    height: x.height
   });

    await page.goto('http://localhost:4200');
    await page.waitFor(2000);

    await page.screenshot({
      path: 'school_login'+x.name+'.png'
    });

    await page.waitFor(2000);
    await page.type('#email','test@test.com');
    await page.type('#password','test99!');

    await page.click('.zz-btn.zz-btn--primary');

    await page.waitFor(2000);

    await page.screenshot({
      path: 'school_dashboard'+x.name+'.png'
    });
    await page.waitFor(2000);
    if(x.name === 'desktop'){
      await page.click('.zz-nav__image');
      await page.click('.zz-nav__dropdown-menu-item:first-child');
    } else{
      await page.click('.zz-navbar__button');
      await page.click('.zz-nav__list-group-item .zz-nav__dropdown-menu-item:nth-of-type(1)');
    }

    await page.waitFor(2000);
    await page.screenshot({
      path: 'school_profile'+x.name+'.png'
    });
    await browser.close();
}
})();
