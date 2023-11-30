const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) =>
{
  config.resolve.fallback = {
    crypto: false, // crypto-browserify can be polyfilled here if needed
    stream: false, // stream-browserify can be polyfilled here if needed
    assert: false, // assert can be polyfilled here if needed
    os: false, // os-browserify can be polyfilled here if needed
    https: false, // https-browserify can be polyfilled here if needed
    http: false, // stream-http can be polyfilled here if needed
    url: "url", // url is needed if using `signer.provider.send` method for signing from ethers.js
    zlib: false, // browserify-zlib can be polyfilled here if needed
    path: false
  };
}})
