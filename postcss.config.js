module.exports = {
  plugins: {
    'postcss-preset-env': {},
    'postcss-pxtorem': {
      rootValue: 18, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
      propList: ['*'],
      selectorBlackList: ['.norem'], // 过滤掉 .norem 开头的 class，不进行转换
    },
  },
}
