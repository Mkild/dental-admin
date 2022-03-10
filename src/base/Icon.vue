<template>
  <span>
    <i :class="getIconCls" :style="getIconStyle" class="iconfont icon-component" />
  </span>
</template>

<script lang="ts">
  import { StyleValue } from 'vue'
  import { toRem } from '@/utils'

  export default defineComponent({
    name: 'Icon',
    props: ['type', 'color', 'size'],
    mounted() {},
    computed: {
      getIconCls() {
        let cls = `icon-${this.type}`
        if (this.color) {
          cls += ` icon-color-${this.color}`
        }
        return cls
      },
      getIconStyle() {
        const retStyle: StyleValue = { fontSize: toRem(this.size) }
        const chromeMinSize = 12
        // 支持小于12px
        if (this.size < chromeMinSize) {
          const ratio = this.size / chromeMinSize
          retStyle.transform = `scale(${ratio})`
        }
        return retStyle
      },
    },
  })
</script>

<style lang="scss" scoped>
  .icon-component {
    cursor: pointer;
  }
  .icon-color {
    // 通过prop传入这几个字段
    // 可以使用默认的几个颜色
    &-theme {
      color: $theme-color;
    }
    &-font {
      color: $font-color;
    }
    &-white {
      color: $white;
    }
    &-gray {
      color: $gray;
    }
    &-grey {
      color: #a09f9f;
    }
    &-red {
      color: $red;
    }
    &-cyan {
      color: $cyan;
    }
    &-pink {
      color: $pink;
    }
    &-blue {
      color: $blue;
    }
    &-shallow {
      color: $font-shallow;
    }
  }
</style>
