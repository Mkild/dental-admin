<template>
  <div>
    <Icon type="back" size="20" @click="$router.back" class="icon" />
    <Title class="title">
      {{ t('header.userAvatar.changePwd') }}
    </Title>
    <div class="background">
      <div class="change-pwd">
        <el-form
          class="change-pwd-form"
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="140px"
          status-icon
        >
          <el-form-item :label="t('main.changePwd.nowPwd')" prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="password"
              autocomplete="off"
              :placeholder="t('main.changePwd.nowPwdPlaceholder')"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item :label="t('main.changePwd.pwd')" prop="password">
            <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
              :placeholder="t('main.changePwd.pwdPlaceholder')"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item :label="t('main.changePwd.checkPwd')" prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
              :placeholder="t('main.changePwd.checkPwdPlaceholder')"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitUpdateUserPasswordForm(ruleFormRef)">
          {{ t('main.changePwd.submitUpdate') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'ChangePwd',
  })
</script>

<script lang="ts" setup>
  import type { ElForm } from 'element-plus'
  import { submitUpdateUserPasswordForm } from '@/utils/form'

  const { t } = useI18n()

  interface RuleForm {
    pass: string
    password: string
    checkPass: string
  }

  const ruleForm: RuleForm = reactive({
    pass: '',
    password: '',
    checkPass: '',
  })

  // 表单验证
  const ruleFormRef = ref<InstanceType<typeof ElForm>>()
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error(t('main.changePwd.validatePass')))
    } else {
      if (ruleForm.checkPass !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass', () => null)
      }
      setTimeout(async () => {
        const pattern = new RegExp('[\u4E00-\u9FA5]+')

        if (pattern.test(value)) {
          callback(new Error(t('main.changePwd.banChinese')))
        } else {
          callback()
        }
      }, 1000)
    }
  }
  const validateCheckPass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error(t('main.changePwd.validateCheckPass')))
    } else if (value !== ruleForm.password) {
      callback(new Error(t('main.changePwd.donotMatch')))
    } else {
      callback()
    }
  }
  const rules = reactive({
    pass: [
      { validator: validatePass, trigger: 'blur' },
      {
        min: 6,
        max: 10,
        message: t('main.changePwd.pwdLengthLimit'),
        trigger: 'blur',
      },
    ],
    password: [
      { validator: validatePass, trigger: 'blur' },
      {
        min: 6,
        max: 10,
        message: t('main.changePwd.pwdLengthLimit'),
        trigger: 'blur',
      },
    ],
    checkPass: [{ validator: validateCheckPass, trigger: 'blur' }],
  })
</script>

<style lang="scss" scoped>
  .icon {
    &:hover {
      color: $theme-hover;
    }

    &:after {
      content: '';
      font-size: 1px;
      padding: 8px 5px 2px;
      margin-left: 6px;
      border-left: 2px solid #b1b1b1;
    }
  }

  .title {
    display: inline-block;
  }

  .background {
    background: url('@/assets/image/login-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 10px;
    @include box-shadow;
  }
  .change-pwd {
    display: flex;
    align-items: center;
    flex-direction: column;
    @include box-shadow;
    border-radius: 10px;
    padding: 20px;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.3);

    .change-pwd-form {
      margin-top: 20px;
      width: 400px;
    }
  }
</style>
