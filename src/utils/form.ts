import router from '@/router'
import { useMainStore, useUserStore } from '@/store'
import storage from 'good-storage'
import type { ElForm } from 'element-plus'
import message from '@/utils/message'
import * as api from '@/api'
import type { Result } from '@/interface/result'
import i18n from '@/i18n'

const mainStore = useMainStore()
const userStore = useUserStore()
const t = i18n.global.t

// 重置
export const resetForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 注册
export const submitRegisterForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    const successMsg = t('register.message.success')
    const failMsg = t('register.message.failed')
    if (valid) {
      try {
        const formData: Record<string, any> = formEl!.model!
        await api.reigster(formData.username, formData.password)
        message(successMsg)
        resetForm(formEl)
        router.replace('/login')
      } catch (err) {
        console.log('error submit!', err)
        message.error(failMsg)
        return false
      }
    } else {
      message.error(failMsg)
      return false
    }
  })
}

// 登录
export const submitLoginForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    const successMsg = t('login.message.success')
    const failMsg = t('login.message.failed')
    if (valid) {
      try {
        const formData: Record<string, any> = formEl!.model!
        const data: any = await api.login(formData.username, formData.password)
        if (data.token) {
          userStore.changeToken(data.token)
          storage.set('token', data.token)
          message(successMsg)
          resetForm(formEl)
          router.push('/')
        } else {
          message.error(data.msg)
          return false
        }
      } catch (err) {
        console.log('error submit!', err)
        message.error(failMsg)
        return false
      }
    } else {
      message.error(failMsg)
      return false
    }
  })
}

// 提交新增(type)表单
export const submitInsertForm = (type: string, formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!type || !formEl) return

  formEl.validate(async (valid) => {
    const successMsg = t('form.message.insertSuccess')
    const failMsg = t('form.message.insertFailed')
    if (valid) {
      try {
        const formData: Record<string, any> = formEl!.model!
        let result: Result
        switch (type) {
          case '公告':
            result = await api.insertNotice(formData.title, formData.text)
            break
          case '科室':
            result = await api.insertDepartment(formData.name, formData.director)
            break
          case '药品':
            result = await api.insertDrug(
              formData.name,
              formData.price,
              formData.quantity,
              formData.factory,
              formData.batch,
              formData.pd,
              formData.exp
            )
            break
          case '病历':
            result = await api.insertRecord(
              formData.name,
              formData.illness,
              formData.text,
              formData.dp,
              formData.doctor
            )
            break
          case '收费记录':
            formData.charge_details.forEach((el: any) => {
              el.amount = el.price * el.quantity
            })
            result = await api.insertCharge(
              formData.project,
              formData.name,
              formData.amount,
              formData.signature,
              formData.date,
              formData.charge_details
            )
            break
          case '收入记录':
            result = await api.insertIncome(formData.date, formData.total)
            break
          case '门诊量记录':
            result = await api.insertOutpatient(formData.date, formData.total, formData.outpatient_details)
            break
          case '反馈记录':
            result = await api.insertFeedback(formData.title, formData.text)
            break
          default:
            ElMessage.error(t('form.message.actionFailed'))
            return false
        }
        if (result.type === 'success') {
          mainStore.changeNeedRefresh(true)
          ElMessage.success(successMsg)
          resetForm(formEl)
        } else {
          ElMessage.error(failMsg)
          return false
        }
      } catch (err) {
        console.log('error submit!', err)
        ElMessage.error(failMsg)
        return false
      }
    } else {
      ElMessage.error(failMsg)
      return false
    }
  })
}

// 提交修改(type)表单
export const submitUpdateForm = (type: string, id: number, formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!type || !id || !formEl) return

  formEl.validate(async (valid) => {
    const successMsg = t('form.message.updateSuccess')
    const failMsg = t('form.message.updateFailed')
    if (valid) {
      try {
        const formData: Record<string, any> = formEl!.model!
        let result: Result
        switch (type) {
          case '公告':
            result = await api.updateNotice(id, formData.title, formData.text)
            break
          case '科室':
            result = await api.updateDepartment(id, formData.name, formData.director)
            break
          case '药品':
            result = await api.updateDrug(
              id,
              formData.name,
              formData.price,
              formData.quantity,
              formData.factory,
              formData.batch,
              formData.pd,
              formData.exp
            )
            break
          case '病历':
            result = await api.updateRecord(
              id,
              formData.name,
              formData.illness,
              formData.text,
              formData.dp,
              formData.doctor
            )
            break
          case '收费记录':
            formData.charge_details.forEach((el: any) => {
              delete el.key
              el.charge_id = id
              el.amount = el.price * el.quantity
            })
            result = await api.updateCharge(
              id,
              formData.project,
              formData.name,
              formData.amount,
              formData.signature,
              formData.date,
              formData.charge_details
            )
            break
          case '收入记录':
            result = await api.updateIncome(id, formData.date, formData.total)
            break
          case '门诊量记录':
            formData.outpatient_details.forEach((el: any) => {
              delete el.key
              el.outpatient_id = id
            })
            result = await api.updateOutpatient(id, formData.date, formData.total, formData.outpatient_details)
            break
          default:
            ElMessage.error('参数不匹配，操作失败')
            return false
        }
        if (result.type === 'success') {
          mainStore.changeNeedRefresh(true)
          ElMessage.success(successMsg)
          resetForm(formEl)
        } else {
          ElMessage.error(failMsg)
          return false
        }
      } catch (err) {
        console.log('error submit!', err)
        ElMessage.error(failMsg)
        return false
      }
    } else {
      ElMessage.error(failMsg)
      return false
    }
  })
}

// 提交删除(type)表单
export const submitDeleteForm = (type: string, id: number) => {
  if (!type || !id) return
  const successMsg = t('form.message.deleteSuccess')
  const failMsg = t('form.message.deleteFailed')
  const message = t('form.message.deleteConfirmText')
  ElMessageBox.confirm(message, 'Warning', {
    confirmButtonText: t('form.message.confirmButtonText'),
    cancelButtonText: t('form.message.cancelButtonText'),
    type: 'warning',
  })
    .then(async () => {
      let result: Result
      try {
        switch (type) {
          case '公告':
            result = await api.deleteNotice(id)
            break
          case '科室':
            result = await api.deleteDepartment(id)
            break
          case '药品':
            result = await api.deleteDrug(id)
            break
          case '病历':
            result = await api.deleteRecord(id)
            break
          case '收费记录':
            result = await api.deleteCharge(id)
            break
          case '收入记录':
            result = await api.deleteIncome(id)
            break
          case '门诊量记录':
            result = await api.deleteOutpatient(id)
            break
          case '用户':
            result = await api.deleteUser(id)
            break
          case '反馈记录':
            result = await api.deleteFeedback(id)
            break
          default:
            ElMessage.error('参数不匹配，操作失败')
            return
        }
        if (result.type === 'success') {
          mainStore.changeNeedRefresh(true)
          ElMessage.success(successMsg)
        } else {
          ElMessage.error(failMsg)
        }
      } catch (err) {
        console.log('error submit!', err)
        ElMessage.error(failMsg)
        return false
      }
    })
    .catch((err: unknown) => {
      console.log(err)
    })
}

// 提交新增用户表单
export const submitInsertUserForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return

  formEl.validate(async (valid) => {
    const successMsg = t('form.message.insertSuccess')
    const failMsg = t('form.message.insertFailed')
    if (valid) {
      try {
        const formData: Record<string, any> = formEl!.model!
        let result: Result
        if (userStore.role === 'admin') {
          result = await api.insertUser(
            formData.username,
            formData.password,
            formData.role_id,
            formData.name,
            formData.gender,
            formData.phone,
            formData.email
          )
        } else {
          result = await api.addUser(
            formData.username,
            formData.password,
            formData.name,
            formData.gender,
            formData.phone,
            formData.email
          )
        }
        if (result.type === 'success') {
          mainStore.changeNeedRefresh(true)
          ElMessage.success(successMsg)
          resetForm(formEl)
        } else {
          ElMessage.error(failMsg)
          return false
        }
      } catch (err) {
        console.log('error submit!', err)
        ElMessage.error(failMsg)
        return false
      }
    } else {
      ElMessage.error(failMsg)
      return false
    }
  })
}

// 提交修改用户表单
export const submitUpdateUserForm = (username: string, formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!username || !formEl) return

  formEl.validate(async (valid) => {
    const successMsg = t('form.message.updateSuccess')
    const failMsg = t('form.message.updateFailed')
    if (valid) {
      try {
        const formData: Record<string, any> = formEl!.model!
        let updateUserResult: Result
        if (userStore.role === 'admin' && formData.username && formData.password === '' && !isNaN(formData.role_id)) {
          updateUserResult = await api.updateUserRole(username, formData.role_id)
        } else if (
          userStore.role === 'admin' &&
          formData.username &&
          formData.password !== '' &&
          !isNaN(formData.role_id)
        ) {
          updateUserResult = await api.updateUser(username, formData.username, formData.password, formData.role_id)
          if (updateUserResult.type === 'error') {
            ElMessage.error(failMsg)
            return false
          }
        } else {
          updateUserResult = {
            msg: '修改用户失败',
            status: 200,
            type: 'error',
          }
        }
        let updateUserDetailResult: Result
        updateUserDetailResult = await api.updateUserDetail(
          username,
          formData.name,
          formData.gender,
          formData.phone,
          formData.email
        )
        if (updateUserResult.type === 'success' || updateUserDetailResult.type === 'success') {
          mainStore.changeNeedRefresh(true)
          ElMessage.success(successMsg)
          resetForm(formEl)
        } else {
          ElMessage.error(failMsg)
          return false
        }
      } catch (err) {
        console.log('error submit!', err)
        ElMessage.error(failMsg)
        return false
      }
    } else {
      ElMessage.error(failMsg)
      return false
    }
  })
}

// 提交修改用户详情表单
export const submitUpdateUserDetailForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return

  formEl.validate(async (valid) => {
    const successMsg = t('form.message.updateUserDetailSuccess')
    const failMsg = t('form.message.updateUserDetailFailed')
    if (valid) {
      try {
        const username = userStore.username
        const formData: Record<string, any> = formEl!.model!
        if (username && username !== formData.username) {
          const updateUserUsernameResult: Result = await api.updateUserUsername(username, formData.username)
          if (updateUserUsernameResult.type === 'error') {
            ElMessage.error(failMsg)
            return false
          }
        }
        const updateUserDetailResult: Result = await api.updateUserDetail(
          username,
          formData.name,
          formData.gender,
          formData.phone,
          formData.email
        )
        if (updateUserDetailResult.type === 'success') {
          ElMessage.success(successMsg)
        } else {
          ElMessage.error(failMsg)
          return false
        }
      } catch (err) {
        console.log('error submit!', err)
        ElMessage.error(failMsg)
        return false
      }
    } else {
      ElMessage.error(failMsg)
      return false
    }
  })
}

// 提交修改用户密码表单
export const submitUpdateUserPasswordForm = (formEl: InstanceType<typeof ElForm> | undefined) => {
  if (!formEl) return

  formEl.validate(async (valid) => {
    const successMsg = t('form.message.changePwdSuccess')
    const failMsg = t('form.message.changePwdFailed')
    if (valid) {
      try {
        const id = userStore.id
        const formData: Record<string, any> = formEl!.model!
        const result: Result = await api.updateUserPassword(id, formData.pass, formData.password)
        if (result.type === 'success') {
          ElMessage.success(successMsg)
          userStore.logout()
          router.replace('/login')
        } else if (result.type === 'error') {
          ElMessage.error(result.msg)
          return false
        } else {
          ElMessage.error(failMsg)
          return false
        }
      } catch (err) {
        console.log('error submit!', err)
        ElMessage.error(failMsg)
        return false
      }
    } else {
      ElMessage.error(failMsg)
      return false
    }
  })
}
