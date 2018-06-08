'use strict';

const	gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
	gulp.src('./dist/scss/**/*.scss')
	
	.pipe(sass({
		// outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))	
	.pipe(gulp.dest('./css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./dist/**/*.scss', ['sass']);
});
