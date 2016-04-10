var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function () {
    return gulp.src('spec/**/*_spec.js', {read: false})
        .pipe(mocha({reporter: 'spec', timeout: '15000'}));
});
