var gulp = require('gulp');
var gutil = require('gulp-util');
var child_process = require('child_process');
var process = require('process');

function make (target, cb) {
    var cl = ('node make.js ' + target + ' ' + process.argv.slice(3).join(' ')).trim();
    console.log('------------------------------------------------------------');
    console.log('> ' + cl);
    console.log('------------------------------------------------------------');
    try {
        child_process.execSync(cl, { cwd: __dirname, stdio: 'inherit' });
    }
    catch (err) {
        var msg = err.output ? err.output.toString() : err.message;
        console.error(msg);
        cb(new gutil.PluginError(msg));
        return false;
    }

    return true;
}

gulp.task('build', function (cb) {
    make('build', cb);
});

gulp.task('default', ['build']);