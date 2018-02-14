var gulp = require('gulp'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    lineec = require('gulp-line-ending-corrector'),
    rename = require('gulp-rename'), // Renames files E.g. style.css -> style.min.css
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify');

gulp.task('browser-sync', function() {
    var files = [
        '**/*.php',
        '**/*.twig',
        '**/*.scss',
        '**/*.css',
        '**/*.js',
        '**/*.{png,jpg,gif}'
    ];
    browserSync.init(files, {

        // Read here http://www.browsersync.io/docs/options/
        proxy: 'ADD-PROXY.local',
        // Inject CSS changes
        injectChanges: true

    });
});

gulp.task('styles', function() {
    gulp.src('assets/stylesheets/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./assets/stylesheets/'));
});

// JS Options //

// JS Vendor related.
var jsVendorSrc             = './assets/scripts/vendors/*.js'; // Path to JS vendor folder.
var jsVendorDestination     = './assets/scripts/'; // Path to place the compiled JS vendors file.
var jsVendorFile            = 'vendors'; // Compiled JS vendors file name.

gulp.task( 'vendorsJs', function() {
    gulp.src( jsVendorSrc )
        .pipe( concat( jsVendorFile + '.js' ) )
        .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
        .pipe( gulp.dest( jsVendorDestination ) )
        .pipe( rename( {
            basename: jsVendorFile,
            suffix: '.min'
        }))
        .pipe( uglify() )
        .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
        .pipe( gulp.dest( jsVendorDestination ) )
        .pipe( notify( { message: 'TASK: Vendor File Compilation Completed!', onLast: true } ) );
});

// JS Library related.
var jsLibsSrc             = './assets/scripts/lib/*.js'; // Path to JS custom scripts folder.
var jsLibsDestination     = './assets/scripts/'; // Path to place the compiled JS custom scripts file.
var jsLibsFile            = 'scripts'; // Compiled JS custom file name.
// Default set to libs i.e. scripts.js.

gulp.task( 'libsJs', function() {
    gulp.src( jsLibsSrc )
        .pipe( concat( jsLibsFile + '.js' ) )
        .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
        .pipe( gulp.dest( jsLibsDestination ) )
        .pipe( rename( {
            basename: jsLibsFile,
            suffix: '.min'
        }))
        .pipe( uglify() )
        .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
        .pipe( gulp.dest( jsLibsDestination ) )
        .pipe( notify( { message: 'TASK: Scripts File Compilation Completed!', onLast: true } ) );
});




gulp.task('default',['browser-sync', 'vendorsJs', 'libsJs'], function() {
    gulp.watch('assets/stylesheets/sass/**/*.scss',['styles']);
    gulp.watch( jsVendorSrc, [ 'vendorsJs', reload ] ); // Reload on vendorsJs file changes.
    gulp.watch( jsLibsSrc, [ 'libsJs', reload ] ); // Reload on customJS file changes.
});