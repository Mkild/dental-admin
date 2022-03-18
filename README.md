# Dental Admin

<p align="center">
    <img src="https://i.imgur.com/7BPk0Hl.png" alt="dental-admin" />
</p>
<p align="center">
    <a href="https://v3.vuejs.org/"><img src="https://img.shields.io/badge/vue-v3.2.31-blue.svg?color=4FC08D&logo=vuedotjs" alt="vue" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-v4.6.2-blue.svg?color=3178C6&logo=typescript" alt="typescript" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/vite-v2.8.6-blue.svg?color=646CFF&logo=vite&logoColor=646CFF" alt="vite" /></a>
    <a href="https://router.vuejs.org/index.html"><img src="https://img.shields.io/badge/vue--router-v4.0.13-blue.svg?color=3EAF7C" alt="vue-router" /></a>
    <a href="https://pinia.vuejs.org/"><img src="https://img.shields.io/badge/pinia-v2.0.11-yellow.svg?color=FFD859" alt="pinia" /></a>
    <a href="https://element-plus.gitee.io/en-US/"><img src="https://img.shields.io/badge/element--plus-v2.0.2-blue.svg?color=409EFF" alt="element-plus" /></a>
    <a href="http://en.sass.hk/"><img src="https://img.shields.io/badge/sass-v1.49.9-blue.svg?color=CC6699&logo=sass" alt="sass" /></a>
    <img src="https://img.shields.io/badge/version-v1.0.0-yellow.svg" alt="version" />
    <img src="https://img.shields.io/badge/license-AGPL--3.0-green.svg" alt="license" />
</p>

> **Dental Admin 牙科诊所管理系统**
>
> 基于 Vue3、TypeScript、Vite 的牙科诊所管理系统 | Dental Admin based on Vue 3 + Typescript + Vite
>
> 同时使用了：路由 Vue Router，状态管理工具 Pinia，UI 组件库 Element Plus，CSS 预编译器 Sass...

## 简介

一个平平无奇的 web 后台管理系统，简单、纯净，未使用任何管理端模板。

前后端分离。

基于 Token(JWT) 实现登录注册和权限认证。

包含以下模块：

登录注册、公告管理、科室管理、药品管理、病历管理、收费统计、收入统计、门诊量统计、用户管理、问题反馈，

以及查看和修改个人详情、修改密码、退出登录、中英切换等功能。

更多功能有待后续开发。

接口在我的另一个仓库：dental-admin-api

> **接口指路：** [dental-admin-api](https://github.com/Mkild/dental-admin-api)

## 快速启动

```shell
# 克隆项目
# cnpmjs
git clone https://github.com.cnpmjs.org/Mkild/dental-admin.git
# or
git clone https://github.com/Mkild/dental-admin.git
# 进入项目目录
cd dental-admin
# 安装依赖 （推荐yarn）
npm install  / yarn
# 启动服务 （默认为http://localhost:3001）
npm run dev  / yarn dev
# 打包
npm run build  / yarn build
# 本地预览打包后的dist文件
npm run preview / yarn preview

```

## 使用到的插件/工具库

- **yarn** [yarn](https://yarn.bootcss.com) 依赖管理工具，比 npm 快一点
- **@vitejs/plugin-vue** [@vitejs/plugin-vue](https://vitejs.dev/plugins/#vitejs-plugin-vue) 提供 Vue3 单文件组件支持
- **@vitejs/plugin-legacy** [@vitejs/plugin-legacy](https://vitejs.cn/plugins/#vitejsplugin-legacy) 为打包后的文件提供传统浏览器兼容性支持
- **eslint-plugin-vue** [eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#faq) 为在.vue 文件和包含 vue 代码的 js 文件中使用 ESlint 提供支持
- **axios** [axios](https://github.com/axios/axios) 基于 Promise 的 HTTP 请求库
- **qs** [qs](https://github.com/ljharb/qs) 查询参数序列化和解析库
- **echarts** [echarts](https://echarts.apache.org) 一个基于 js 的开源可视化图表库
- **wangeditor** [wangeditor](https://www.wangeditor.com/doc) 轻量级 web 富文本编辑器
- **postcss-preset-env** 处理 css 浏览器兼容
- **postcss-pxtorem** 将 px 换算成 rem，实现自适应
- **vue-i18n** [vue-i18n](https://kazupon.github.io/vue-i18n) 国际化，最新版本支持 Vue3 和 ts
- **driver.js** [driver.js](https://github.com/kamranahmedse/driver.js) 用于分步引导，高亮提示
- **good-storage** [driver.js](https://github.com/kamranahmedse/driver.js) 对原生 web storage 的封装，简单好用，ts 支持: `yarn add @types/good-storage -D`
- **lodash-es** [lodash-es](https://www.lodashjs.com) js 模块化工具库 lodash 的 es modules 版本，体积更小， ts 支持: `yarn add @types/lodash-es -D`
- **unplugin-auto-import** 自动导入 Vue 中常用 api，也支持导入 element-plus 组件
- **unplugin-vue-components** 自动导入 Vue 单文件组件和主流组件库的组件，性能存在问题，手动导入仍是最优选择
- **animate.css** [animate.css](https://animate.style) 简单好用的 css 动画库
- **vue-tsc** 命令行检查

## 工程化

- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范： [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/)
- 提交规范：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)

## **浏览器支持**

|     IE      | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" height="24px" />](http://godban.github.io/browsers-support-badges/)Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari |
| :---------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| not support |                                                                                   last 2 versions                                                                                    |                                                                                         last 2 versions                                                                                         |                                                                                       last 2 versions                                                                                       |                                                                                       last 2 versions                                                                                       |

## 快照

![image.png](https://i.imgur.com/ni6Vu65.png)

![image.png](https://i.imgur.com/h0HxSia.png)

![image.png](https://i.imgur.com/gQ1mIQb.png)

![image.png](https://i.imgur.com/hoSWRua.png)

![image.png](https://i.imgur.com/DWxyRDm.png)
