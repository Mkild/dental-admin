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
      <el-form-item :label="t('main.department.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.department.director')" prop="director">
        <el-input v-model="ruleForm.director"></el-input>
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
  import type { Department } from '@/interface'

  const mainStore = useMainStore()
  const { t } = useI18n()

  const props = defineProps({
    dialogTitle: {
      type: String,
      require: true,
    },
    dialogTableValue: {
      type: Object as () => Department,
      default: () => {},
      require: true,
    },
  })

  const ruleForm = reactive({
    name: '',
    director: '',
  })

  // 清空表单
  const clearForm = () => {
    resetForm(ruleFormRef.value)
    ruleForm.name = ''
    ruleForm.director = ''
  }

  watch(
    () => props.dialogTableValue,
    () => {
      if (props.dialogTitle === t('main.department.updateDepartment')) {
        ruleForm.name = props.dialogTableValue.name
        ruleForm.director = props.dialogTableValue.director
      } else {
        ruleForm.name = ''
        ruleForm.director = ''
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
  const checkName = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.department.checkName')))
    } else {
      callback()
    }
  }
  const checkDirector = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.department.checkDirector')))
    } else {
      callback()
    }
  }
  const rules = reactive({
    name: [
      { validator: checkName, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 10,
        message: t('main.department.nameLengthLimit'),
        trigger: 'blur',
      },
    ],
    director: [
      { validator: checkDirector, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 10,
        message: t('main.department.directorLengthLimit'),
        trigger: 'blur',
      },
    ],
  })

  // 表单提交
  const submitForm = () => {
    if (props.dialogTitle === t('main.department.insertDepartment')) {
      submitInsertForm('科室', ruleFormRef.value)
    } else if (props.dialogTitle === t('main.department.updateDepartment')) {
      submitUpdateForm('科室', props.dialogTableValue.id, ruleFormRef.value)
    } else {
      ElMessage.error(t('form.submitFailed'))
    }
  }
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
