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
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" status-icon>
      <el-form-item :label="t('main.charge.project')" prop="project">
        <el-input v-model="ruleForm.project"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.charge.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in ruleForm.charge_details"
        :key="item.key"
        :label="t('main.charge.charge_detail.item') + (index + 1)"
        prop="charge_details"
      >
        <div class="item-wrap">
          <span class="line">
            <label>{{ t('main.charge.charge_detail.item') }}</label>
            <el-input v-model="item.item"></el-input>
          </span>
          <span class="line">
            <label>{{ t('main.charge.charge_detail.price') }}</label>
            <el-input-number v-model.number="item.price" :precision="2" :step="0.1" :min="0" type="number" />
          </span>
          <span class="line">
            <label>{{ t('main.charge.charge_detail.quantity') }}</label>
            <el-input-number v-model.number="item.quantity" :min="0" type="number" />
          </span>
        </div>
        <el-button
          class="delete-btn"
          size="small"
          :icon="Delete"
          type="danger"
          @click="removeItem(index)"
          plain
        ></el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="insert-btn" size="small" type="success" @click="addItem" plain>
          <Icon type="addcell" :size="26" />
        </el-button>
      </el-form-item>
      <el-form-item :label="t('main.charge.amount')" prop="amount">
        {{ getTotal }}
      </el-form-item>
      <el-form-item :label="t('main.charge.signature')" prop="signature">
        <el-autocomplete v-model="ruleForm.signature" :fetch-suggestions="querySearch" @select="handleSelect">
          <template #default="item">
            <div class="value">{{ item.item }}</div>
          </template>
        </el-autocomplete>
      </el-form-item>
      <el-form-item :label="t('main.charge.date')" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          :placeholder="t('main.charge.datePlaceholder')"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
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
  import { Delete } from '@element-plus/icons-vue'
  import { ElMessageBox } from 'element-plus'
  import type { ElForm } from 'element-plus'
  import { resetForm, submitInsertForm, submitUpdateForm } from '@/utils/form'
  import type { Charge, ChargeDetail } from '@/interface'
  import { useMainStore, useUserStore } from '@/store'
  import { isNum } from '@/utils'

  const mainStore = useMainStore()
  const userStore = useUserStore()
  const { t } = useI18n()

  const props = defineProps({
    dialogTitle: {
      type: String,
      require: true,
    },
    dialogTableValue: {
      type: Object as () => Charge,
      default: () => {},
      require: true,
    },
  })

  interface RuleForm {
    project: string
    name: string
    amount: number
    signature: string
    date: string
    charge_details: ChargeDetail[]
  }

  const ruleForm: RuleForm = reactive({
    project: '',
    name: '',
    amount: 0.0,
    signature: '',
    date: '',
    charge_details: [],
  })

  // 计算总额
  const getTotal = computed(() => {
    const sum = ruleForm.charge_details.reduce((sum, el) => sum + Number(el.price * el.quantity || 0), 0)
    ruleForm.amount = sum
    return sum
  })

  // 清空表单
  const clearForm = () => {
    resetForm(ruleFormRef.value)
    ruleForm.project = ''
    ruleForm.name = ''
    ruleForm.amount = 0.0
    ruleForm.signature = ''
    ruleForm.date = ''
    ruleForm.charge_details = []
  }

  watch(
    () => props.dialogTableValue,
    () => {
      if (props.dialogTitle === t('main.charge.updateCharge')) {
        ruleForm.project = props.dialogTableValue.project
        ruleForm.name = props.dialogTableValue.name
        ruleForm.amount = Number(props.dialogTableValue.amount)
        ruleForm.signature = props.dialogTableValue.signature
        ruleForm.date = props.dialogTableValue.date
        ruleForm.charge_details = props.dialogTableValue.charge_details
      } else {
        ruleForm.project = ''
        ruleForm.name = ''
        ruleForm.amount = 0.0
        ruleForm.signature = ''
        ruleForm.date = ''
        ruleForm.charge_details = []
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

  // 自动补全收款者姓名
  const stRef = ref([userStore.username])
  const querySearch = (queryString: string, cb: (arg: Array<any>) => void) => {
    const results = stRef.value[0].toLowerCase().indexOf(queryString.toLowerCase()) === 0 ? stRef.value : []
    cb(results)
  }
  const handleSelect = (item: string) => {
    ruleForm.signature = item
  }

  // 新增条目
  const addItem = () => {
    ruleForm.charge_details.push({
      key: Date.now(),
      item: '',
      price: 0.0,
      quantity: 0,
      amount: 0.0,
    })
  }
  // 删除条目
  const removeItem = (index: number) => {
    ruleForm.charge_details.splice(index, 1)
  }

  // 表单验证
  const ruleFormRef = ref<InstanceType<typeof ElForm>>()
  const checkProject = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.charge.checkProject')))
    } else {
      callback()
    }
  }
  const checkName = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.charge.checkName')))
    } else {
      callback()
    }
  }
  const checkAmount = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback()
      return
    } else if (!isNum(value)) {
      return callback(new Error(t('main.charge.amountIsNum')))
    } else if (value < 0) {
      return callback(new Error(t('main.charge.amountSizeSmallerZero')))
    } else if (value > 100000000) {
      return callback(new Error(t('main.charge.amountSizeLimit')))
    } else {
      callback()
    }
  }
  const checkSignature = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.charge.checkSignature')))
    } else {
      callback()
    }
  }
  const checkDate = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.charge.checkDate')))
    } else {
      callback()
    }
  }
  const rules = reactive({
    project: [
      { validator: checkProject, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 20,
        message: t('main.charge.projectLengthLimit'),
        trigger: 'blur',
      },
    ],
    name: [
      { validator: checkName, required: true, trigger: 'blur' },
      {
        min: 1,
        max: 10,
        message: t('main.charge.nameLengthLimit'),
        trigger: 'blur',
      },
    ],
    amount: [{ validator: checkAmount, trigger: 'change' }],
    signature: [
      { validator: checkSignature, required: true, trigger: 'change' },
      {
        min: 1,
        max: 10,
        message: t('main.charge.signatureLengthLimit'),
        trigger: 'change',
      },
    ],
    date: [{ validator: checkDate, required: true, trigger: 'change' }],
  })

  // 表单提交
  const submitForm = () => {
    if (props.dialogTitle === t('main.charge.insertCharge')) {
      submitInsertForm('收费记录', ruleFormRef.value)
    } else if (props.dialogTitle === t('main.charge.updateCharge')) {
      submitUpdateForm('收费记录', props.dialogTableValue.id, ruleFormRef.value)
    } else {
      ElMessage.error(t('form.submitFailed'))
    }
  }
</script>

<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .delete-btn {
    margin-left: 10px;
  }

  .item-wrap {
    display: flex;
    flex-direction: column;
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 10px;

    .line {
      display: flex;
      align-items: flex-start;
      margin: 2px 0;

      label {
        display: flex;
        justify-content: flex-end;
        min-width: 40px;
        margin-right: 6px;
        white-space: nowrap;
      }
    }
  }
</style>
