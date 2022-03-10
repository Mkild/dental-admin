<template>
  <el-dialog
    :modal="false"
    :model-value="dialogVisible"
    :title="t('main.feedback.insertFeedback')"
    width="40%"
    :before-close="handleClose"
    @close="closeDialog"
    draggable
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" status-icon>
      <el-form-item :label="t('main.feedback.title')" prop="title">
        <el-input v-model="ruleForm.title" :placeholder="t('main.feedback.titlePlaceholder')"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.feedback.text')" prop="text">
        <el-input
          v-model="ruleForm.text"
          :autosize="{ minRows: 6, maxRows: 10 }"
          type="textarea"
          maxlength="800"
          :placeholder="t('main.feedback.textPlaceholder')"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="handleClose" plain>{{ t('form.cancel') }}</el-button>
        <el-button type="primary" @click="submitInsertForm('反馈记录', ruleFormRef)">{{ t('form.submit') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { useMainStore } from '@/store'
  import { ElMessageBox } from 'element-plus'
  import type { ElForm } from 'element-plus'
  import { resetForm, submitInsertForm } from '@/utils/form'
  import { isNum } from '@/utils'

  const mainStore = useMainStore()
  const { t } = useI18n()

  const ruleForm = reactive({
    title: '',
    text: '',
    editor: '',
  })

  // 清空表单
  const clearForm = () => {
    resetForm(ruleFormRef.value)
    ruleForm.title = ''
    ruleForm.text = ''
    ruleForm.editor = ''
  }

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
      return callback(new Error(t('main.feedback.checkTitle')))
    } else {
      callback()
    }
  }
  const checkText = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.feedback.checkText')))
    } else if (isNum(value)) {
      return callback(new Error(t('main.feedback.textNotNum')))
    } else {
      callback()
    }
  }
  const rules = reactive({
    title: [
      { validator: checkTitle, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 20,
        message: t('main.feedback.titleLengthLimit'),
        trigger: 'blur',
      },
    ],
    text: [
      { validator: checkText, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 800,
        message: t('main.feedback.textLengthLimit'),
        trigger: 'change',
      },
    ],
  })
</script>

<style scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .rule-form {
    display: flex;
    justify-content: center;
  }
</style>
