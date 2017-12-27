const PixelDiff = require('pixel-diff');
const path = require('path');

const diffLogin = new PixelDiff({
    imageAPath: 'school_logindesktop.png',
    imageBPath: 'school_logindesktop_reference.png',

    thresholdType: PixelDiff.THRESHOLD_PERCENT,
    threshold: 0.01, // 1% threshold

    imageOutputPath: 'diff_logindesktop.png'
});
const diffDashboard = new PixelDiff({
    imageAPath: 'school_dashboarddesktop_reference.png',
    imageBPath: 'school_dashboarddesktop_reference.png',

    thresholdType: PixelDiff.THRESHOLD_PERCENT,
    threshold: 0.01, // 1% threshold

    imageOutputPath: 'diff_dashboarddesktop.png'
  });
const diffProfile = new PixelDiff({
  imageAPath: 'school_profiledesktop.png',
  imageBPath: 'school_profiledesktop_reference.png',

  thresholdType: PixelDiff.THRESHOLD_PERCENT,
  threshold: 0.01, // 1% threshold

  imageOutputPath: 'diff_profiledesktop.png'
});

const diffLoginMobile = new PixelDiff({
  imageAPath: 'school_loginmobile.png',
  imageBPath: 'school_loginmobile_reference.png',

  thresholdType: PixelDiff.THRESHOLD_PERCENT,
  threshold: 0.01, // 1% threshold

  imageOutputPath: 'diff_loginmobile.png'
});
const diffDashboardMobile = new PixelDiff({
  imageAPath: 'school_dashboardmobile.png',
  imageBPath: 'school_dashboardmobile_reference.png',

  thresholdType: PixelDiff.THRESHOLD_PERCENT,
  threshold: 0.01, // 1% threshold

  imageOutputPath: 'diff_dashboardmobile.png'
});
const diffProfileMobile = new PixelDiff({
  imageAPath: 'school_profilemobile.png',
  imageBPath: 'school_profilemobile_reference.png',

  thresholdType: PixelDiff.THRESHOLD_PERCENT,
  threshold: 0.01, // 1% threshold

  imageOutputPath: 'diff_profilemobile.png'
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

diffProfile.run((error, result) => {
  if (error) {
    throw error;
  } else {
    console.log(diffProfile.hasPassed(result.code) ? 'Passed' : 'Failed');
console.log('Found ' + result.differences + ' differences.');
}
});

diffLoginMobile.run((error, result) => {
  if (error) {
    throw error;
  } else {
    console.log(diffLoginMobile.hasPassed(result.code) ? 'Passed' : 'Failed');
console.log('Found ' + result.differences + ' differences.');
}
});

diffDashboardMobile.run((error, result) => {
  if (error) {
    throw error;
  } else {
    console.log(diffDashboardMobile.hasPassed(result.code) ? 'Passed' : 'Failed');
console.log('Found ' + result.differences + ' differences.');
}
});

diffProfileMobile.run((error, result) => {
  if (error) {
    throw error;
  } else {
    console.log(diffProfileMobile.hasPassed(result.code) ? 'Passed' : 'Failed');
console.log('Found ' + result.differences + ' differences.');
}
});
