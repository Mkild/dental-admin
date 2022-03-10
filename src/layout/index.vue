<template>
  <Header />
  <div class="container">
    <Aside @widthChange="onWidthChange" class="aside" :style="asideWidth" />
    <div class="main">
      <suspense>
        <router-view v-slot="{ Component }">
          <transition
            enter-active-class="animate__animated animate__fadeInUp"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
            appear
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </suspense>
    </div>
  </div>
</template>

<script lang="ts">
  import Header from '@/layout/Header.vue'
  import Aside from '@/layout/Aside.vue'

  export default defineComponent({
    name: 'Layout',
    components: { Header, Aside },
    setup() {
      const asideWidth = ref('')

      // 侧边栏的折叠和展开
      const onWidthChange = (isCollapse: boolean) => {
        if (isCollapse === true) {
          asideWidth.value = 'flex: 0 0 auto'
        } else {
          asideWidth.value = ''
        }
      }

      return {
        asideWidth,
        onWidthChange,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    height: calc(100% - $header-height);

    .aside {
      flex: 0 0 $aside-width;
      height: 100%;
    }

    .main {
      flex: 1;
      width: calc(100% - $aside-width);
      min-width: $main-min-width;
      height: 100%;
      padding: 10px 80px;
      padding-bottom: 20px;
      overflow-y: scroll;
      scroll-behavior: smooth;
    }

    .animate__animated.animate__fadeInUp {
      --animate-duration: 0.6s;
    }

    .animate__animated.animate__fadeOut {
      --animate-duration: 0.3s;
    }
  }
</style>
