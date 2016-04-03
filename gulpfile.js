'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


gulp.task('styles', function() {
	return  gulp.src('develop/stylesheets/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('stylesheets'));
});

gulp.watch('develop/stylesheets/*', gulp.series('styles'));

gulp.task('serve', function() {
	browserSync.init({
		server: '.'
	});
});
