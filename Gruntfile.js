module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: this.file.readJSON('package.json'),

    vars: {
      styles: 'css/',
    },

    // clean
    clean: {
      build: [""]
    },

    // JS hint
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      // change this line to match your js files
      all: ['js/main.js']
    },

    // process + minify LESS into CSS
    less: {
      development: {
        options: {
            paths: ["./css"]
        },
        files: {
          "css/styles.css": "css/main.less"
        }
      }
    },
    // auto browserprefix for CSS
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      single_file: {
        options: {
           yuicompress: true
        },
        src: 'css/styles.css',
        dest: 'css/build/styles.min.css'
      },
    },

    // minify JS
    uglify: {
      build: {
        options: {
          // mangle: false, // preserve variables

        },
        src: ['js/main.js'],
        dest: 'js/build/global.min.js'
      }
    },

    // optimize images
    imagemin: {
      static: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'image/',
          src: ['*.{png,jpg,gif}'],
          dest: 'image/build/'
        }]
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'image/',
          src: ['*.{png,jpg,gif}'],
          dest: 'image/build/'
        }]
      }
    },

    // Concatenate all the minified files into one big file.
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/*.js'],
        dest: 'js/build/global.min.js'
      },
    },

    // watch for changes in files
    watch: {
      // watch for changes in CSS
      styles : {
        files: ["./css/*.less"],
        tasks: ['less', 'autoprefixer']
      },
      // watch for changes in script
      scripts : {
        files: ['js/*.js'],
        tasks: ['uglify']
      },
      // watch for updates in images
      images : {
        files: ['images/src/**/*.{png,jpg,gif}'],
        tasks: ['imagemin']
      }
    }


  });

  grunt.registerTask('logo', '', function(){
    grunt.log.writeln(['\n\n\n'+
'                        .. .   .:IMMMMM~' + 
'\n                      ..:7MMMMMMMMMMMM8.' + 
'\n      . .  ..   :7MMMMMMM,,...8MMMMMMM' + 
'\n        ~$MM,... IMMMMMM+8......MMMMMM .' + 
'\n ZMMMMMMMMMMN......MMMMM$.......MMMMM.' + 
'\nZ?MMMMMMMMMM....... MMM....7....MMMM+' + 
'\n 8..MMMMMMMM........NM 8..M.....MMMM.' + 
'\n..$  NMMMMMM.........77...:.D...MMM$ .' + 
'\n   .=.7MMMMM..........=..M M8...MMM ..' + 
'\n     I  MMMM....M.......7=DMZ...MM. ..' + 
'\n    . .? ?M8....MN......M MMI...MM.' + 
'\n        D..$....MM7.....:=MN+...D:.' + 
'\n         . .....MMM....= MMD....O.' + 
'\n        .  D....MMMM+..N.MM8.....  ' + 
'\n         . .7...MMMMMMMMMMMO...O.       ' + 
'\n            . +.IMMMMMMMMMM$..=. .      ' + 
'\n            .. + .MMMMMMMMM7..+         ' + 
'\n            .....I +MMMMMMMM,~ .        ' + 
'\n                  8..MMMMMMM.$ .        ' + 
'\n                .... .NMMMMMM           ' + 
'\n                   . 8 .MMMM.           ' + 
'\n                   .. ?. DMM  .         ' + 
'\n                       .I.8:            ' + 
'\n                      .  =   \n' + 
'\n Running Maurice Melchers :: Boilerplate\n\n\n']);
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).

  /* ## Build site */
  grunt.registerTask('default', ['logo', 'less', 'autoprefixer','jshint','uglify', 'imagemin']);

  // start watching for changes in LESS
  grunt.registerTask('watchstyles', ['logo','less', 'autoprefixer', 'watch:styles']);
  // start watching for changes in JS
  grunt.registerTask('watchscripts', ['logo','jshint','uglify', 'watch:scripts']);
  // start watching for changes in image folder
  grunt.registerTask('watchimages', ['logo','imagemin', 'watch:images']);

};