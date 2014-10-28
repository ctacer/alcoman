
module.exports = function (grunt) {

    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    /*// Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);*/

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: grunt.file.readJSON('config.json'),

        env: {
            options: {},
            dev: {
                NODE_ENV: 'DEV',
                DEST: 'build/dev/webapp'
            },
            prod: {
                NODE_ENV: 'PROD',
                DEST: 'build/prod/webapp'
            }
        },

        clean: {
            dev: [ '<%= env.dev.DEST %>' ],
            prod: [ 'dist/webapp' ]
        },

        copy: {
            dev: {
                expand: true,
                flatten: true,
                src: 'app/*',
                dest: '<%= env.dev.DEST %>'
            },
            prod: { }
        },

        wiredep: {
            dev: {
                src: [ '<%= env.dev.DEST %>/index.html' ]
            }
        },

        // Serve the files of the project on specified port and hostname
        /*connect: {
            options: {
                port: '<%= config.server.port %>',
                base: 'app',
                hostname: 'localhost',
                keepalice: true
            }
        }*/
        
    });

    // Build a development version of web app
    grunt.registerTask('build:webapp', [
        'env:dev',
        // Clean the target directory
        'clean:dev',
        // Copy files within specified directory into target directory
        'copy:dev',
        //updates bower dependencies
        'wiredep:dev',
        // Start a local webserver with livereload
        // 'connect'
    ]);

    grunt.registerTask('build', [ 'clean:dev' ]);

};