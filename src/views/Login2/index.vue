<template>
  <div class="login2">
    <div class="login-form">
      <div class="title">{{ t('login.title') }}</div>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item :label="t('login.username')" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item :label="t('login.pwd')" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item :label="t('login.checkPwd')" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLoginForm(ruleFormRef)">{{ t('form.submit') }}</el-button>
          <el-button type="warning" @click="resetForm(ruleFormRef)">{{ t('form.reset') }}</el-button>
          <span class="register" @click="goRegister">{{ t('login.goRegister') }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { resetForm, submitLoginForm } from '@/utils/form'
  import type { ElForm } from 'element-plus'

  const router = useRouter()
  const { t } = useI18n()

  interface RuleForm {
    username: string
    password: string
    checkPass: string
  }

  const ruleForm: RuleForm = reactive({
    username: '',
    password: '',
    checkPass: '',
  })

  // 表单验证
  const ruleFormRef = ref<InstanceType<typeof ElForm>>()
  const checkUsername = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('form.checkUsername')))
    }
    callback()
  }
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
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
    if (value === '') {
      callback(new Error(t('form.validateCheckPass')))
    } else if (value !== ruleForm.password) {
      callback(new Error(t('form.donotMatch')))
    } else {
      callback()
    }
  }
  const rules = reactive({
    username: [
      { validator: checkUsername, trigger: 'blur' },
      {
        min: 1,
        max: 10,
        message: t('form.usernameLengthLimit'),
        trigger: 'blur',
      },
    ],
    password: [
      { validator: validatePass, trigger: 'blur' },
      {
        min: 6,
        max: 10,
        message: t('form.pwdLengthLimit'),
        trigger: 'blur',
      },
    ],
    checkPass: [{ validator: validateCheckPass, trigger: 'blur' }],
  })

  // 跳转注册
  const goRegister = (): void => {
    router.push('/register')
  }
</script>

<style lang="scss" scoped>
  .login2 {
    width: 100%;
    height: 100%;
    background: url('@/assets/image/login-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-form {
      margin: 0 auto;
      width: 450px;
      border-radius: 18px;
      padding: 10px 20px;
      backdrop-filter: blur(20px);
      background-color: rgba(0, 0, 0, 0.5);
      @include box-shadow;
      text-align: left;

      .title {
        text-align: center;
        margin-bottom: 50px;
        color: $white;
        font-size: 28px;
      }

      .register {
        color: $blue;
        text-decoration: underline;
        cursor: pointer;
        margin-left: auto;
        user-select: none;
      }
    }
  }
</style>
