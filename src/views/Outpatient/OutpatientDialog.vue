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
      <el-form-item :label="t('main.outpatient.date')" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          :placeholder="t('main.outpatient.datePlaceholder')"
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in ruleForm.outpatient_details"
        :key="item.key"
        :label="t('main.outpatient.record') + (index + 1)"
        prop="charge_details"
      >
        <div class="item-wrap">
          <span class="line">
            <label>{{ t('main.outpatient.doctor') }}</label>
            <el-input v-model="item.doctor"></el-input>
          </span>
          <span class="line">
            <label>{{ t('main.outpatient.outpatient') }}</label>
            <el-input-number v-model.number="item.total" :min="0" type="number" />
          </span>
        </div>
        <el-button
          class="delete-btn"
          size="small"
          :icon="Delete"
          type="danger"
          @click="removeDoctorOutpatient(index)"
          plain
        ></el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="insert-btn" size="small" type="success" @click="addDoctorOutpatient" plain>
          <Icon type="addcell" :size="26" />
        </el-button>
      </el-form-item>
      <el-form-item :label="t('main.outpatient.total')" prop="total">
        {{ getTotal }}
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
  import { Outpatient, OutpatientDetail } from '@/interface'
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
      type: Object as () => Outpatient,
      default: () => {},
      require: true,
    },
  })

  interface RuleForm {
    date: string
    total: number
    editor: string
    outpatient_details: OutpatientDetail[]
  }

  const ruleForm: RuleForm = reactive({
    date: '',
    total: 0,
    editor: userStore.username,
    outpatient_details: [],
  })

  // 计算总数
  const getTotal = computed(() => {
    const sum = ruleForm.outpatient_details.reduce((sum, el) => sum + Number(el.total || 0), 0)
    ruleForm.total = sum
    return sum
  })

  // 清空表单
  const clearForm = () => {
    resetForm(ruleFormRef.value)
    ruleForm.date = ''
    ruleForm.total = 0
    ruleForm.outpatient_details = []
  }

  watch(
    () => props.dialogTableValue,
    () => {
      if (props.dialogTitle === t('main.outpatient.updateOutpatient')) {
        ruleForm.date = props.dialogTableValue.date
        ruleForm.total = Number(props.dialogTableValue.total)
        ruleForm.outpatient_details = props.dialogTableValue.outpatient_details
      } else {
        ruleForm.date = ''
        ruleForm.total = 0
        ruleForm.outpatient_details = []
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

  // 新增医生门诊量记录
  const addDoctorOutpatient = () => {
    ruleForm.outpatient_details.push({
      key: Date.now(),
      doctor: '',
      total: 0,
    })
  }
  // 删除医生门诊量记录
  const removeDoctorOutpatient = (index: number) => {
    ruleForm.outpatient_details.splice(index, 1)
  }

  // 表单验证
  const ruleFormRef = ref<InstanceType<typeof ElForm>>()
  const checkDate = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('main.outpatient.checkDate')))
    } else {
      callback()
    }
  }
  const checkTotal = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback()
      return
    } else if (!isNum(value)) {
      return callback(new Error(t('main.outpatient.totalIsNum')))
    } else if (value < 0) {
      return callback(new Error(t('main.outpatient.totalSizeSmallerZero')))
    } else if (value > 100000000) {
      return callback(new Error(t('main.outpatient.totalSizeLimit')))
    } else {
      callback()
    }
  }
  const rules = reactive({
    date: [{ validator: checkDate, required: true, trigger: 'blur' }],
    total: [{ validator: checkTotal, trigger: 'change' }],
  })

  // 表单提交
  const submitForm = () => {
    if (props.dialogTitle === t('main.outpatient.insertOutpatient')) {
      submitInsertForm('门诊量记录', ruleFormRef.value)
    } else if (props.dialogTitle === t('main.outpatient.updateOutpatient')) {
      submitUpdateForm('门诊量记录', props.dialogTableValue.id, ruleFormRef.value)
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
