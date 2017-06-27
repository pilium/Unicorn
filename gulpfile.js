var gulp = require('gulp'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  del = require('del'),
  imagemin = require('gulp-imagemin'),
  spritesmith = require('gulp.spritesmith'),
  cache = require('gulp-cache'),
  autoprefixer = require('gulp-autoprefixer'),
  ftp = require('vinyl-ftp'),
  notify = require('gulp-notify');

// Скрипты проекта

// Работа с Pug
gulp.task('pug', function() {
  return gulp.src('app/pug/pages/*.pug')
		.pipe(plumber())
		.pipe(pug({
  pretty: true //минификация: False
}))
		.on('error', notify.onError(function(error) {
  return 'Message to the notifier: ' + error.message;
}))
		.pipe(gulp.dest('app'));
});

gulp.task('js', function() {
  return gulp.src([
    'app/libs/bxslider-4/dist/jquery.bxslider.min.js',
    'app/libs/wow/dist/wow.min.js',
    'app/libs/slick-carousel/slick/slick.min.js',
    'app/js/common.js' // Всегда в конце
  ])
		.pipe(plumber())
		.pipe(concat('scripts.min.js'))
		.pipe(uglify()) // Минимизировать весь js (на выбор)
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
  });
});

gulp.task('sass', function() {
  return gulp.src('app/sass/main.sass')
		.pipe(sass({outputStyle: 'expand'}).on('error', notify.onError()))
		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS()) // Опционально, закомментировать при отладке
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['pug', 'sass', 'js', 'browser-sync'], function() {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/pug/**/*.pug', ['pug']);
  gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
  gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
  return gulp.src('app/img/**/*')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('dist/img'));
});

// Сборка спрайтов PNG
gulp.task('cleansprite', function() {
  return del.sync('app/img/sprite/sprite.png');
});

gulp.task('spritemade', function() {
  var spriteData =
			gulp.src('app/img/sprite/*.*')
				.pipe(spritesmith({
  imgName: '../img/sprite/sprite.png',
  cssName: '_sprite.sass',
  padding: 15,
  cssFormat: 'sass',
  algorithm: 'binary-tree',

}));

  spriteData.img.pipe(rename('sprite.png')).pipe(gulp.dest('app/img/sprite/')); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest('app/sass/')); // путь, куда сохраняем стили
});
gulp.task('sprite', ['cleansprite', 'spritemade']);


gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

  var buildFiles = gulp.src([
    'app/*.html',
  ]).pipe(gulp.dest('dist'));

  var buildAccess = gulp.src([
    'app/.htaccess',
  ]).pipe(gulp.dest('dist'));

  var buildCss = gulp.src([
    'app/css/main.min.css',
  ]).pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src([
    'app/js/scripts.min.js',
  ]).pipe(gulp.dest('dist/js'));

  var buildFonts = gulp.src([
    'app/fonts/**/*',
  ]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function() {

  var conn = ftp.create({
    host: 'hostname.com',
    user: 'username',
    password: 'userpassword',
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    'dist/**',
    'dist/.htaccess',
  ];
  return gulp.src(globs, {buffer: false})
		.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function() {
  return del.sync('dist');
});
gulp.task('clearcache', function() {
  return cache.clearAll();
});

gulp.task('default', ['watch']);
