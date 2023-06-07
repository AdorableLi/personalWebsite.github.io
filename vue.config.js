const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
});
module.exports = {
    lintOnSave: false,
    // publicPath: './',
    devServer: {
        proxy: {
            '/api': {
                // target: 'https://api.xueqiu.com',
                // target: 'https://api.bilibili.com',
                target: 'http://127.0.0.1:8888',
                changeOrigin: true, // 允许跨域
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    // configureWebpack: {
    //     resolve: {
    //         fallback: { path: require.resolve('path-browserify') },
    //     },
    //     externals: {
    //         electron: 'require("electron")',
    //     },
    // },
};
