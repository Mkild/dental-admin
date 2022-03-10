<template>
  <div class="title-wrap">
    <p class="title" :class="getTitleCls" @click="onclickTitle(index)">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Title',
    props: {
      index: String,
      // 鼠标指针类型 不传默认pointer
      // default对应cursor: default
      // pointer对应cursor: pointer
      type: {
        type: String,
        default: 'default',
      },
    },
    methods: {
      onclickTitle(index: string | undefined) {
        if (index) {
          this.$router.push(index)
        }
      },
    },
    computed: {
      getTitleCls() {
        let cls = `title-${this.type}`
        return cls
      },
    },
  })
</script>

<style lang="scss" scoped>
  .title-wrap {
    display: flex;
    padding: 12px 0;

    .title {
      font-size: $font-size-title;
      color: $font-color;
      font-weight: bolder;

      &-pointer {
        cursor: pointer;

        &:hover {
          color: #000000;
        }
      }

      &-default {
        cursor: default;
      }
    }
  }
</style>
