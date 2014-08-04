/*
 * grunt-dust-compiler
 * https://github.com/matthewbschneider/
 *
 * Copyright (c) 2014 Matthew Schneider
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var path = require('path');

  grunt.registerMultiTask('dustc', function() {
    var done = this.async();

    var options = this.options({
      registerFileName: false,
    });

    grunt.util.async.forEachSeries(this.files, function(file, nextPair) {
      grunt.util.async.forEachSeries(file.src, function(src, nextFile) {
        if (!grunt.file.exists(src)) {
          grunt.log.warn('Source file ' + src.yellow + ' not found.');
          return false;
        } else {
          var dest = file.dest;
          var name = path.basename(src, '.dust');
          var ext = file.orig.ext || '.js';
          var reg = '';

          if(grunt.file.isDir(src)) {
            grunt.log.writeln('Creating directory ' + dest.blue);
            grunt.file.mkdir(dest);
          }

          if(file.orig.expand) {
            dest = dest.replace('.dust', ext);
          }

          // config option to register dust templates by file name
          if(options.registerFileName) {
            reg = '--name=' + name;
          }

          // config option to individually register dust templates by name
          if(typeof file.register !== 'undefined' && file.register.length > 0) {
            reg = '--name=' + file.register;
          }

          if(!grunt.file.isDir(dest)) {
            // spawn child process to compile dust templates
            grunt.util.spawn({
              cmd: 'dustc',
              args: [reg, src, dest]
            }, function (err, res) {
              if (err) {
                grunt.fail.fatal(err);
              } else {
                grunt.log.writeln('Compiling dust template from ' + src.cyan + ' to ' + dest.cyan);
              }
              nextFile();
            });
          } else {
            nextFile();
          }
        }
      }, nextPair);
    }, done);
  });
};