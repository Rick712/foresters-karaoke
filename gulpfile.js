var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function (done) { 
  gulp.src('public/**/style.scss') 
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/style/')); 
    done()
});

gulp.task('watch', () => {
  gulp.watch('public/**/*.scss', gulp.series('sass')); 
  // Other watchers
})