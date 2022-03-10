<template>
  <el-dialog
    :modal="false"
    :model-value="dialogVisible"
    :title="dialogTitle"
    width="28%"
    :before-close="handleClose"
    @close="closeDialog"
    draggable
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" status-icon>
      <el-form-item :label="t('main.drug.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.drug.price')" prop="price">
        <el-input-number v-model.number="ruleForm.price" :precision="2" :step="0.1" :min="0" />
      </el-form-item>
      <el-form-item :label="t('main.drug.quantity')" prop="quantity">
        <el-input-number v-model.number="ruleForm.quantity" :min="0" />
      </el-form-item>
      <el-form-item :label="t('main.drug.factory')" prop="factory">
        <el-input v-model="ruleForm.factory"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.drug.batch')" prop="batch">
        <el-input v-model="ruleForm.batch"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.drug.pd')" prop="pd">
        <el-date-picker v-model="ruleForm.pd" type="datetime" placeholder="Select date and time" />
      </el-form-item>
      <el-form-item :label="t('main.drug.exp')" prop="exp">
        <el-date-picker v-model="ruleForm.exp" type="datetime" placeholder="Select date and time" />
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

<script lang="ts">
  export default defineComponent({
    name: 'Drug',
  })
</script>

<script lang="ts" setup>
  import { useMainStore } from '@/store'
  import { ElMessageBox } from 'element-plus'
  import type { ElForm } from 'element-plus'
  import { resetForm, submitInsertForm, submitUpdateForm } from '@/utils/form'
  import { isNum } from '@/utils'
  import { Drug } from '@/interface'

  const mainStore = useMainStore()
  const { t } = useI18n()

  const props = defineProps({
    dialogTitle: {
      type: String,
      require: true,
    },
    dialogTableValue: {
      type: Object as () => Drug,
      default: () => {},
      require: true,
    },
  })

  const ruleForm = reactive({
    name: '',
    price: 0.0,
    quantity: 0,
    factory: '',
    batch: '',
    pd: new Date(),
    exp: new Date(),
  })

  // 清空表单
  const clearForm = () => {
    resetForm(ruleFormRef.value)
    ruleForm.name = ''
    ruleForm.price = 0.0
    ruleForm.quantity = 0
    ruleForm.factory = ''
    ruleForm.batch = ''
    ruleForm.pd = new Date()
    ruleForm.exp = new Date()
  }

  watch(
    () => props.dialogTableValue,
    () => {
      if (props.dialogTitle === t('main.drug.updateDrug')) {
        ruleForm.name = props.dialogTableValue.name
        ruleForm.price = Number(props.dialogTableValue.price)
        ruleForm.quantity = Number(props.dialogTableValue.quantity)
        ruleForm.factory = props.dialogTableValue.factory
        ruleForm.batch = props.dialogTableValue.batch
        ruleForm.pd = props.dialogTableValue.pd
        ruleForm.exp = props.dialogTableValue.exp
      } else {
        ruleForm.name = ''
        ruleForm.price = 0.0
        ruleForm.quantity = 0
        ruleForm.factory = ''
        ruleForm.batch = ''
        ruleForm.pd = new Date()
        ruleForm.exp = new Date()
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
      return callback(new Error(t('main.drug.checkName')))
    } else if (isNum(value)) {
      return callback(new Error(t('main.drug.nameNotNum')))
    } else {
      callback()
    }
  }
  const checkPrice = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.drug.checkPrice')))
    } else if (!isNum(value)) {
      return callback(new Error(t('main.drug.priceIsNum')))
    } else if (value > 100000000) {
      return callback(new Error(t('main.drug.priceSizeLimit')))
    } else {
      callback()
    }
  }
  const checkQuantity = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.drug.checkQuantity')))
    } else if (!isNum(value)) {
      return callback(new Error(t('main.drug.quantityIsNum')))
    } else if (value > 100000000) {
      return callback(new Error(t('main.drug.quantitySizeLimit')))
    } else {
      callback()
    }
  }
  const checkFactory = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.drug.checkFactory')))
    } else if (isNum(value)) {
      return callback(new Error(t('main.drug.factoryNotNum')))
    } else {
      callback()
    }
  }
  const checkBatch = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.drug.checkBatch')))
    } else {
      callback()
    }
  }
  const checkPD = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.drug.checkPD')))
    } else {
      callback()
    }
  }
  const checkEXP = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.drug.checkEXP')))
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
        message: t('main.drug.nameLengthLimit'),
        trigger: 'blur',
      },
    ],
    price: [{ validator: checkPrice, required: true, trigger: 'change' }],
    quantity: [{ validator: checkQuantity, required: true, trigger: 'change' }],
    factory: [
      { validator: checkFactory, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 25,
        message: t('main.drug.factoryLengthLimit'),
        trigger: 'blur',
      },
    ],
    batch: [
      { validator: checkBatch, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 20,
        message: t('main.drug.batchLengthLimit'),
        trigger: 'blur',
      },
    ],
    pd: [{ validator: checkPD, required: true, trigger: 'change' }],
    exp: [{ validator: checkEXP, required: true, trigger: 'change' }],
  })

  // 表单提交
  const submitForm = () => {
    if (props.dialogTitle === t('main.drug.insertDrug')) {
      submitInsertForm('药品', ruleFormRef.value)
    } else if (props.dialogTitle === t('main.drug.updateDrug')) {
      submitUpdateForm('药品', props.dialogTableValue.id, ruleFormRef.value)
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
