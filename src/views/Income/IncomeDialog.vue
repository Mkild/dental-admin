<template>
  <el-dialog
    :modal="false"
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="30%"
    :before-close="handleClose"
    @close="closeDialog"
    draggable
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" status-icon>
      <el-form-item :label="t('main.income.date')" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          :placeholder="t('main.income.datePlaceholder')"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="t('main.income.total')" prop="total">
        <el-input-number v-model.number="ruleForm.total" :min="0" />
      </el-form-item>
    </el-form>
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
  import { Income } from '@/interface'
  import { isNum } from '@/utils'

  const mainStore = useMainStore()
  const { t } = useI18n()

  const props = defineProps({
    dialogTitle: {
      type: String,
      require: true,
    },
    dialogTableValue: {
      type: Object as () => Income,
      default: () => {},
      require: true,
    },
  })

  const ruleForm = reactive({
    date: '',
    total: 0,
  })

  // 清空表单
  const clearForm = () => {
    resetForm(ruleFormRef.value)
    ruleForm.date = ''
    ruleForm.total = 0
  }

  watch(
    () => props.dialogTableValue,
    () => {
      if (props.dialogTitle === t('main.income.updateIncome')) {
        ruleForm.date = props.dialogTableValue.date
        ruleForm.total = Number(props.dialogTableValue.total)
      } else {
        ruleForm.date = ''
        ruleForm.total = 0
      }
    },
    { deep: true, immediate: true }
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
  const checkDate = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.income.checkDate')))
    } else {
      callback()
    }
  }
  const checkTotal = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.income.checkTotal')))
    } else if (!isNum(value)) {
      return callback(new Error(t('main.income.totalIsNum')))
    } else if (value > 100000000) {
      return callback(new Error(t('main.income.totalSizeLimit')))
    } else {
      callback()
    }
  }
  const rules = reactive({
    date: [{ validator: checkDate, required: true, trigger: 'blur' }],
    total: [{ validator: checkTotal, required: true, trigger: 'change' }],
  })

  // 表单提交
  const submitForm = () => {
    if (props.dialogTitle === t('main.income.insertIncome')) {
      submitInsertForm('收入记录', ruleFormRef.value)
    } else if (props.dialogTitle === t('main.income.updateIncome')) {
      submitUpdateForm('收入记录', props.dialogTableValue.id, ruleFormRef.value)
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
