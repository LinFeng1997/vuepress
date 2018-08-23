const requireNodeConfig = require('./require-node-config')
const convert = require('koa-connect')

module.exports = {
  themeConfig: {
    navbar: false
  },
  head: [
    ['script', {src: '/simplemde.min.js'}],
    ['link', {rel: 'stylesheet', type: 'text/css', href: '/simplemde.min.css'}]
  ],
  sidebarDepth: 0,
  chainWebpack: (config, isServer) => {
    // config 是 ChainableConfig 的一个实例
    if (!isServer) {
      config.module
        .rule('js')
        .exclude.add(requireNodeConfig.requireNode.base)
      config.module
        .rule('compile')
        .test(/\.js$/)
        .use('require-node-loader').loader('require-node-loader').options(requireNodeConfig.requireNode).end()
        .include.add(requireNodeConfig.requireNode.base)
    }
  },
  webpackServer: (app, middleware, options) => {
    middleware.webpack()
    app.use(convert(require('require-node')(requireNodeConfig.requireNode)))
    middleware.content()
  }
}
