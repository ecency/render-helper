var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
const pkg = require("./package.json");

const libraryName = pkg.name;

function build() {
  return browserify({
    basedir: ".",
    entries: ["src/index.ts"],
    cache: {},
    standalone: libraryName,
    packageCache: {},
  })
    .plugin(tsify, { target: "es5", module: "commonjs" })
    .bundle()
    .pipe(source("render-helper.js"))
    //.pipe(buffer()) //you cannot get rid of this.
    //.pipe(uglify().on('error', console.error))
    .pipe(gulp.dest("lib"));
}

exports.default = gulp.series(build);
