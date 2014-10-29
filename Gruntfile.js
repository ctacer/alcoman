
module.exports = function (grunt) {

    'use strict';

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

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
                cwd: 'app',
                src: '**',
                dest: '<%= env.dev.DEST %>'
            },
            prod: { }
        },

        wiredep: {
            dev: {
                src: [ 'app/index.html' ]
            }            
        },

        // Serve the files of the project on specified port and hostname
        connect: {
            web: {
                options: {
                    port: 8008,
                    base: 'app',
                    hostname: 'localhost',
                    keepalive: true
                }
            }
        },

        // Build and run hybrid applications with Apache Cordova (Phonegap)
        phonegap: {
            config: {
                root: 'app',
                cordova: 'phonegap',
                config: 'phonegap/config.xml',
                path: 'build',
                plugins: [ /* Specify a url with a plugin */ ],
                platforms: [ 'android' ],
                maxBuffer: 200,
                verbose: true,
                releases: 'dist',
                releaseName: function(){
                    return(pkg.name + '-' + pkg.version);
                },
                // Android-only integer version to increase with each release.
                // See http://developer.android.com/tools/publishing/versioning.html
                versionCode: function(){ return(1) },
                key: {
                    store: 'android.keystore',
                    alias: 'yourAlias',
                    aliasPassword: function(){
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('password');
                    },
                    storePassword: function() {
                        // Prompt, read an environment variable, or just embed as a string literal
                        return('password');
                    }
                },
                icons: {
                    android: {
                        ldpi: '',
                        mdpi: '',
                        hdpi: '',
                        xhdpi: ''
                    }
                },
                screens: {
                    android: {
                        ldpi: '',
                        ldpiLand: '',
                        mdpi: '',
                        mdpiLand: '',
                        hdpi: '',
                        hdpiLand: '',
                        xhdpi: '',
                        xhdpiLand: ''
                    },
                    ios: {
                      // ipad landscape
                      ipadLand: '',
                      ipadLandx2: '',
                      // ipad portrait
                      ipadPortrait: '',
                      ipadPortraitx2: '',
                      // iphone portrait
                      iphonePortrait: '',
                      iphonePortraitx2: '',
                      iphone568hx2: ''
                    }
                }
            }
        }
    });

    // Build a development version of web app
    grunt.registerTask('build:web', [
        'env:dev',
        // Clean the target directory
        'clean:dev',
        //updates bower dependencies
        'wiredep:dev',
        // Copy files within specified directory into target directory
        'copy:dev',
        // Start a local webserver with livereload
        'connect:web'
    ]);

    grunt.registerTask('build', [ 'clean:dev' ]);

};