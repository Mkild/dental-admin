import { defineStore } from 'pinia'
import { getUserByJwt } from '@/api'
import type { User, UserRole } from '@/interface'
import storage from 'good-storage'

export const useMainStore = defineStore('main', {
  // 类似于Vue2组件中的data，用于存储全局状态数据，但有两个要求
  // 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
  // 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
  state: (): { lang: string; SET_AXIOS_LOADING: boolean; needRefresh: boolean } => {
    return {
      lang: storage.get('lang', 'zh'), // 当前显示的语言
      SET_AXIOS_LOADING: false, // 是否处于loading状态
      needRefresh: false, // 是否需要刷新数据
    }
  },
  getters: {},
  actions: {
    // 变更语言
    changeLang(lang: string) {
      this.lang = lang
      storage.set('lang', lang)
    },
    // 变更需要刷新的状态
    changeNeedRefresh(newValue: boolean) {
      this.needRefresh = newValue
    },
    // 变更loading状态
    setAxiosLoading(newValue: boolean) {
      this.SET_AXIOS_LOADING = newValue
    },
  },
})

export const useUserStore = defineStore('user', {
  state: (): { id: number; username: string; role: string; avatar: string; token: string } => {
    return {
      id: 0,
      username: '',
      role: '',
      avatar: '',
      token: storage.get('token', ''),
    }
  },
  getters: {},
  actions: {
    // 变更token
    changeToken(token: string) {
      this.token = token
    },
    // 变更id
    changeId(id: number) {
      this.id = id
    },
    // 变更用户信息
    changeUserInfo(id: number, username: string, role: string) {
      this.$patch({
        id: id,
        username: username,
        role: role,
      })
    },
    // 变更用户头像
    changeUserAvatar(picUrl: string) {
      this.avatar = picUrl
    },
    // 根据token获取用户信息(jwt)
    async getUserInfoByJwt() {
      const { user, userrole }: { user: User; userrole: UserRole } = await getUserByJwt()
      this.$patch({
        id: user.id,
        username: user.username,
        role: userrole.role.rolename,
      })
      if (this.role) {
        return true
      } else {
        return false
      }
    },
    // 登出
    logout() {
      this.$patch({
        id: 0,
        username: '',
        role: '',
        token: '',
      })
      storage.remove('token')
    },
  },
})
