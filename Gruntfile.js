module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify:{
            options:{
                stripBanners:true,
                banner:'/* skPlayer by Scott */\n'
            },
            build:{
                src:'./src/skPlayer.js',
                dest:'./dist/skPlayer.min.js'
            }
        },
        cssmin:{
            target:{
                files:[{
                    expand:true,
                    cwd:'src/',
                    src:'*.css',
                    dest:'dist/',
                    ext:'.min.css'
                }]
            }
        },
        watch:{
            build:{
                files:['src/*.js','src/*.css'],
                tasks:['uglify','cssmin'],
                options:{ spawn:false }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['uglify','cssmin','watch']);
};