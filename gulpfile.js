'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const debug = require('gulp-debug');
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

gulp.task(function clean_assets() {
	return del(pubDir + '/assets');
});

gulp.task(function styles() {
	return gulp.src(['_scss/*.scss'])
		.pipe(debug())
		.pipe(sass())
		.pipe(gulp.dest('css'));
});

gulp.task(function scripts() {
	return gulp.src(['js/*.js'])
		.pipe(debug())
		.pipe(gulp.dest(pubDir + '/js'));
});

gulp.task(function assets() {
	return gulp.src(['assets/*.*'])
		.pipe(debug())
		.pipe(gulp.dest(pubDir + '/assets'));
});

gulp.task(function watch() {
	gulp.watch('_scss/*.scss', gulp.series(
		'styles',
		'jekyll'
	));
	gulp.watch('js/*.js', gulp.series(
		'clean_scripts',
		'scripts'
	));
	gulp.watch('assets/*.*', gulp.series(
		'clean_assets',
		'assets'
	));
	gulp.watch('./*.html', gulp.series(
		'jekyll'
	));

	browserSync.watch(pubDir).on('change', browserSync.reload);
});

gulp.task(function browser_sync() {
	browserSync.init({
		server: pubDir
	});
});

gulp.task('jekyll', shell.task(['jekyll build']));

gulp.task('build', gulp.series(
	'clean',
	'styles',
	'jekyll',
	gulp.parallel('browser_sync', 'watch')
));