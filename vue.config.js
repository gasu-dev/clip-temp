// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  pluginOptions: {
    electronBuilder: {
      externals: ['clipboard-event'],
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.join(__dirname, 'src'),
      },
    },
  },
};
