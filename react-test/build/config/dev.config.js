const cm = require('../utils/cmnode');

module.exports = {
  host: cm.getIP(),
  port: 8020,
  proxy: {
    '/collect': {
      target: 'http://172.16.2.42:8180',
      secure: false
    }
  }
}