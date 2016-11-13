'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var appConfig = {
        app: 'app',     //开发目录
        dist: 'dist',    //优化目录
        deploy: 'deploy'   //部署目录
    };

    /*自定义模板标签*/
    grunt.template.addDelimiters('version-template', '{{', '}}');
    var version = 'ver=' + new Date().getTime();

    /*grunt的所有任务配置*/
    grunt.initConfig({
        appPath: appConfig.app,
        distPath: appConfig.dist,
        deployPath: appConfig.deploy,
        /*sprite 配置 用于图片合并*/
        sprite: {
            options: {
                // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                imagepath: '<%= appPath %>/images/slice/',
                // 映射CSS中背景路径，支持函数和数组，默认为 null
                imagepath_map: null,
                // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                spritedest: '<%= appPath %>/images/',
                // 替换后的背景路径，默认 ../images/
                spritepath: '../images/',
                // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                padding: 2,
                // 是否使用 image-set 作为2x图片实现，默认不使用
                useimageset: false,
                //否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                newsprite: false,
                // 给雪碧图追加时间戳，默认不追加
                spritestamp: true,
                // 在CSS文件末尾追加时间戳，默认不追加
                cssstamp: true,
                // 默认使用二叉树最优排列算法
                algorithm: 'binary-tree',
                // 默认使用`pixelsmith`图像处理引擎
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    // 启用动态扩展
                    expand: true,
                    // css文件源的文件夹
                    cwd: '<%= appPath %>/less/',
                    // 匹配规则
                    src: 'sprite.css',
                    // 导出css和sprite的路径地址
                    dest: '<%= appPath %>/less/',
                    // 导出的css名
                    ext: '.less'
                }]
            }
        },
        /*less的配置 用于less编译成css*/
        less: {
            compile: {
                files:[{
                    expand:true,
                    cwd:'<%= appPath %>/less',
                    src: ['./main.less'],
                    ext:'.css',
                    dest:'<%= appPath %>/css/'
                }]
            }
        },
        /*用于把开发目录的文件复制到部署目录*/
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= appPath %>',
                    src: [
                        '*.html',
                        '*.ico',
                        '*.xml',
                        '*.txt',
                        'view/**/*.html',
                        'text/*',
                        'images/**/*',
                        'css/images/*.png',
                        'lib/**/*',
                        'down-file/**/*',
                        'css/main.css',
                        'test/*',
                        'special/**/*',
                        'news/**/*'
                    ],
                    dest: '<%= distPath %>'
                },
                {   //专门用于复制bootstrap的font
                    expand: true,
                    cwd: '<%= appPath %>/lib/bootstrap/dist',
                    src: ['fonts/{,*/}*.*'],
                    dest: '<%= distPath %>'
                }
                ]

            },
            deploy: {
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: [
                        '**/*'
                    ],
                    dest: '<%= deployPath %>'
                }]
            }
        },
        /*用于清空dist目录*/
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= distPath %>/**/*'
                    ]
                }]
            },
            deploy: {
                files: [{
                    dot: true,
                    src: [
                        //'<%= deployPath %>/css',
                        //'<%= deployPath %>/fonts',
                        //'<%= deployPath %>/homePage',
                        //'<%= deployPath %>/images',
                        //'<%= deployPath %>/js',
                        //'<%= deployPath %>/view',
                        //'<%= deployPath %>/lib',
                        //'<%= deployPath %>/index.html'
                        '<%= deployPath %>/*',
                        '!<%= deployPath %>/META-INF',
                        '!<%= deployPath %>/WEB-INF',
                        '!<%= deployPath %>/index.jsp'

                    ]
                }]
            }
        },
        /*给angular添加依赖注入，使压缩的时候更加安全*/
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: ['*.js', '!oldieshim.js'],
                    dest: '.tmp/concat/js'
                }]
            }
        },
        /*给js和css添加MD5，用于部署新版本*/
        filerev: {
            dist: {
                src: [
                    '<%= distPath %>/js/{,*/}*.js',
                    '<%= distPath %>/css/{,*/}*.css'
                ]
            }
        },
        /*给css添加浏览器的前缀*/
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            app: {
                files: [{
                    expand: true,
                    cwd: '<%= appPath %>/css',
                    src: '{,*/}*.css',
                    dest: '<%= appPath %>/css/'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: 'css/{,*/}*.css',
                    dest: '<%= distPath %>/css/'
                }]
            }
        },
        /*配置js和css的优化任务，主要用于未压缩js、css自动转化成已压缩的js和css*/
        useminPrepare: {
            html: '<%= appPath %>/index.html',
            options: {
                dest: '<%= distPath %>',
                flow: {
                    html: {
                        steps: {
                            //js: ['concat', 'uglifyjs'],
                            js: ['uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        usemin: {
            html: ['<%= distPath %>/{,*/}*.html'],
            options: {
                assetsDirs: ['<%= distPath %>']
            }
        },
        /*自定义css压缩配置*/
        cssmin: {
            dist: {
                expand: true,        // 启用下面的选项
                cwd: '<%= appPath %>/css',
                src: 'main.css',
                dest: '<%= distPath %>/css/'
            }
        },
        /*对于含有css hack的样式，cssmin压缩会有问题，使用csso来压缩*/
        csso: {
            dist: {
                expand: true,        // 启用下面的选项
                cwd: '<%= appPath %>/css',
                src: 'main.css',
                dest: '<%= distPath %>/css/'
            }
        },
        /*自定义压缩js配置*/
        uglify: {
            dist: {
                expand: true,        // 启用下面的选项
                cwd: '<%= appPath %>/js',
                src: ['{,*/}*.js'],
                dest: '<%= distPath %>/js/'
            }
        },
        /*压缩html模板*/
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: ['*.html', 'view/{,*/}*.html', 'homePage/{,*/}*.html'],
                    dest: '<%= distPath %>'
                }]
            }
        },
        /*写入html模板，专门用做版本控制*/
        'template': {
            'process-html-template': {
                'options': {
                    'data': {
                        'version': version,
                        'rqVersion': version
                    },
                    'delimiters': 'version-template'
                },
                files: [{
                    expand: true,
                    cwd: '<%= distPath %>',
                    src: ['*.html'],
                    dest: '<%= distPath %>'
                }]
            }
        },
        /*配置静态文件服务器*/
        connect: {
            options: {
                hostname: 'localhost',
                livereload: 35729
            },
            app: {
                options: {
                    port: 9000,
                    open: true,
                    base: ['<%= appPath %>']
                }
            },
            dist: {
                options: {
                    port: 9001,
                    open: true,
                    base: ['<%= distPath %>']
                }
            },
            deploy: {
                options: {
                    port: 9001,
                    open: true,
                    base: ['<%= deployPath %>']
                }
            }
        },
        /*配置监听文件*/
        watch: {
            options: {
                livereload: 35729
            },
            all: {
                options: {livereload:true},
                files : ['<%= appPath %>/**/*', '!<%= appPath %>/less/*', '!<%= appPath %>/lib/*']
            },
            less:{
                files:'<%= appPath %>/less/*.less',
                options: {livereload:true},
                tasks:['less']
            }
        },
        /*requirejs 优化任务*/
        requirejs : {
            deploy: {
                options: {
                    //appDir: 'app',
                    mainConfigFile: '<%= distPath %>/js/config.js',
                    //dir: 'compile',
                    baseUrl: 'app',
                    out: '<%= distPath %>/js/config.js',
                    optimize: "uglify",
                    name: 'js/config',
                    removeCombined: true,
                    preserveLicenseComments: false,  //删除注释
                    //fileExclusionRegExp: '.html$|css|images|less|template|test|text|compile|.idea',
                    findNestedDependencies: true,   //把所以依赖都打包进来
                    optimizeAllPluginResources: true,
                    onBuildWrite: function( moduleName, path, contents) {   /*用于生产环境去掉console.log*/
                        return ';window.console.log = function(){};' + contents;
                    }
                }
            }
        }
    });

    /*默认任务，开发的时候用*/
    grunt.registerTask('default', [
        'sprite',
        'less',
        'autoprefixer:app',
        'connect:app',
        'watch'
    ]);

    /*部署的时候用*/
    grunt.registerTask('build', [
        'clean:dist',
        'sprite',
        'less',
        //'htmlbuild',
        //'useminPrepare',
        'autoprefixer:app',
        //'concat',
        //'ngAnnotate',
        'copy:dist',
        'csso',
        //'filerev',
        //'usemin',
        'uglify',
        'requirejs',
        //'htmlmin',
        'template',
        'clean:deploy',
        'copy:deploy',
        'connect:deploy:keepalive'
    ]);

    /*只用来开启静态文件服务器*/
    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['connect:deploy:keepalive']);
        }else{
            grunt.task.run(['connect:app:keepalive']);
        }
    });

}