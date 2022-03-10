<template>
  <div class="buttons" id="fullscreen">
    <div @click="backIndex" class="mac-button red">
      <Icon :title="$t('header.fullscreen.backIndex')" :size="7" type="home" />
    </div>
    <div @click="exitFullscreenMode" class="mac-button yellow">
      <Icon :title="$t('header.fullscreen.exitFullscreenMode')" :size="7" type="minus" />
    </div>
    <div @click="fullscreenMode" class="mac-button green">
      <Icon :title="$t('header.fullscreen.fullscreenMode')" :size="7" type="fullscreen" />
    </div>
  </div>
</template>
<script>
  import { requestFullScreen, exitFullscreen, isFullscreen } from '@/utils'

  export default defineComponent({
    name: 'Fullscreen',
    setup() {
      const router = useRouter()

      // 返回首页
      const backIndex = () => {
        router.push('/')
      }
      // 全屏模式
      const fullscreenMode = () => {
        requestFullScreen(document.documentElement)
      }
      // 退出全屏模式
      const exitFullscreenMode = () => {
        if (isFullscreen()) {
          exitFullscreen()
        }
      }

      return {
        backIndex,
        fullscreenMode,
        exitFullscreenMode,
      }
    },
  })
</script>
<style lang="scss" scoped>
  .buttons {
    display: flex;
    flex: 1;
    text-align: right;

    &:hover {
      .mac-button {
        &:deep(i) {
          opacity: 1;
        }
      }
    }
    .mac-button {
      @include round(13px);
      @include flex-center;
      padding-bottom: 2px;
      margin-right: 8px;
      cursor: pointer;

      &:deep(i) {
        opacity: 0;
        transition: opacity 0.3s;
        color: $black;
        transform-origin: center center;
      }
      &.red {
        background: #df453b;
      }
      &.green {
        background: #7ddd45;
      }
      &.yellow {
        background: #f8d249;
      }
    }
  }
</style>
