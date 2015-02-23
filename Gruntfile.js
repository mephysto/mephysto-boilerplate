module.exports = function (grunt) {


  // Project configuration.
  /*
    TOC:
    NOTIFY
    - notify
    STYLES
    - less
    - autoprefixer
    - cssmin
    SCRIPTS
    - jshint
    - uglify
    - concat
    IMAGES
    - imagemin
    SVG TO FONTS
    - svgmin
    - grunticon
    WATCH
    - watch
  */

  grunt.initConfig({

    pkg: this.file.readJSON('package.json'),

    // locations
    cwd: 'src/',                // local folder, edit files here
    build: 'build/',            // build folder, grunt will compile end result to here
    release: 'release/',  // release folder, grunt will create minified assets here


    /* ################
        NOTIFY 
    ################ */
    /* NOTIFY */
    // throw up notification messages when a certain task has completed.
    notify: {
      watchJS: {
        options: {
          title: 'JavaScript finished building',
          message: 'Java\'s scripted'
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

    /* ################
        STYLES 
    ############  */
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
        build: [
          {
            src: '<%= build %>css/styles.css',
            dest: '<%= build %>css/styles.pfx.css',
          },
        ]
      }
    },

    // css minify
    cssmin: {
      options: {
        rebase: false,
        processImport: true
      },
      build: {
        files: [
          {
            src: '<%= build %>css/global.styles.css',
            dest: '<%= build %>css/styles.min.css',
          }
        ]
      },
      release: {
        files: [
          {
            src: '<%= build %>css/global.styles.css',
            dest: '<%= release %>css/styles.min.css',
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
      release: {
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
            dest: '<%= release %>js/main.min.js'
          }
        ]
      }
    },
    // Concatenate all the minified files into one big file.
    concat: {
      options: {
        separator: ';',
      },
      css : {
        files : [
          {
            src: [
              '<%= cwd %>css/vendor/*.css',
              '<%= build %>css/styles.pfx.css'
            ],
            dest: '<%= build %>css/global.styles.css'
          }
        ]
      },
      build: {
        files: [
          {
            src: ['<%= cwd %>js/vendor/**/*.js', '<%= build %>js/main.min.js'],
            dest: '<%= build %>js/global.min.js'
          }
        ]
      },
      release: {
        files: [
          {
            src: ['<%= cwd %>js/vendor/**/*.js', '<%= release %>js/main.min.js'],
            dest: '<%= release %>js/global.min.js',
          }
        ]
      }
    },


    /* IMAGES */
    // optimize images
    imagemin: {
      build: {
        options: {
          optimizationLevel: 1
        },
        files: [{
          expand: true,
          cwd: '<%= cwd %>images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= build %>images/'
        }]
      },
      release: {
        options: {
          optimizationLevel: 4,
        },
        files: [{
          expand: true,
          cwd: '<%= cwd %>images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= release %>images/'
        }]
      }
    },

    /* ################
        SVG TO FONTS
    ################ */

    //minimize SVG files
    svgmin: {
      options: {
        plugins: [
          { removeViewBox: false },
          { removeUselessStrokeAndFill: false }
        ]
      },
      dist: {
        expand: true,
        cwd: '<%= cwd %>svg_icons/raw/',
        src: ['**/*.svg'],
        dest: '<%= build %>svg_icons/compressed',
        ext: '.svg'
      }
    },

    //makes SVG icons into a CSS file
    grunticon: {
      build: {
        files: [{
          expand: true,
          cwd: '<%= build %>svg_icons/compressed',
          src: ['*.svg'],
          dest: '<%= build %>svg_icons/output'
        }],
        options: {
          cssprefix: '.icon-',
        }
      },
      release: {
        files: [{
          expand: true,
          cwd: '<%= build %>svg_icons/compressed',
          src: ['*.svg'],
          dest: '<%= release %>svg_icons/output'
        }],
        options: {
          cssprefix: '.icon-',
        }
      }
    },
    /* ################
        WATCH
    ################ */

    /* WATCH */

    // watch for changes in files
    watch: {
      // watch for changes in LESS filese
      html : {
        options: {atBegin: true},
        files: ["<%= cwd %>**/*.html"],
        tasks: ['htmlmin:build', 'notify:watchHTML']
      },
      styles : {
        options: {atBegin: true},
        files: ["<%= cwd %>css/*.less"],
        tasks: ['less', 'autoprefixer', 'concat:css', 'cssmin:build', 'notify:watchCSS']
      },
      // watch for changes in script
      scripts : {
        options: {atBegin: true},
        files: ['<%= cwd %>js/*.js'],
        tasks: ['jshint', 'uglify:build', 'concat:build', 'notify:watchJS']
      },
      // watch for updates in images and svgs
      images : {
        options: {atBegin: true},
        files: ['<%= cwd %>images/**/*.{png,jpg,gif,svg}', '<%= cwd %>svg_icons/**/*.svg'],
        tasks: ['imagemin:build', 'notify:watchIMG', 'createsvgfonts' ]
      }
    },
    /* ################
        VARIOUS
    ################ */
    // clean up the build folders. be carefull with this. we don't want to lose our working files!
    clean: {
      build: ["<%= build %>"],
      release: ["<%= release %>"],
    },
    // minify html, remove any comments, whitespaces, etc
    htmlmin: {
      build: {
        expand: true,
        cwd: "<%= cwd %>",
        options: {
        },
        src: "**/*.html",
        dest: "<%= build %>",
      },
      release: {
        expand: true,
        cwd: "<%= cwd %>",
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        src: "**/*.html",
        dest: "<%= release %>",
      }
    },
    // Copy over some files.
    copy : {
      build : {
        expand: true,
        cwd: '<%= cwd %>',
        src: [],
        dest: '<%= build %>'
      },
      release : {
        expand: true,
        cwd: '<%= cwd %>',
        src: [],
        dest: '<%= release %>'
      }
    }
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
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-copy');

  /* ## Build site */
  grunt.registerTask('createsvgfonts', ['svgmin', 'grunticon']);
  grunt.registerTask('build', [
    'logo',
    'clean:build',
    'copy:build',
    'htmlmin:build',
    'less',
    'autoprefixer',
    'concat:css',
    'cssmin:build',
    'jshint',
    'uglify:build',
    'concat:build',
    'imagemin:build',
    'createsvgfonts']);
  grunt.registerTask('release', [
    'logo',
    'clean:release',
    'copy:release',
    'htmlmin:release',
    'less',
    'autoprefixer',
    'concat:css',
    'cssmin:release',
    'jshint',
    'uglify:release',
    'concat:release',
    'imagemin:release',
    'createsvgfonts']);

  // only watch specific things
  grunt.registerTask('watchhtml',     ['watch:html']);
  grunt.registerTask('watchstyles',   ['watch:styles']);
  grunt.registerTask('watchscripts',  ['watch:scripts']);
  grunt.registerTask('watchimages',   ['watch:images']);
  // watch everything
  grunt.registerTask('default',       ['logo', 'clean:build', 'copy:build', 'watch']);
};