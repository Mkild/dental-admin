import axios from 'axios'
import { useMainStore, useUserStore } from '@/store'

const BASE_URL = 'http://localhost:3000'
// 不带全局loading的请求实例
export const requestWithoutLoading = createBaseInstance()

// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance()
mixinLoading(request.interceptors)

// 通用的axios实例
function createBaseInstance() {
  const instance = axios.create({
    baseURL: BASE_URL,
  })

  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  // 拦截请求
  instance.interceptors.request.use(handleRequest, throwError)
  // 拦截响应
  instance.interceptors.response.use(handleResponse, handleError)
  return instance
}

function handleRequest(request) {
  const userStore = useUserStore()
  const token = userStore.token
  if (token) {
    // 设置token
    request.headers.common['Authorization'] = 'Bearer ' + token
  }
  return request
}

function handleResponse(response) {
  return response.data
}

function throwError(e) {
  throw e
}

function handleError(e) {
  ElNotification({
    title: 'Error',
    message: e.message,
    type: 'error',
  })
  // 捕获错误状态码
  if (e.response) {
    const userStore = useUserStore()
    switch (e.response.status) {
      case 401:
        userStore.logout()
        window.location.replace('http://localhost:3001/#/login')
        break
      case 403:
        window.location.replace('http://localhost:3001')
        break
      case 404:
        window.location.replace('http://localhost:3001/#/404')
        break
      default:
        break
    }
    if (e.response.data.msg) {
      ElMessage.error(e.response.data.msg)
    }
  }
  throw e
}

let loading
let loadingCount = 0
function mixinLoading(interceptors) {
  interceptors.request.use(loadingRequestInterceptor)
  interceptors.response.use(loadingResponseInterceptor, loadingResponseErrorInterceptor)

  function loadingRequestInterceptor(config) {
    if (!loading) {
      loading = ElLoading.service({
        target: 'body',
        background: 'transparent',
        text: 'Loading',
      })
      const mainStore = useMainStore()
      mainStore.setAxiosLoading(true)
    }
    loadingCount++

    return config
  }

  function handleResponseLoading() {
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
      const mainStore = useMainStore()
      mainStore.setAxiosLoading(false)
    }
  }

  function loadingResponseInterceptor(response) {
    handleResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handleResponseLoading()
    throw e
  }
}
