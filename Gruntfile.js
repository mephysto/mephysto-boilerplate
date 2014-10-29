module.exports = function (grunt) {


  // Project configuration.

  grunt.initConfig({

    pkg: this.file.readJSON('package.json'),

    // locations
    cwd: 'src/',                // local folder, edit files here
    build: 'build/',            // build folder, grunt will compile end result to here
    production: 'production/',  // production folder, grunt will create minified assets here
    
    /* NOTIFY */
    // throw up notification messages when a certain task has completed.
    notify: {
      watchJS: {
        options: {
          title: 'JavaScript finished building',
          message: 'Java\s scripted'
        }
      },
      watchCSS: {
        options: {
          title: 'Styles finished compiling',
          message: 'Things are looking prettier'
        }
      },
      watchIMG: {
        options: {
          title: 'Images finished optimizing',
          message: 'Paintings painted'
        }
      },
      buildcomplete: {
        options: {
          title: 'full build',
          message: 'Carrier has arrived'
        }
      }
    },

    /* STYLES */
    // process LESS into CSS
    less: {
      local: {
        options: {
          paths: ["<%= cwd %>css"],
          ieCompat: true, // make work with IE8
        },
        files: [
          {
            src: "<%= cwd %>css/main.less",
            dest: "<%= build %>css/styles.css",
          }
        ]
      }
    },

    // auto browserprefix for CSS
    autoprefixer: {
      local: {
        options: {
          // support for what: 
          browsers: ['last 2 version', 'ie 8', 'ie 9']
        },
        files: [
          {
            src: '<%= build %>css/styles.css',
            dest: '<%= build %>css/styles.pfx.css',
          },
        ]
      }
    },

    // css minify
    cssmin: {
      production: {
        files: [
          {
            src: '<%= build %>css/styles.pfx.css',
            dest: '<%= production %>css/styles.min.css',
          }
        ]
      }
    },

    /* SCRIPTS */
    // JS hint
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
        },
      },
      all: ['<%= cwd %>js/main.js']
    },
    // minify JS
    uglify: {
      local: {
        options: {
          mangle: false, // preserve variables
          // sourceMap: true,
          // sourceMapName: '<%= build %>js/sourcemap.map',
          beautify: true,
          // compress: { drop_console: true }
        },
        files: [
          {
            src: ['<%= cwd %>js/main.js'],
            dest: '<%= build %>js/main.min.js',
          }
        ]
      },
      production: {
        options: {
          // mangle: false, // preserve variables
          // sourceMap: true
          // sourceMapName: '<%= build %>js/sourcemap.map'
          // beautify: true
          compress: { drop_console: true }
        },
        files: [
          {
            src: ['<%= cwd %>js/main.js'],
            dest: '<%= production %>js/main.min.js'
          }
        ]
      }
    },
    // Concatenate all the minified files into one big file.
    concat: {
      options: {
        separator: ';',
      },
      build: {
        files: [
          {
            src: ['<%= cwd %>js/vendor/modernizr-2.6.2.min.js', '<%= build %>js/main.min.js'],
            dest: '<%= build %>js/global.min.js'
          },
          {
            src: ['<%= cwd %>js/vendor/modernizr-2.6.2.min.js', '<%= cwd %>js/vendor/masonry.pkgd.min.js', '<%= build %>js/main.min.js'],
            dest: '<%= build %>js/landing-scripts.min.js',
          }
        ]
      },
      production: {
        files: [
          {
            src: ['<%= cwd %>js/vendor/modernizr-2.6.2.min.js', '<%= production %>js/main.min.js'],
            dest: '<%= production %>js/global.min.js',
          },
          {
            src: ['<%= cwd %>js/vendor/modernizr-2.6.2.min.js', '<%= cwd %>js/vendor/masonry.pkgd.min.js', '<%= production %>js/main.min.js'],
            dest: '<%= production %>js/landing-scripts.min.js',
          }
        ]
      }
    },


    /* IMAGES */
    // optimize images
    imagemin: {
      localdev: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: '<%= cwd %>images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= build %>images/'
        }]
      },
      dev: {
        options: {
          optimizationLevel: 3,
        },
        files: [{
          expand: true,
          cwd: '<%= cwd %>images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= production %>images/'
        }]
      }
    },

    /* WATCH */
    // watch for changes in files
    watch: {
      // watch for changes in LESS files
      styles : {
        files: ["<%= cwd %>css/*.less"],
        tasks: ['less', 'autoprefixer', 'cssmin', 'notify:watchCSS']
      },
      // watch for changes in script
      scripts : {
        files: ['<%= cwd %>js/*.js'],
        tasks: ['jshint', 'uglify', 'concat', 'notify:watchJS']
      },
      // watch for updates in images
      images : {
        files: ['<%= cwd %>images/**/*.{png,jpg,gif,svg}'],
        tasks: ['imagemin', 'notify:watchIMG']
      }
    },
    // clean up the build folders. be carefull with this. we don't want to lose our working files!
    clean: {
      local: ["<%= build %>"],
      production: ["<%= production %>"],
    },
    // minify html, remove any comments, whitespaces, etc
    htmlmin: {
      local: {
        cwd: "<%= cwd %>",
        expand: true,
        options: {
        },
        src: "**/*.html",
        dest: "<%= build %>",
      },
      production: {
        cwd: "<%= cwd %>",
        expand: true,
        options: {
          removeComments: true,
        },
        src: "**/*.html",
        dest: "<%= production %>",
      }
    },
    // NYI
    version: {
      options: {
        pkg: 'package.json'
      },
      build: {
        options: {
          prefix: '@version\\s*'
        },
        src: ['build/css/styles.min.css'],
      },
    },    
  });

  // logo
  grunt.registerTask('logo', '', function () {
    grunt.log.writeln(['\n\n\n' + '                        .. .   .:IMMMMM~\n                      ..:7MMMMMMMMMMMM8.\n      . .  ..   :7MMMMMMM,,...8MMMMMMM\n        ~$MM,... IMMMMMM+8......MMMMMM .\n ZMMMMMMMMMMN......MMMMM$.......MMMMM.\nZ?MMMMMMMMMM....... MMM....7....MMMM+\n 8..MMMMMMMM........NM 8..M.....MMMM.\n..$  NMMMMMM.........77...:.D...MMM$ .\n   .=.7MMMMM..........=..M M8...MMM ..\n     I  MMMM....M.......7=DMZ...MM. ..\n    . .? ?M8....MN......M MMI...MM.\n        D..$....MM7.....:=MN+...D:.\n         . .....MMM....= MMD....O.\n        .  D....MMMM+..N.MM8.....  \n         . .7...MMMMMMMMMMMO...O.       \n            . +.IMMMMMMMMMM$..=. .      \n            .. + .MMMMMMMMM7..+         \n            .....I +MMMMMMMM,~ .        \n                  8..MMMMMMM.$ .        \n                .... .NMMMMMM           \n                   . 8 .MMMM.           \n                   .. ?. DMM  .         \n                       .I.8:            \n                      .  =   \n\n Running Maurice Melchers :: Boilerplate\n\n\n']);
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-version');
  grunt.loadNpmTasks('grunt-notify');
  // grunt.loadNpmTasks('grunt-svgmin');

  /* ## Build site */
  grunt.registerTask('default', ['logo', 'clean', 'htmlmin', 'less', 'autoprefixer', 'cssmin', 'jshint', 'uglify', 'concat', 'imagemin']);
  // start watching for changes in LESS
  grunt.registerTask('watchstyles', ['logo', 'less', 'autoprefixer', 'cssmin', 'watch:styles']);
  // start watching for changes in JS
  grunt.registerTask('watchscripts', ['logo', 'jshint', 'uglify', 'concat', 'watch:scripts']);

  // start watching for changes in image folder
  grunt.registerTask('watchimages', ['logo', 'imagemin', 'watch:images']);
  // run all tasks + watch
  grunt.registerTask('watchall', ['default', 'watch']);
};