const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.server = {
  ...config.server,
  rewriteRequestUrl: (url) => {
    // Serve the app for any non-file route
    if (!url.includes('.') && url !== '/') {
      return '/';
    }
    return url;
  },
};

module.exports = config;