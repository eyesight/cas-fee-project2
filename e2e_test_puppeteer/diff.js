const PixelDiff = require('pixel-diff');
const path = require('path');

const diffLogin = new PixelDiff({
    imageAPath: 'school_login.png',
    imageBPath: 'school_login_reference.png',

    thresholdType: PixelDiff.THRESHOLD_PERCENT,
    threshold: 0.01, // 1% threshold

    imageOutputPath: 'diff_login.png'
});
const diffDashboard = new PixelDiff({
    imageAPath: 'school_dashboard.png',
    imageBPath: 'school_dashboard_reference.png',

    thresholdType: PixelDiff.THRESHOLD_PERCENT,
    threshold: 0.01, // 1% threshold

    imageOutputPath: 'diff_dashboard.png'
  });

diffLogin.run((error, result) => {
    if (error) {
        throw error;
    } else {
        console.log(diffLogin.hasPassed(result.code) ? 'Passed' : 'Failed');
        console.log('Found ' + result.differences + ' differences.');


    }
});

diffDashboard.run((error, result) => {
  if (error) {
    throw error;
  } else {
    console.log(diffDashboard.hasPassed(result.code) ? 'Passed' : 'Failed');
    console.log('Found ' + result.differences + ' differences.');


  }
});
