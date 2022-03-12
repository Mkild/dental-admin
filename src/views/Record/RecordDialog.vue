<template>
  <el-dialog
    :modal="false"
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="35%"
    :before-close="handleClose"
    @close="closeDialog"
    draggable
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" status-icon>
      <el-form-item :label="t('main.record.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.record.illness')" prop="illness">
        <el-input v-model="ruleForm.illness"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.record.text')" prop="text">
        <el-input
          v-model="ruleForm.text"
          :autosize="{ minRows: 2, maxRows: 6 }"
          type="textarea"
          maxlength="800"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item :label="t('main.record.dp')" prop="dp">
        <el-select v-model="ruleForm.dp" clearable :placeholder="t('main.record.dpPlaceholder')">
          <el-option v-for="dp in dpData" :key="dp.id" :label="dp.name" :value="dp.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('main.record.doctor')" prop="doctor">
        <el-autocomplete v-model="ruleForm.doctor" :fetch-suggestions="querySearch" @select="handleSelect">
          <template #default="item">
            <div class="value">{{ item.item }}</div>
          </template>
        </el-autocomplete>
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
  import { ElMessageBox } from 'element-plus'
  import type { ElForm } from 'element-plus'
  import { resetForm, submitInsertForm, submitUpdateForm } from '@/utils/form'
  import type { Record, Department } from '@/interface'
  import { isNum } from '@/utils'
  import { useMainStore, useUserStore } from '@/store'
  import { getAllDepartment } from '@/api'

  const mainStore = useMainStore()
  const userStore = useUserStore()
  const { t } = useI18n()

  const props = defineProps({
    dialogTitle: {
      type: String,
      require: true,
    },
    dialogTableValue: {
      type: Object as () => Record,
      default: () => {},
      require: true,
    },
  })

  const ruleForm = reactive({
    name: '',
    illness: '',
    text: '',
    dp: '',
    doctor: '',
  })

  // 获取科室数据(用于显示选择框选项)
  let dpData: Array<Department> = new Array()
  const getDepartmentData = async () => {
    const { departments }: { departments: Array<Department> } = await getAllDepartment()
    dpData = departments.slice()
  }
  await getDepartmentData()

  // 清空表单
  const clearForm = () => {
    resetForm(ruleFormRef.value)
    ruleForm.name = ''
    ruleForm.illness = ''
    ruleForm.text = ''
    ruleForm.dp = ''
    ruleForm.doctor = ''
  }

  watch(
    () => props.dialogTableValue,
    () => {
      if (props.dialogTitle === t('main.record.updateRecord')) {
        ruleForm.name = props.dialogTableValue.name
        ruleForm.illness = props.dialogTableValue.illness
        ruleForm.text = props.dialogTableValue.text
        ruleForm.dp = props.dialogTableValue.dp
        ruleForm.doctor = props.dialogTableValue.doctor
      } else {
        ruleForm.name = ''
        ruleForm.illness = ''
        ruleForm.text = ''
        ruleForm.dp = ''
        ruleForm.doctor = ''
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

  // 自动补全医生姓名
  const doctorRef = ref([userStore.username])
  const querySearch = (queryString: string, cb: (arg: Array<any>) => void) => {
    const results = doctorRef.value[0].toLowerCase().indexOf(queryString.toLowerCase()) === 0 ? doctorRef.value : []
    cb(results)
  }
  const handleSelect = (item: string) => {
    ruleForm.doctor = item
  }

  // 表单验证
  const ruleFormRef = ref<InstanceType<typeof ElForm>>()
  const checkName = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.record.checkName')))
    } else if (isNum(value)) {
      return callback(new Error(t('main.record.nameNotNum')))
    } else {
      callback()
    }
  }
  const checkIllness = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.record.checkIllness')))
    } else if (isNum(value)) {
      return callback(new Error(t('main.record.illnessNotNum')))
    } else {
      callback()
    }
  }
  const checkText = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.record.checkText')))
    } else if (isNum(value)) {
      return callback(new Error(t('main.record.textNotNum')))
    } else {
      callback()
    }
  }
  const checkDP = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.record.checkDP')))
    } else {
      callback()
    }
  }
  const checkDoctor = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.record.checkDoctor')))
    } else {
      callback()
    }
  }
  const rules = reactive({
    name: [
      { validator: checkName, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 20,
        message: t('main.record.nameLengthLimit'),
        trigger: 'blur',
      },
    ],
    illness: [
      { validator: checkIllness, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 20,
        message: t('main.record.illnessLengthLimit'),
        trigger: 'blur',
      },
    ],
    text: [
      { validator: checkText, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 800,
        message: t('main.record.textLengthLimit'),
        trigger: 'change',
      },
    ],
    dp: [{ validator: checkDP, required: true, trigger: 'change' }],
    doctor: [
      { validator: checkDoctor, required: true, trigger: 'change' },
      {
        min: 1,
        max: 20,
        message: t('main.record.doctorLengthLimit'),
        trigger: 'change',
      },
    ],
  })

  // 表单提交
  const submitForm = () => {
    if (props.dialogTitle === t('main.record.insertRecord')) {
      submitInsertForm('病历', ruleFormRef.value)
    } else if (props.dialogTitle === t('main.record.updateRecord')) {
      submitUpdateForm('病历', props.dialogTableValue.id, ruleFormRef.value)
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
