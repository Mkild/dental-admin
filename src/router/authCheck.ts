import { useUserStore } from '@/store'
import message from '@/utils/message'
import i18n from '@/i18n'

const t = i18n.global.t

// 拦截权限低于admin的用户访问
export const authCheckAdmin = () => {
  const userStore = useUserStore()
  if (userStore.role !== 'admin') {
    message.error(t('aside.message.noAuth'))
    return false
  }
}

// 拦截权限低于director的用户访问
export const authCheckDirector = () => {
  const userStore = useUserStore()
  if (userStore.role !== 'admin' && userStore.role !== 'director') {
    message.error(t('aside.message.noAuth'))
    return false
  }
}

// 拦截权限低于doctor的用户访问
export const authCheckDoctor = () => {
  const userStore = useUserStore()
  if (userStore.role !== 'admin' && userStore.role !== 'director' && userStore.role !== 'doctor') {
    message.error(t('aside.message.noAuth'))
    return false
  }
}
