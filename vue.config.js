const path = require("path");
const resolve = function(dir) {
    return path.join(__dirname, dir);
};
const IP = require("ip").address();
module.exports = {
    chainWebpack: config => {},

    publicPath: "./", //process.env.NODE_ENV === "production" ? "./" : "./",
    outputDir: "dist",
    assetsDir: "static",
    lintOnSave: true, // 是否开启eslint保存检测
    productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
    chainWebpack: (config) => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@v", resolve("src/views"))
            .set("@c", resolve("src/components"))
            .set("@u", resolve("src/utils"))
            .set("@s", resolve("src/service")); /* 别名配置 */
        config.optimization.runtimeChunk("single");
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === "production") {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
        }
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    },

    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [path.resolve(__dirname, './src/assets/globalscss/*.scss'), ]
        },
    },
    devServer: {
        host: IP,
        port: "8080",
        hot: true,
        /* 自动打开浏览器 */
        open: false,
        overlay: {
            warning: false,
            error: true,
        },
        /* 跨域代理 */
        proxy: {
            '/api': {
                target: 'http://121.40.242.176:10010/api/DataVisualization', //API服务器的地址
                ws: true, //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            },
            '/rng': { //这里最好有一个 /
                target: 'http://45.105.124.130:8081', // 后台接口域名
                ws: true, //如果要代理 websockets，配置这个参数
                secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/rng': ''
                }
            }
        }
    }

}