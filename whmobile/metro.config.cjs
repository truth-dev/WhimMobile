const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push('png');

config.resolver.sourceExts.push('cjs')

config.resolver.blockList = config.resolver.blockList || [];
config.resolver.resolverMainFields = ['browser', 'main'];



module.exports = config;
