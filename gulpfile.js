const gulp = require('gulp'); 
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create();  


function html() {
    return gulp.src('./*.html')
        .pipe(plumber())
                    .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));
}
  
function css() {
    return gulp.src('./styles/*.css')
          .pipe(plumber())
          .pipe(concat('bundle.css'))
                  .pipe(gulp.dest('dist/'))
            .pipe(browserSync.reload({stream: true}));
}

function images() {
    return gulp.src('./images/*.{jpg,png,svg,gif,ico,webp,avif}')
              .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.reload({stream: true}));
}

function clean() {
    return del('dist');
}

function watchFiles() {
    gulp.watch(['./*.html'], html);
    gulp.watch(['./styles/*.css'], css);
    gulp.watch(['./images/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
}

function serve() {
    browserSync.init({
      server: {
        baseDir: './dist'
      }
    });
} 

const build = gulp.series(clean, gulp.parallel(html, css, images));
const watchapp = parallel(build, watchFiles, serve); 
  
exports.clean = clean;  
exports.images = images;  
exports.css = css; 
exports.html = html;
exports.watchapp = watchapp;
exports.build = build; 
exports.default = watchapp; 