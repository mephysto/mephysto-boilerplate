# Starting point for my Frontend Projects

includes:
* Node.js
  * webserver.node.js (port 8000)
  * Grunt.js
    * LESS compiler
    * autoprefixer (vendor prefixes + minifier)
    * uglify
    * imagemin
    * concat
    * watch
      * watchtyles
      * watchscripts
      * watchimages
* modified original boilerplate CSS to LESS
* different LESS files for specific purposes
* option to include FontAwesome
* build foldersystem

First run console commands:
* npm install (download and set up all the plugins and build libraries)
* grunt (creates all the initial minified folders and files for the first time)
* node webserver.node.js (this creates a webserver on port 8000)