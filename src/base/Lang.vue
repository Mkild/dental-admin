<template>
  <div class="lang">
    <el-dropdown size="large" trigger="click" @command="handleCommand">
      <Icon class="icon" size="21" type="translation" />
      <template #dropdown>
        <el-dropdown-menu class="lang-menu">
          <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">中文</el-dropdown-item>
          <el-dropdown-item command="en" :disabled="currentLanguage === 'en'">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
  import { useMainStore } from '@/store'

  export default defineComponent({
    name: 'Lang',
    setup() {
      const mainStore = useMainStore()
      const i18n = useI18n()

      const currentLanguage = computed(() => {
        return i18n.locale.value
      })

      const handleCommand = (lang: string) => {
        i18n.locale.value = lang
        mainStore.changeLang(lang)
      }

      return {
        currentLanguage,
        handleCommand,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .lang {
    .icon {
      color: $font-color-white;

      &:hover {
        color: #ffffff;
      }
    }
  }
</style>
