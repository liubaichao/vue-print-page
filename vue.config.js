module.exports = {
  publicPath: './', //修改基础路径
  productionSourceMap: process.env.VUE_APP_CURRENTMODE == 'production'?true:false,//false 混淆
  lintOnSave: false //关闭list
  //   devServer: { //代理跨域，后台给力，使用不到
  //     proxy: {
  //         '/api': {
  //             target: 'http://xxx.com.cn',  // http://192.168.13.68:8000
  //             ws: true,  // proxy websockets 
  //             changeOrigin: true,  // needed for virtual hosted sites
  //             pathRewrite: {
  //                 '^/api': ''  // rewrite path
  //             }
  //         },
  //     }
  // }
}
