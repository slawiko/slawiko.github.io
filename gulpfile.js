'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();


gulp.task('styles', function() {
	return  gulp.src('develop/css/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('_site/css'));
});

gulp.watch('develop/css/*', gulp.series('styles'));

gulp.task('serve', function() {
	browserSync.init({
		server: '.'
	});
});
