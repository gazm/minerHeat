require('coffee-script/register');

var fs          = require('fs');

var gulp        = require('gulp');
var gcoffee     = require('gulp-coffee');
var gcoffeelint = require('gulp-coffeelint');
var gwatch      = require('gulp-watch');
var gmocha      = require('gulp-mocha');

var paths = {
  coffee:     'src/*.coffee',
  js:         'lib/*.js',
  lib:        'lib/',
  mocha_opts: 'test/mocha.opts',
  tests:      'test/**/*.coffee'
};

gulp.task('coffee', function() {
  gulp.src(paths.coffee)
      .pipe(gcoffee({ bare: true }))
      .pipe(gulp.dest(paths.lib));
});

gulp.task('lint', function () {
    gulp.src(paths.coffee)
        .pipe(gcoffeelint())
        .pipe(gcoffeelint.reporter())
        .pipe(gcoffeelint.reporter('fail'))
        .on('error', function(err) {
            // do nothing
        });
});

gulp.task('mocha', function() {
    var mocha_opts = {};

    try {
        var opts = fs.readFileSync(paths.mocha_opts, 'utf8')
            .trim()
            .split(/\s+/);

        opts.forEach(function(val, indx, arry) {
            if (/^-.+?/.test(val)) {
                val = val.replace(/^-+(.+?)/, "$1");
                mocha_opts[val] = arry[indx + 1];
            }
        });
    } catch (err) {
      // ignore
    }

    return gwatch({ glob: paths.tests, read:false }, function(files) {
        files
          .pipe(gmocha(mocha_opts))
          .on('error', function(err) {
              if (!/tests? failed/.test(err.stack)) {
                  console.log(err.stack);
              }
          });
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.coffee, ['lint', 'coffee']);
  gulp.watch(paths.tests, ['mocha']);
});

gulp.task('default', ['watch', 'lint', 'mocha', 'coffee'], function() {
  // do nothing else
});
