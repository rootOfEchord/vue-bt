
module.exports = {
    publicPath: './',
    assetsDir: 'assets',
    outputDir: 'dist',
    devServer: {
        host: '',
        port: 39200, // 端口号
        // inline: false,
        // open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BASE_URL, // target host
                // target: 'http://118.24.97.109:666/api', // target host
                ws: true, // proxy websockets
                changeOrigin: true, // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': '' // rewrite path
                }
            },
        }
    },
}