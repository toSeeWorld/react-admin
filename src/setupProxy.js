const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(createProxyMiddleware("/devApi", {
        target: "http://www.web-jshtml.cn/api/react", //配置你要请求的服务器地址
        changeOrigin: true,
        pathRewrite: {
            "^/devApi" : ""
        },
    }))
    // /devApi/login/
    /**
     * 1、匹配到devApi，开始做代理  http://www.web-jshtml.cn/api/react
     * 2、/devApi/login/ => /login/
     * 3、替换之后的地址：http://www.web-jshtml.cn/api/react/login/
     */
    // app.use(proxy("/manage/api", {
    //     target: "http://admintest.happymmall.com:7000" ,
    //     changeOrigin: true,
    // }))
};
