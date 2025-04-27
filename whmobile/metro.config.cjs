const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('png');

config.resolver.sourceExts.push('cjs')

config.resolver.blockList = config.resolver.blockList || [];
config.resolver.resolverMainFields = ['browser', 'main'];



module.exports = config;


// mobile/metro.config.js
// const { getDefaultConfig } = require('expo/metro-config');

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);
//   // allow .cjs files
//   config.resolver.sourceExts.push('cjs');
//   return config;
// })();
