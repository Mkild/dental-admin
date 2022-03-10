<template>
  <div class="routes" id="routes">
    <Icon :title="$t('header.routes.back')" class="icon" type="back" @click="back" />
    <Icon :title="$t('header.routes.forward')" class="icon" type="forward" @click="forward" />
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Routes',
    setup() {
      const router = useRouter()
      // 后退
      const back = () => {
        router.back()
      }
      // 前进
      const forward = () => {
        router.forward()
      }

      return {
        back,
        forward,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .routes {
    display: flex;
    align-items: center;

    span {
      width: 24px;
      height: 24px;
      display: inline-block;
      @include flex-center;
      border-radius: 50%;
      &:hover {
        background: $theme-hover;
      }
    }

    .icon {
      margin-right: 10px;
    }
  }
</style>
