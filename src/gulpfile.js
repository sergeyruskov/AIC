var compass = require("gulp-compass"),
	autoprefixer = require("gulp-autoprefixer"),
	imagemin = require("gulp-imagemin"),
	uglify = require("gulp-uglify"),
	concat = require("gulp-concat"),
	minifyHTML = require("gulp-minify-html"),
	gulp = require("gulp"),
	plumber = require("gulp-plumber"),
	rename = require("gulp-rename"),
	jsonminify = require("gulp-jsonminify"),
	streamqueue  = require("streamqueue"),
	coffee = require("gulp-coffee"),
	livereload = require('gulp-livereload'),

	distPath = "../dist/";


gulp.task("default", ["fonts", "coffee", "json-minify", "favicon", "imagemin", "compass", "minifyHtml", "scripts", "watch"]);

//CoffeeScript
function swallowError (error) {
	console.log(error.toString());
	this.emit('end');
}
gulp.task("coffee", function() {
	gulp.src("coffee/*.coffee")
		.pipe(coffee())
		.on('error', swallowError)
		.pipe(gulp.dest("js"));
});

//JS
gulp.task("scripts", function () {
	return streamqueue({ objectMode: true },
		gulp.src("js/*.js"),
		gulp.src("js/plugins/**/*.js")
	)
	.pipe(plumber()) 
	.pipe(concat("script.js"))
	.pipe(uglify())
	.pipe(gulp.dest(distPath + "js"));
});

//HTML
gulp.task("minifyHtml", function () {
	gulp.src("index.html")
		.pipe(plumber()) 
		.pipe(minifyHTML())
		.pipe(gulp.dest(distPath));
});

// Compass
gulp.task("compass",  function () {

	gulp.src("sass/styles.scss")
		.pipe(plumber())
		.pipe(compass({
			config_file: "./config.rb",
			css: distPath + "css",
			sourcemap: true
		}))
		.pipe(autoprefixer({
			browsers: ["> 1%"],
		}))
		.pipe(gulp.dest(distPath + "css"));
});

// Imagemin
gulp.task("imagemin",  function () {
	gulp.src("img/**/**")
		.pipe(plumber()) 
		.pipe(imagemin())
		.pipe(gulp.dest(distPath + "img"));
});

//Move fonts
gulp.task("fonts", function () {
	gulp.src("fonts/**/**")
	.pipe(rename(function (path) {}))
	.pipe(gulp.dest(distPath + "fonts")); 
});

//Move favicon
gulp.task("favicon", function () {
	gulp.src("favicon.ico")
	.pipe(rename(function (path) {}))
	.pipe(gulp.dest(distPath)); 
});

//Move json
gulp.task("json-minify", function () {
	return gulp.src(["json/**"])
		.pipe(jsonminify())
		.pipe(gulp.dest("../dist/json"));
});

// Watch
gulp.task("watch", function () {
	gulp.watch("sass/**/**/**", ["compass"]);
	gulp.watch("index.html", ["minifyHtml"]);
	gulp.watch("js/**/**/**", ["scripts"]);
	gulp.watch("coffee/**", ["coffee"]);
	gulp.watch("fonts/**/**", ["fonts"]);
	gulp.watch("img/**/**", ["imagemin"]);
	gulp.watch("json/**", ["json-minify"]);

	livereload.listen();
	gulp.watch(distPath + 'css/styles.css').on('change', livereload.changed);
	gulp.watch(distPath + 'index.html').on('change', livereload.changed);
	gulp.watch(distPath + 'js/script.js').on('change', livereload.changed);
	gulp.watch(distPath + 'img/**/**/**').on('change', livereload.changed);
	gulp.watch(distPath + 'json/**').on('change', livereload.changed);
});