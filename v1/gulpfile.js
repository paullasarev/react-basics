
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var mkdirp = require('mkdirp');
var yargs = require('yargs');

var dirs = {
  src: './src',
  dest: './dev',
}

if (yargs.dist)
  dirs.dest = './dist';

var opt = {
  src: {
    js: {
      all: dirs.src + '/js/**/*.jsx',
      app: dirs.src + '/js/app.jsx',
    },
    html: {
     all: [dirs.src + '/**/*.html'],
    },
    libs: [
      'bower_components/react/react.js',
      'bower_components/react/react-dom.js',
    ],
    scss: [
      dirs.src + '/style/app.scss',
    ]
  } ,
  dest: {
    root: dirs.dest,
    js: dirs.dest + '/js',
    css: dirs.dest + '/style',
    html: dirs.dest,
  },  
}

var autoprefixerBrowsers = [
  'ie >= 10',
//  'ie_mob >= 10',
  'ff >= 35',
  'chrome >= 40',
//  'safari >= 7',
//  'opera >= 23',
  'ios >= 7.1',
  'android >= 4.4',
//  'bb >= 10'
];

var errorHandler = function(err){
  console.log(err.message);
  this.end();
}

gulp.task('html', function() {
  return gulp.src(opt.src.html.all)
    .pipe(gulp.dest(opt.dest.html))
})

gulp.task('html:watch', ['html'], function() {
  gulp.watch(opt.src.html.all, ['html'])
})

gulp.task('webserver', function() {
  gulp.src(opt.dest.root)
    .pipe(webserver({
      livereload: true,
      directoryListing: {
        enable:true,
        path:opt.dest.root,
      },
      open: true,
    }));
});

gulp.task('js', function() {
 return gulp.src(opt.src.js.all)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['react']
    }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(opt.dest.js));
})

gulp.task('js:watch', ['js'], function() {
  gulp.watch(opt.src.js.all, ['js'])
})

gulp.task('libs', function() {

  return gulp.src(opt.src.libs)
    .pipe(sourcemaps.init())
    .pipe(concat('libs.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(opt.dest.js))
})


gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('styles', function () {
  return  gulp.src(opt.src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerBrowsers))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(opt.dest.css));
});

gulp.task('styles:watch', ['styles'], function() {
  gulp.watch(opt.src.scss, ['styles']);
})

gulp.task('build', ['libs', 'html', 'js', 'styles', 'webserver'])

gulp.task('serve', ['libs', 'html:watch', 'js:watch', 'styles:watch', 'webserver'])

