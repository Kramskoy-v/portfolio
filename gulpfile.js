const {src, dest, series, watch} = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require("sass");
const gulpSass = require("gulp-sass");
const fileInclude = require("gulp-file-include");
const revRewrite = require("gulp-rev-rewrite");
const revDel = require("gulp-rev-delete-original");
const htmlmin = require("gulp-htmlmin");
const gulpif = require("gulp-if");
const notify = require("gulp-notify");
const image = require("gulp-imagemin");
const {readFileSync} = require("fs");

const mainSass = gulpSass(sass);
const webpackStream = require("webpack-stream");
const plumber = require("gulp-plumber");
const path = require("path");
const rootFolder = path.basename(path.resolve());

// paths
const srcFolder = "./src";
const buildFolder = "./app";
const paths = {
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,
  srcScss: `${srcFolder}/scss/**/*.scss`,
  buildCssFolder: `${buildFolder}/css`,
  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMainJs: `${srcFolder}/js/main.js`,
  buildJsFolder: `${buildFolder}/js`,
  srcPartialsFolder: `${srcFolder}/partials`,
  resourcesFolder: `${srcFolder}/resources`,
};

let isProd = false; // dev by default

const clean = () => {
  return del([buildFolder]);
};

// scss styles
const styles = () => {
  return src(paths.srcScss, {sourcemaps: !isProd})
    .pipe(
      plumber(
        notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(mainSass())
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ["last 5 versions"],
      })
    )
    .pipe(
      gulpif(
        isProd,
        cleanCSS({
          level: 2,
        })
      )
    )
    .pipe(dest(paths.buildCssFolder, {sourcemaps: "."}))
    .pipe(browserSync.stream());
};

// styles backend
const stylesBackend = () => {
  return src(paths.srcScss)
    .pipe(
      plumber(
        notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(mainSass())
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ["last 5 versions"],
      })
    )
    .pipe(dest(paths.buildCssFolder))
    .pipe(browserSync.stream());
};

// scripts
const scripts = () => {
  return src(paths.srcMainJs)
    .pipe(
      plumber(
        notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpackStream({
        mode: isProd ? "production" : "development",
        output: {
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        targets: "defaults",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        devtool: !isProd ? "source-map" : false,
      })
    )
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })
    .pipe(dest(paths.buildJsFolder))
    .pipe(browserSync.stream());
};

// scripts backend
const scriptsBackend = () => {
  return src(paths.srcMainJs)
    .pipe(
      plumber(
        notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      webpackStream({
        mode: "development",
        output: {
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        targets: "defaults",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        devtool: false,
      })
    )
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })
    .pipe(dest(paths.buildJsFolder))
    .pipe(browserSync.stream());
};

const resources = () => {
  return src(`${paths.resourcesFolder}/**`).pipe(dest(buildFolder));
};

const images = () => {
  return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg,ico}`])
    .pipe(
      gulpif(
        isProd,
        image([
          image.mozjpeg({
            quality: 80,
            progressive: true,
          }),
          image.optipng({
            optimizationLevel: 2,
          }),
        ])
      )
    )
    .pipe(dest(paths.buildImgFolder));
};

const htmlInclude = () => {
  return src([`${srcFolder}/*.html`])
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: `${buildFolder}`,
    },
  });

  watch(paths.srcScss, styles);
  watch(paths.srcFullJs, scripts);
  watch(`${paths.srcPartialsFolder}/*.html`, htmlInclude);
  watch(`${srcFolder}/*.html`, htmlInclude);
  watch(`${paths.resourcesFolder}/**`, resources);
  watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
};
const rewrite = () => {
  const manifest = readFileSync("app/rev.json");
  src(`${paths.buildCssFolder}/*.css`)
    .pipe(
      revRewrite({
        manifest,
      })
    )
    .pipe(dest(paths.buildCssFolder));
  return src(`${buildFolder}/**/*.html`)
    .pipe(
      revRewrite({
        manifest,
      })
    )
    .pipe(dest(buildFolder));
};

const htmlMinify = () => {
  return src(`${buildFolder}/**/*.html`)
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest(buildFolder));
};

const toProd = (done) => {
  isProd = true;
  done();
};

exports.default = series(
  clean,
  htmlInclude,
  scripts,
  styles,
  resources,
  images,
  watchFiles
);

exports.backend = series(
  clean,
  htmlInclude,
  scriptsBackend,
  stylesBackend,
  resources,
  images
);

exports.build = series(
  toProd,
  clean,
  htmlInclude,
  scripts,
  styles,
  resources,
  images,
  htmlMinify
);
