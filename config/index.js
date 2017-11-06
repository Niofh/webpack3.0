module.exports = {
  build: {
    ajaxBaseUrl: '/backstage',   // ajax
    routerBaseUrl: '/zinyun-leyin/dist/', // router
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip:false,
    productionGzipExtensions: ['js', 'css'],
  },
  dev: {
    ajaxBaseUrl: 'http://192.168.1.187:8080/backstage',
    routerBaseUrl: '/',
  }
}