module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
  rules: {
    'no-var': 'warn', // 不能使用var声明变量
    'no-unused-vars': 'off',
    'no-extra-semi': 'error',
    '@typescript-eslint/indent': ['error', 2], // 缩进2个空格
    'import/extensions': 'off',
    'linebreak-style': [0, 'error', 'windows'],
    'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
    'eol-last': 0, // 不检测新文件末尾是否有空行
    semi: [2, 'never'], // 在语句后面加分号
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': 0,
    'no-new': 0, //允许使用 new 关键字
    'no-undef': 0,
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/valid-v-slot': 'off',
    'vue/script-indent': [
      'error',
      2,
      {
        // script标签缩进设置
        baseIndent: 1,
        switchCase: 1,
        ignores: [],
      },
    ],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        '@typescript-eslint/indent': 'off', // 关闭.vue默认缩进规则
      },
    },
  ],
}
