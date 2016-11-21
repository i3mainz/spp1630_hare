"use strict";

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        // server for jasmien tests
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'test'
                }
            }
        }
    });


  // Load the plugin that provides the "uglify" task.
  //grunt.loadNpmTasks('grunt-contrib-uglify');

  // load plugin that starts test server
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);

  // start jasmine server
  grunt.registerTask('test', ['connect:server:keepalive']);

};
