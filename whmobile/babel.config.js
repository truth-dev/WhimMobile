// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
// This file is used to configure Babel, which is a JavaScript compiler that allows you to use the latest JavaScript features in your React Native project.