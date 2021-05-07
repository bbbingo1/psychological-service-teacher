module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.137.176:8000/', //接口域名
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