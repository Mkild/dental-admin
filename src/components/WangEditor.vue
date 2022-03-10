<template>
  <div ref="editor"></div>
  <el-button type="info" @click="syncHTML" class="button">
    {{ $t('wangEditor.syncContent') }}
  </el-button>
  <el-button type="danger" @click="clearText" class="button">
    {{ $t('wangEditor.clearContent') }}
  </el-button>
  <!-- <div :innerHTML="content.html"></div> -->
</template>

<script>
  // import { onMounted, onBeforeUnmount, ref, reactive, watch } from 'vue'
  import WangEditor from 'wangeditor'

  export default defineComponent({
    name: 'WangEditor',
    emits: ['getRichText'],
    props: {
      text: {
        type: String,
        default: '',
      },
    },
    setup(props, ctx) {
      const editor = ref()
      const content = reactive({
        html: '',
        text: '',
      })

      let instance
      onMounted(() => {
        instance = new WangEditor(editor.value)
        Object.assign(instance.config, {
          onchange() {
            // console.log('change')
          },
        })
        instance.config.height = 150
        instance.create()
        instance.txt.html(props.text)
      })
      onBeforeUnmount(() => {
        instance.destroy()
        instance = null
      })
      watch(
        () => props.text,
        () => {
          instance.txt.html(props.text)
        },
        { deep: true }
      )
      const syncHTML = () => {
        content.html = instance.txt.html()
        ctx.emit('getRichText', content.html)
      }
      const clearText = () => {
        instance.txt.clear()
      }
      return {
        syncHTML,
        clearText,
        editor,
        content,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .button {
    margin-top: 10px;
  }
</style>
