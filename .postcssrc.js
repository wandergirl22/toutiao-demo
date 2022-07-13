module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    // 该插件**不能转换行内样式中的px
    'postcss-pxtorem': {
      rootValue: (module) => (/vant/gi.test(module.file) ? 37.5 : 75),
      propList: ['*']
    }
  }
}
