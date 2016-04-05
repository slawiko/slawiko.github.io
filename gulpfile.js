'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const debug = require('gulp-debug');
const insert = require('gulp-insert');
const shell = require('gulp-shell');
const del = require('del');

const pubDir = '_site';


gulp.task(function clean() {
	return del(pubDir);
});

gulp.task(function clean_styles() {
	return del(pubDir + '/css');
});

gulp.task(function clean_scripts() {
	return del(pubDir + '/js');
});

gulp.task(function styles() {
	return gulp.src(['_scss/*.scss'])
		.pipe(debug())
		.pipe(sass())
		.pipe(gulp.dest(pubDir + '/css'));
});

gulp.task(function scripts() {
	return gulp.src(['js/*.js'])
		.pipe(debug())
		.pipe(gulp.dest(pubDir + '/js'));
});

gulp.task(function watch() {
	gulp.watch('_scss/*.scss', gulp.series(
		'clean_styles',
		'styles'
	));
	gulp.watch('js/*.js', gulp.series(
		'clean_scripts',
		'scripts'
	));
	gulp.watch('./*.html', gulp.series(
		'jekyll'
	));
});

gulp.task(function browser_sync() {
	browserSync.init({
		server: pubDir
	});

	browserSync.watch(pubDir).on('change', browserSync.reload);
});

gulp.task('jekyll', shell.task(['jekyll build']));

gulp.task('build', gulp.series(
	'clean',
	'jekyll',
	'styles',
	gulp.parallel('browser_sync', 'watch')
));