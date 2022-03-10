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
      <el-form-item v-if="showInput" :label="t('main.user.username')" prop="username" :required="isRequired">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item v-if="showInput" :label="t('main.user.pwd')" prop="password" :required="isRequired">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item v-if="showInput" :label="t('main.user.checkPass')" prop="checkPass" :required="isRequired">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item
        v-if="userStore.role === 'admin'"
        :label="t('main.userDetail.role')"
        prop="role_id"
        :required="isRequired"
      >
        <el-select v-model="ruleForm.role_id" clearable :placeholder="t('main.userDetail.role')">
          <el-option v-for="role in roleData" :key="role.id" :label="role.rolename" :value="role.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('main.userDetail.name')" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.userDetail.gender')" prop="gender">
        <el-radio v-model="genderRef" label="male" size="large">{{ t('main.userDetail.male') }}</el-radio>
        <el-radio v-model="genderRef" label="female" size="large">{{ t('main.userDetail.female') }}</el-radio>
      </el-form-item>
      <el-form-item :label="t('main.userDetail.phone')" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item :label="t('main.userDetail.email')" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
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
  import { resetForm, submitInsertUserForm, submitUpdateUserForm } from '@/utils/form'
  import { useMainStore, useUserStore } from '@/store'
  import { UserDetailRef, Role } from '@/interface'
  import { getUser, getAllRole } from '@/api'
  import { isTel, isEmail } from '@/utils'

  const mainStore = useMainStore()
  const userStore = useUserStore()
  const { t } = useI18n()

  const props = defineProps({
    dialogTitle: {
      type: String,
      require: true,
    },
    dialogTableValue: {
      type: Object as () => UserDetailRef,
      default: () => {},
      require: true,
    },
  })

  interface RuleForm {
    username: string
    password: string
    checkPass: string
    role_id: number
    name: string | null
    gender: string | null
    phone: number | null
    email: string | null
  }

  const ruleForm: RuleForm = reactive({
    username: '',
    password: '',
    checkPass: '',
    role_id: NaN,
    name: null,
    gender: null,
    phone: null,
    email: null,
  })

  // 获取权限数据(用于显示选择框选项)
  let roleData: Array<Role> = new Array()
  const getRoleData = async () => {
    const { roles }: { roles: Array<Role> } = await getAllRole()
    roleData = roles.slice()
  }
  await getRoleData()

  // 输入框是否必填
  const isRequired = ref(false)
  // 控制输入框显隐
  const showInput = computed(() => {
    if (props.dialogTitle === t('main.user.updateUser')) {
      isRequired.value = false
      return userStore.role === 'admin'
    } else if (props.dialogTitle === t('main.user.insertUser')) {
      isRequired.value = true
      return true
    } else {
      isRequired.value = false
      return false
    }
  })

  // 清空表单
  const clearForm = () => {
    resetForm(ruleFormRef.value)
    ruleForm.username = ''
    ruleForm.password = ''
    ruleForm.checkPass = ''
    ruleForm.role_id = NaN
    ruleForm.name = null
    genderRef.value = ''
    ruleForm.gender = null
    ruleForm.phone = null
    ruleForm.email = null
  }

  // 同步性别
  const genderRef = ref('')
  watch(
    () => genderRef.value,
    (newValue) => {
      ruleForm.gender = newValue
    }
  )

  watch(
    () => props.dialogTableValue,
    () => {
      if (props.dialogTitle === t('main.user.updateUser')) {
        ruleForm.username = props.dialogTableValue.username
        ruleForm.password = ''
        ruleForm.checkPass = ''
        ruleForm.role_id = props.dialogTableValue.role_id
        ruleForm.name = props.dialogTableValue.name
        if (props.dialogTableValue.gender) genderRef.value = props.dialogTableValue.gender
        ruleForm.gender = props.dialogTableValue.gender
        ruleForm.phone = props.dialogTableValue.phone
        ruleForm.email = props.dialogTableValue.email
      } else {
        ruleForm.username = ''
        ruleForm.password = ''
        ruleForm.checkPass = ''
        ruleForm.role_id = NaN
        ruleForm.name = null
        genderRef.value = ''
        ruleForm.gender = null
        ruleForm.phone = null
        ruleForm.email = null
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
  const checkUsername = (rule: any, value: any, callback: any) => {
    if (props.dialogTitle === t('main.user.updateUser')) {
      callback()
    } else if (!value) {
      return callback(new Error(t('form.checkUsername')))
    }
    setTimeout(async () => {
      const { user }: { user: Object } = await getUser(value)
      if (user) {
        callback(new Error(t('form.usernameHasUsed')))
      } else {
        callback()
      }
    }, 1000)
  }
  const validatePass = (rule: any, value: any, callback: any) => {
    if (props.dialogTitle === t('main.user.updateUser')) {
      callback()
    } else if (value === '') {
      callback(new Error(t('form.validatePass')))
    } else {
      if (ruleForm.checkPass !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass', () => null)
      }
      setTimeout(async () => {
        const pattern = new RegExp('[\u4E00-\u9FA5]+')

        if (pattern.test(value)) {
          callback(new Error(t('form.banChinese')))
        } else {
          callback()
        }
      }, 1000)
    }
  }
  const validateCheckPass = (rule: any, value: any, callback: any) => {
    if (props.dialogTitle === t('main.user.updateUser')) {
      callback()
    } else if (value === '') {
      callback(new Error(t('form.validateCheckPass')))
    } else if (value !== ruleForm.password) {
      callback(new Error(t('form.donotMatch')))
    } else {
      callback()
    }
  }
  const checkRoleId = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('form.checkRoleId')))
    } else if (isNaN(value)) {
      return callback(new Error(t('form.checkRoleId')))
    } else {
      callback()
    }
  }
  const checkName = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback()
    } else if (value === '') {
      return callback(new Error(t('form.checkName')))
    } else {
      callback()
    }
  }
  const checkGender = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback()
    } else if (value !== 'male' && value !== 'female') {
      return callback(new Error(t('form.checkGender')))
    } else {
      callback()
    }
  }
  const checkPhone = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback()
    } else if (!isTel(value)) {
      return callback(new Error(t('form.checkPhone')))
    } else {
      callback()
    }
  }
  const checkEmail = (rule: any, value: any, callback: any) => {
    if (!value) {
      callback()
    } else if (!isEmail(value)) {
      return callback(new Error(t('form.checkEmail')))
    } else {
      callback()
    }
  }
  const rules = reactive({
    username: [
      { validator: checkUsername, required: isRequired.value, trigger: 'blur' },
      {
        min: 1,
        max: 10,
        message: t('form.usernameLengthLimit'),
        trigger: 'blur',
      },
    ],
    password: [
      { validator: validatePass, required: isRequired.value, trigger: 'blur' },
      {
        min: 6,
        max: 10,
        message: t('form.pwdLengthLimit'),
        trigger: 'blur',
      },
    ],
    checkPass: [{ validator: validateCheckPass, required: isRequired.value, trigger: 'blur' }],
    role_id: [{ validator: checkRoleId, required: isRequired.value, trigger: 'change' }],
    name: [
      { validator: checkName, trigger: 'change' },
      {
        min: 0,
        max: 10,
        message: t('form.nameLengthLimit'),
        trigger: 'change',
      },
    ],
    gender: [{ validator: checkGender, trigger: 'change' }],
    phone: [{ validator: checkPhone, trigger: 'change' }],
    email: [{ validator: checkEmail, trigger: 'change' }],
  })

  // 表单提交
  const submitForm = () => {
    if (props.dialogTitle === t('main.user.insertUser')) {
      submitInsertUserForm(ruleFormRef.value)
    } else if (props.dialogTitle === t('main.user.updateUser')) {
      submitUpdateUserForm(props.dialogTableValue.username, ruleFormRef.value)
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
