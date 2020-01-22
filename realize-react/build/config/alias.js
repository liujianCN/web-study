const {resolve} = require('../utils/common');
module.exports = {
  '@': resolve('src'),
  'modules': resolve('src/modules'),
  'components': resolve('src/components'),
  'constants': resolve('src/constants'),
  'styles': resolve('src/styles'),
  'utils': resolve('src/utils'),
  'selectors': resolve('src/selectors'),
  'store': resolve('src/redux/store'),
  'assets': resolve('src/assets'),
  'http': resolve('src/http'),
  'reducers': resolve('src/redux/reducers'),
  'actions': resolve('src/redux/actions'),
  'indexJS': resolve('src/indexJS/indexJS'),
  'CONF': resolve('src/CONF'),
  'image': resolve('src/assets/images')
}