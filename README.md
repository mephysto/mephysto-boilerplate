# Starting point for my Frontend Projects
----------------------------------------------------
## Features
* __Node.js__
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
* __LESS__
    * Modified from original boilerplate CSS to LESS
    * LESS file structure for specific purposes
* __Fonts__
    * FontAwesome (optional)
* __Build foldersystem__
----------------------------------------------------
### Install this first
* Node.js <http://www.nodejs.org/>
* Grunt `npm install -g grunt-cli`
----------------------------------------------------
### First run console commands:
* `npm install` *download and set up all the plugins and build libraries*
* `grunt` *creates all the initial minified folders and files for the first time*
* `node webserver.node.js` *this creates a webserver on port 8000*
----------------------------------------------------
## Grunt builds 
Run these while developing. Run them all at once, or seperate.
Split into three watchers for speedy performance reasons.
* `grunt watchscripts` build and minify javascript, and watch for changes.
* `grunt watchstyles` compile LESS, minify CSS, and watch for changes.
* `grunt watchimages` optimize images, and watch for changes.