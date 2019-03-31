const cache = require('memory-cache')

const installMemoryCache = function (req, res, next) {
  res.cache = cache

  next()
}

module.exports = installMemoryCache