/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "js/site.min.js": ["js/site.js"]
        }
      }
    },

    sass: {
      
      dist: {
        options: {
          style: "compressed"
        },
        files: {
          "css/global-unprefixed-min.css": "scss/global.scss"
        }
      },
      global: {
        options: {
          style: "expanded"
        },
        files: {
          "css/global-unprefixed.css": "scss/global.scss"
        }
      }
    },

    autoprefixer: {
      dist: {
        src: "css/global-unprefixed-min.css",
        dest: "css/main-min.css"
      },
      global: {
        src: "css/global-unprefixed.css",
        dest: "css/main.css"
      }
    },

    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl '' --port '4001'"
      },
      jekyllBuild: {
        command: "jekyll build --config _config.yml"
      }
    },

    watch: {
      options: {
        livereload: false
      },
      site: {
        files: ["index.html", "_layouts/*.html", "_posts/*.md",  "_projects/*.md", "_includes/*.html"],
        tasks: ["shell:jekyllBuild"]
      },
      js: {
        files: ["js/*.js"],
        tasks: ["uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["scss/*.scss"],
        tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
      },
      svgIcons: {
        files: ["svg/*.svg"],
        tasks: ["svgstore", "shell:jekyllBuild"]
      }
    },

    svgstore: {
      options: {
        prefix : "shape-",
        cleanup: false,
        svg: {
          style: "display: none;"
        }
      },
      default: {
        files: {
          "_includes/svg-defs.svg": ["svg/*.svg"]
        }
      }
    },

    imagemin: {                           
      dynamic: {
        options: {
          optimizationLevel: 5
        },                         
        files: [{
          expand: true,                  
          cwd: 'img/uncompressed',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: 'img/'
        }]
      }
    }
    


  });

  require("load-grunt-tasks")(grunt);

  //grunt.registerTask("imagemin", ["imagemin"]);
  grunt.registerTask("serve", ["shell:jekyllServe"]);
  grunt.registerTask("default", ["sass", "autoprefixer", "svgstore", "shell:jekyllBuild", "watch"]);

};
