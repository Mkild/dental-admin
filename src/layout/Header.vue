<template>
  <header>
    <!-- 网站logo和标题  -->
    <div class="logo" @click="onClickLogo">
      <img src="@/assets/image/logo.png" />
      <img v-if="mainStore.lang === 'zh'" src="@/assets/image/header-title.png" />
      <img v-else src="@/assets/image/header-title2.png" />
    </div>

    <!-- 路由按钮 -->
    <div class="header-routes"><Routes /></div>

    <!-- 用户信息 -->
    <div class="user">
      <UserAvatar />
    </div>

    <!-- 功能选项 -->
    <div class="options">
      <Driver class="icon" />
      <Lang class="icon" />
      <a href="https://github.com/Mkild/dental-admin" target="_blank">
        <Icon class="icon" size="21" type="github" />
      </a>
    </div>

    <!-- 最右侧功能区 -->
    <div class="right">
      <Fullscreen />
    </div>
  </header>
</template>

<script lang="ts">
  import { useMainStore } from '@/store'

  export default defineComponent({
    name: 'Header',
    setup() {
      const router = useRouter()
      const route = useRoute()
      const mainStore = useMainStore()
      const { t } = useI18n()

      // 返回首页
      const onClickLogo = () => {
        router.push('/')
      }

      // 动态修改标签标题
      watch(
        () => mainStore.lang,
        () => {
          if (route.meta.label) {
            const label = String(route.meta.label)
            document.title = `${t(label)} | ${t('header.logo.title')}`
          }
        }
      )

      return {
        onClickLogo,
        mainStore,
      }
    },
  })
</script>

<style lang="scss" scoped>
  header {
    width: 100%;
    height: $header-height;
    z-index: $header-z-index !important;
    background-color: $theme-color;
    display: flex;
    align-items: center;
  }

  // 网站logo和标题
  .logo {
    width: 230px;
    min-width: 230px;
    margin-left: 20px;
    margin-right: 50px;
    height: $header-height;
    display: flex;
    align-items: center;
    cursor: pointer;

    img:first-child {
      width: 40px;
      height: 40px;
    }

    img:last-child {
      margin-left: 5px;
      object-fit: contain;
      width: 180px;
    }
  }

  .header-routes {
    display: block;
    margin-right: 30px;
    color: $gray;
    white-space: nowrap;
  }

  .user {
    margin-left: auto;
    margin-right: 10px;
  }

  .options {
    display: flex;
    align-items: center;
    margin-right: 40px;
    color: $font-color-white;
    cursor: pointer;

    &::before {
      content: '';
      height: 21px;
      margin: 0 10px;
      border-left: 1px solid $border-color;
    }

    .icon {
      margin-right: 18px;
      color: $font-color-white;

      &:hover {
        color: #ffffff;
      }
    }
  }

  // 全屏按钮
  .right {
    justify-self: flex-end;
    margin-bottom: 30px;
  }
</style>
