// metro.config.cjs
const { getDefaultConfig } = require('@expo/metro-config');

/** 
 * This loads all of Expo's default Metro config (transformers, assetExts, etc.)
 * and exports it as a CommonJS module so expo-doctor can require() it.
 */
module.exports = getDefaultConfig(__dirname);
