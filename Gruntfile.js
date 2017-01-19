/* globals module, require */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    uglify: {
      global: {
        files: {
          "src/js/site.min.js": ["src/js/site.js"]
        }
      }
    },

    sass: {
      
      dist: {
        options: {
          style: "compressed"
        },
        files: {
          "src/css/global-unprefixed-min.css": "src/scss/global.scss"
        }
      },
      global: {
        options: {
          style: "expanded"
        },
        files: {
          "src/css/global-unprefixed.css": "src/scss/global.scss"
        }
      }
    },

    autoprefixer: {
      dist: {
        src: "src/css/global-unprefixed-min.css",
        dest: "src/css/main-min.css"
      },
      global: {
        src: "src/css/global-unprefixed.css",
        dest: "src/css/main.css"
      }
    },

    shell: {
      jekyllServe: {
        command: "jekyll serve --baseurl ''"
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
        files: ["src/js/*.js"],
        tasks: ["uglify", "shell:jekyllBuild"]
      },
      css: {
        files: ["src/scss/*.scss"],
        tasks: ["sass", "autoprefixer", "shell:jekyllBuild"]
      },
      svgIcons: {
        files: ["src/svg/*.svg"],
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
          "src/_includes/svg-defs.svg": ["src/svg/*.svg"]
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
          cwd: 'src/img/uncompressed',                   
          src: ['**/*.{png,jpg,gif}'],   
          dest: 'src/img/'
        }]
      }
    }
    


  });

  require("load-grunt-tasks")(grunt);

  //grunt.registerTask("imagemin", ["imagemin"]);
  grunt.registerTask("serve", ["shell:jekyllServe"]);
  grunt.registerTask("default", ["uglify", "sass", "autoprefixer", "svgstore", "shell:jekyllBuild", "watch"]);

};
