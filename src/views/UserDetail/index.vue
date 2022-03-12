<template>
  <div>
    <Icon type="back" size="20" @click="$router.back" class="icon" />
    <Title class="title">
      {{ t('header.userAvatar.userDetail') }}
    </Title>
    <div class="background">
      <div class="user-detail">
        <el-avatar :size="120" :src="userStore.avatar"></el-avatar>
        <template v-if="userDetailRef">
          <el-form
            class="user-detail-form"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="80px"
            status-icon
          >
            <el-form-item label="ID">
              <span class="txt">{{ userDetailRef.id }}</span>
            </el-form-item>
            <el-form-item :label="t('main.userDetail.username')" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item :label="t('main.userDetail.role')">
              <span class="txt">{{ userDetailRef.role }}</span>
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
          <el-button type="primary" @click="submitUpdateUserDetailForm(ruleFormRef)">
            {{ t('main.userDetail.save') }}
          </el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'UserDetail',
  })
</script>

<script lang="ts" setup>
  import { useUserStore } from '@/store'
  import { getUserDetail } from '@/api'
  import type { UserDetail, UserDetailRef } from '@/interface'
  import type { ElForm } from 'element-plus'
  import { Ref } from 'vue'
  import { getUser } from '@/api'
  import { isTel, isEmail } from '@/utils'
  import { submitUpdateUserDetailForm } from '@/utils/form'
  import { setTitle } from '@/hooks'

  const userStore = useUserStore()
  const { t } = useI18n()

  // 动态修改标签标题
  setTitle(userStore.username)

  interface RuleForm {
    username: string
    name: string | null
    gender: string | null
    phone: number | null
    email: string | null
  }

  const ruleForm: RuleForm = reactive({
    username: '',
    name: null,
    gender: null,
    phone: null,
    email: null,
  })

  // 同步性别
  const genderRef = ref('')
  watch(
    () => genderRef.value,
    (newValue) => {
      ruleForm.gender = newValue
    }
  )

  const userDetailRef: Ref<UserDetailRef | undefined> = ref()
  const getUserData = async () => {
    const { userDetail }: { userDetail: UserDetail } = await getUserDetail(userStore.username)
    const { id, username, state, user_role, user_detail, createdAt, updatedAt } = userDetail
    const detail: UserDetailRef = {
      id,
      username,
      name: user_detail.name,
      gender: user_detail.gender,
      phone: user_detail.phone,
      email: user_detail.email,
      state,
      role_id: user_role.role_id,
      role: user_role.role.rolename,
      createdAt,
      updatedAt,
    }
    userDetailRef.value = detail
    ruleForm.username = detail.username
    ruleForm.name = detail.name
    if (detail.gender) genderRef.value = detail.gender
    ruleForm.gender = detail.gender
    ruleForm.phone = detail.phone
    ruleForm.email = detail.email
  }
  await getUserData()

  // 表单验证
  const ruleFormRef = ref<InstanceType<typeof ElForm>>()
  const checkUsername = (rule: any, value: any, callback: any) => {
    if (!value) {
      return callback(new Error(t('form.checkUsername')))
    }
    if (value !== userDetailRef.value?.username) {
      setTimeout(async () => {
        const { user }: { user: Object } = await getUser(value)
        if (user) {
          callback(new Error(t('form.usernameHasUsed')))
        } else {
          callback()
        }
      }, 1000)
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
      { validator: checkUsername, trigger: 'blur' },
      {
        min: 1,
        max: 10,
        message: t('form.usernameLengthLimit'),
        trigger: 'blur',
      },
    ],
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
  .user-detail {
    display: flex;
    align-items: center;
    flex-direction: column;
    @include box-shadow;
    border-radius: 10px;
    padding: 20px;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.3);

    .user-detail-form {
      margin-top: 18px;
    }
    .txt {
      font-size: 15px;
      color: $white;
    }
  }
</style>
