

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    ts = require('gulp-typescript');

//var tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function() {
   console.log('Compiling TypeScript');
    var tsResult = tsProject.src({base: './'}) // instead of gulp.src(...)
        .pipe(ts(tsProject));
    return tsResult.js.pipe(gulp.dest('./'));
});

//gulp.task('serve', ['typescript'], function () {
gulp.task('default', function () {	
  	//gulp.watch('./**/*.ts', ['typescript']);

  	livereload.listen();
	  
	nodemon({
		script: './index.js',
		ext: 'js html',
	}).on('restart', function () {
		setTimeout(function () {
			console.log("reload!");
			livereload.reload();
		}, 1000);
	});
	
});

