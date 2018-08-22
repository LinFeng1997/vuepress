const path = require('path')

module.exports = {
  isDebug: !process.env.NODE_ENV,

  requireNode: {
    isDebug: !process.env.NODE_ENV,
    base: path.resolve(__dirname, './api')
  }
}
