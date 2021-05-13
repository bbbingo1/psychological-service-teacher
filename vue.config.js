module.exports = {
  publicPath: './',
  outputDir: "dist",
  assetsDir: 'static',
  pwa: {
    iconPaths: {
      favicon32: 'static/img/titleicon.jpg',
      favicon16: 'static/img/titleicon.jpg',
      appleTouchIcon: 'static/img/titleicon.jpg',
      maskIcon: 'static/img/titleicon.jpg',
      msTileImage: 'static/img/titleicon.jpg'
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://1.117.110.210:80/', //接口域名
        changeOrigin: true,             //是否跨域
        ws: true,                       //是否代理 websockets
        secure: true,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/api': ''
        }
      }
    }
  }
};