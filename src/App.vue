<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
  import en from 'element-plus/lib/locale/lang/en'
  import zh from 'element-plus/lib/locale/lang/zh-cn'
  import { useMainStore } from './store'

  export default defineComponent({
    name: 'App',
    setup() {
      const mainStore = useMainStore()

      // 切换elementPlus语言
      const locale = computed(() => {
        switch (mainStore.lang) {
          case 'zh':
            return zh
          case 'en':
            return en
          default:
            break
        }
      })

      return {
        locale,
      }
    },
  })
</script>

<style lang="scss">
  #app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    --el-color-primary: #0c9661; // elementPlus主题色
  }
</style>
