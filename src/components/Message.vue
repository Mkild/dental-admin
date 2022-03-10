<!-- 目前的 message 只支持全局只有一个，暂时不修改为多个 -->
<template>
  <div v-show="visible" class="redcat-message left" @mouseover="clear" @mouseout="startTimer">
    <Icon type="close" size="14" @click="close" class="icon"></Icon>
    <span class="message-text">{{ message }}</span>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'Message',
  })
</script>

<script lang="ts" setup>
  import { getStyle, MessageProps, MessageType } from '@/utils/message'
  import { Ref } from 'vue'

  const message = ref('')
  const type: Ref<MessageType> = ref('success')
  const visible = ref(false)
  const closeTime: any = ref(null)

  const close = (): void => {
    visible.value = false
    closeTime.value && clearTimeout(closeTime.value)
    closeTime.value = null
  }
  // 暂时定为四秒后消失
  const startTimer = (): void => {
    closeTime.value = setTimeout(() => {
      close()
    }, 4000)
  }

  const open = (props: MessageProps): void => {
    if (closeTime.value) {
      clearTimeout(closeTime.value)
    }

    message.value = props.message
    type.value = props.type
    visible.value = true

    startTimer()
  }

  const zIndex = ref(new Date().getFullYear())

  const style = computed(() => getStyle(type.value))

  const clear = () => {
    closeTime.value && clearTimeout(closeTime.value)
  }

  defineExpose({
    open,
    close,
  })
</script>

<style lang="scss" scoped>
  .redcat-message {
    min-width: 100%;
    padding: 15px 15px 15px 20px;
    border-radius: 5px;
    background-color: v-bind('style.style.background');
    border: v-bind('style.style.border');
    color: v-bind('style.style.color');
    pointer-events: all;
    line-height: 1;

    .icon {
      margin-right: 10px;
      cursor: pointer;
    }
  }
</style>
