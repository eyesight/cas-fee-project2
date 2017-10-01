var gulp = require('gulp');
var sass = require('gulp-sass');
//var bump = require('gulp-bump');
//var fs = require('fs');
//var semver = require('semver');
//var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');

/*var getPackageJson = function () {
	return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};*/

gulp.task('sass', function() {
	return gulp.src('scss/style.scss')
		.pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
		.pipe(gulp.dest('css/'));
});

// bump versions on package
/*gulp.task('bump', function () {
	// read package.json
	var pkg = getPackageJson();

	// increment version
	var newVer = semver.inc(pkg.version, 'patch');

	// update version in package.json
	gulp.src(['./package.json'])
		.pipe(bump({version: newVer}))
		.pipe(gulp.dest('./'));

	// update version in functions.php to set version for styles and scripts
	return gulp.src(['./web/app/themes/boilerplate-bedrock/functions.php'])
		.pipe(replace(pkg.version, newVer))
		.pipe(gulp.dest('./web/app/themes/boilerplate-bedrock/'));
});*/

gulp.task('autoprefixer', function(){
    gulp.src('css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false,
            remove: false
        }))
        .pipe(gulp.dest('../src/css'))
});



//Watch task
gulp.task('default',function() {
    return gulp.watch('scss/**/*.scss',['sass']);
});
