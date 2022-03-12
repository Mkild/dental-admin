<template>
  <el-dialog
    :modal="false"
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="50%"
    :before-close="handleClose"
    @close="closeDialog"
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon>
      <el-form-item :label="t('main.notice.title')" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.notice.text')" prop="text">
        <el-input v-model="ruleForm.text" type="textarea" maxlength="10000" show-word-limit></el-input>
      </el-form-item>
    </el-form>
    <WangEditor ref="editor" @getRichText="getRichText" :text="text" />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="handleClose" plain>{{ t('form.cancel') }}</el-button>
        <el-button type="primary" @click="submitForm">{{ t('form.submit') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { useMainStore } from '@/store'
  import { ElMessageBox } from 'element-plus'
  import type { ElForm } from 'element-plus'
  import { resetForm, submitInsertForm, submitUpdateForm } from '@/utils/form'
  import type { Notice } from '@/interface'
  import { Ref } from 'vue'

  const mainStore = useMainStore()
  const { t } = useI18n()

  const props = defineProps({
    dialogTitle: {
      type: String,
      require: true,
    },
    dialogTableValue: {
      type: Object as () => Notice,
      default: () => {},
      require: true,
    },
    noticeText: {
      type: String,
      default: '',
    },
  })

  const ruleForm = reactive({
    title: '',
    text: '',
  })
  const text = ref('')

  // 清空表单
  interface Editor extends HTMLElement {
    clearText: () => void
  }
  const editor: Ref<Editor | null> = ref(null)
  const clearForm = () => {
    resetForm(ruleFormRef.value)
    onMounted(() => {
      if (editor.value) {
        editor.value.clearText()
      }
    })
    ruleForm.title = ''
    ruleForm.text = ''
    text.value = ''
  }

  watch(
    () => props.dialogTableValue,
    () => {
      if (props.dialogTitle === t('main.notice.updateNotice')) {
        ruleForm.title = props.dialogTableValue.title
        ruleForm.text = props.noticeText
        text.value = props.noticeText
      } else {
        ruleForm.title = ''
        ruleForm.text = ''
        text.value = ''
      }
    },
    { deep: true, immediate: true }
  )

  watch(
    () => props.noticeText,
    () => {
      ruleForm.text = props.noticeText
      text.value = props.noticeText
    },
    { deep: true }
  )

  // 关闭对话框
  const dialogVisible = ref(false)
  const emits = defineEmits(['update:modelValue'])
  const closeDialog = () => {
    emits('update:modelValue', false)
    clearForm()
  }
  const handleClose = () => {
    ElMessageBox.confirm(t('form.message.confirmText'), 'Warning', {
      confirmButtonText: t('form.message.confirmButtonText'),
      cancelButtonText: t('form.message.cancelButtonText'),
      type: 'warning',
    })
      .then(() => {
        closeDialog()
      })
      .catch((err) => {
        // console.log(err)
      })
  }
  // 列表数据刷新时关闭对话框
  watch(
    () => mainStore.needRefresh,
    () => {
      closeDialog()
    },
    { deep: true }
  )

  // 表单验证
  const ruleFormRef = ref<InstanceType<typeof ElForm>>()
  const checkTitle = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.notice.checkTitle')))
    } else {
      callback()
    }
  }
  const checkText = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.notice.checkText')))
    } else {
      callback()
    }
  }
  const getRichText = (text: string) => {
    ruleForm.text = text
  }
  const rules = reactive({
    title: [
      { validator: checkTitle, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 30,
        message: t('main.notice.titleLengthLimit'),
        trigger: 'blur',
      },
    ],
    text: [
      { validator: checkText, required: true, trigger: 'change' },
      {
        min: 1,
        max: 10000,
        message: t('main.notice.textLengthLimit'),
        trigger: 'change',
      },
    ],
  })

  // 表单提交
  const submitForm = () => {
    if (props.dialogTitle === t('main.notice.insertNotice')) {
      submitInsertForm('公告', ruleFormRef.value)
    } else if (props.dialogTitle === t('main.notice.updateNotice')) {
      submitUpdateForm('公告', props.dialogTableValue.id, ruleFormRef.value)
    } else {
      ElMessage.error(t('form.submitFailed'))
    }
  }
</script>

<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
