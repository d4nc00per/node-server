var jshint = require('gulp-jshint'),
path = require('path'),
less = require('gulp-less'),
recess = require('gulp-recess'),
exec = require('gulp-exec'),
gutil = require('gulp-util'),
gulp = require('gulp'),
spawn = require('child_process').spawn,
node,
mongo;

function errorLogHandler(msg){
	gutil.log(gutil.colors.red(msg));
	gutil.beep();
}

gulp.task('js', function() {
	gulp.src('./static/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('less', function() {
	gulp.src('./static/css/*.less')
		.pipe(less())
		.on('error', errorLogHandler)
		.pipe(recess.reporter())
		.pipe(gulp.dest('./static/css'));
});

process.on('exit', function() {
	if (node) node.kill();
	if (mongo) mongo.kill();
})

gulp.task('node', function () {
	if (node) node.kill();

	node = spawn('node', ['node-server.js'], {stdio: 'inherit'});

	node.on('close', function (code) {
		if (code === 8) {
			errorLogHandler('Error detected, waiting for changes...');
		}
	});
});

gulp.task('mongo', function () {
	if (node) node.kill();

	node = spawn('mongod', ['-dbpath','G:\\data\\db'], {stdio: 'inherit'});

	node.on('close', function (code) {
		if (code === 8) {
			errorLogHandler('Error detected, waiting for changes...');
		}
	});
});

gulp.task('watch', function() {
	gulp.watch('./static/js/*.js', ['js'])
	gulp.watch('./static/css/*.less', ['less'])
	gulp.watch('./*.js', ['node'])
});

gulp.task('default', ['js', 'less', 'node', 'watch']);