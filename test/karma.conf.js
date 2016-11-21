"use strict";
// Karma configuration
// Generated on Sat May 21 2016 12:25:39 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

        // CSS
        'http://openlayers.org/en/master/css/ol.css',


        // ExtJS (built)
        //"https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-crisp/theme-crisp.js",
        //"https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/classic/theme-crisp/theme-crisp.js"

        //"../bower_components/extjs/build/classic/theme-crisp/resources/theme-crisp-all.css",
        //"../bower_components/extjs/build/ext-all.js",
        //"../bower_components/extjs/build/classic/theme-crisp/theme-crisp.js",

        "https://cdnjs.cloudflare.com/ajax/libs/extjs/6.0.0/classic/theme-crisp/resources/theme-crisp-all.css",
        "https://cdnjs.cloudflare.com/ajax/libs/extjs/6.0.0/ext-all.js",

        // the dynamically built bootstrap.js contains my custom classes

        // Open Layers

        "http://openlayers.org/en/v3.13.0/build/ol.js",
        "../packages/remote/GeoExt/build/resources/GeoExt-all.css",
        "../packages/remote/GeoExt/build/GeoExt.js",

        // singletons have to be loadnoed attitionally, since they are gloabal
        "../app/**/*.js",

        // my app files are loaded via Ext.loader() within the spec file
        'loader.js',

        {
            pattern: 'src/**/*.js',
            included: false
        },

        // test specs
        "spec/services/ConfigService.spec.js"
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],
    //reporters: ['progress'],

    plugins: [
      'karma-jasmine',
      //'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-mocha-reporter'
    ],

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'], // 'PhantomJS'


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity

    });
};
