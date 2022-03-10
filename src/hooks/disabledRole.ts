import { useUserStore } from '@/store'

const userStore = useUserStore()

export const disabledLowerRole = (role: string) => {
  switch (role) {
    case 'doctor':
      return disabledRoleLowerDoctor.value
    case 'director':
      return disabledRoleLowerDirector.value
    case 'admin':
      return disabledRoleLowerAdmin.value
    case 'visitor':
      return false
    default:
      return true
  }
}

// 权限低于admin禁用
const disabledRoleLowerAdmin = computed(() => {
  if (userStore.role === 'admin') {
    return false
  } else {
    return true
  }
})

// 权限低于director禁用
const disabledRoleLowerDirector = computed(() => {
  if (userStore.role === 'admin' || userStore.role === 'director') {
    return false
  } else {
    return true
  }
})

// 权限低于doctor禁用
const disabledRoleLowerDoctor = computed(() => {
  if (userStore.role === 'admin' || userStore.role === 'director' || userStore.role === 'doctor') {
    return false
  } else {
    return true
  }
})
