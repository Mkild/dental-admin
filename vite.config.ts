import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import ElementPlus from 'unplugin-element-plus/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: false, // 是否开启 https
    port: 3001, // 指定端口
    open: false, // 是否自动打开浏览器
  },
  plugins: [
    vue(),
    // ElementPlus手动import
    // 手动和自动不可同时使用，会冲突
    // ElementPlus(),
    AutoImport({
      // ElementPlus自动import
      resolvers: [ElementPlusResolver()],
      // 按需import所有指定的api
      imports: ['vue', 'vue-router', 'vue-i18n'],
      // 指定类型声明文件目录，为true时在项目根目录创建
      dts: 'src/types/auto-imports.d.ts',
    }),
    Components({
      // ElementPlus自动按需导入
      resolvers: [ElementPlusResolver()],
      // 按需导入此目录下所有组件
      dirs: ['src/base', 'src/components'],
      // 组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: true,
      // 指定类型声明文件目录，为true时在项目根目录创建
      dts: 'src/types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': '/src', // 目录别名
      // 解决i18n在开发环境下的警告
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  css: {
    //css预处理
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/style/variables.scss";
          @import "@/style/mixin.scss";
        `,
      },
    },
  },
})
