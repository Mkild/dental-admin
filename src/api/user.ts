import { request, requestWithoutLoading } from '@/utils'
import { Params } from '@/interface'
import qs from 'qs'

// 注册
export const reigster = (username: any, password: any): Promise<any> => {
  return request.post('/register', qs.stringify({ username, password }))
}

// 登录(jwt)
export const login = (username: any, password: any): Promise<any> => {
  return request.post('/login', qs.stringify({ username, password }))
}

// 根据用户名获取用户
export const getUser = (username: string): Promise<any> => requestWithoutLoading.get(`/user?username=${username}`)

// 根据id获取用户
export const getUserById = (id: number): Promise<any> => requestWithoutLoading.get(`/user/iduser?id=${id}`)

// 根据jwt获取用户
export const getUserByJwt = (): Promise<any> => request.post('/user/jwtuser')

// 新增用户(director)
export const addUser = (
  username: string,
  password: string,
  name: string,
  gender: string,
  phone: number,
  email: string
): Promise<any> => {
  return request.post('/user/add', qs.stringify({ username, password, name, gender, phone, email }))
}

// 新增用户(admin)
export const insertUser = (
  username: string,
  password: string,
  role_id: number,
  name: string,
  gender: string,
  phone: number,
  email: string
): Promise<any> => {
  return request.post('/user/insert', qs.stringify({ username, password, role_id, name, gender, phone, email }))
}

// 修改用户
export const updateUser = (
  usernamequery: string,
  username: string,
  password: string,
  role_id: number
): Promise<any> => {
  return request.post(`/user/update?username=${usernamequery}`, qs.stringify({ username, password, role_id }))
}

// 变更用户状态
export const changeUserState = (id: number, state: boolean): Promise<any> => {
  return requestWithoutLoading.post(`/user/state?id=${id}`, qs.stringify({ state }))
}

// 修改用户权限
export const updateUserRole = (username: string, role_id: number): Promise<any> => {
  return request.post(`/user/role/update?username=${username}`, qs.stringify({ role_id }))
}

// 删除用户
export const deleteUser = (id: number): Promise<any> => request.post(`/user/delete?id=${id}`)

// 获取用户详情
export const getUserDetail = (username: string): Promise<any> => request.get(`/user/detail?username=${username}`)

// 获取所有用户详情
export const getAllUserDetail = (params?: Params): Promise<any> => request.get('/user/details', { params })

// 修改用户详情
export const updateUserDetail = (
  username: string,
  name: string | null,
  gender: string | null,
  phone: number | null,
  email: string | null
): Promise<any> => {
  return request.post(
    `/user/detail/update?username=${username}`,
    qs.stringify({ username, name, gender, phone, email })
  )
}

// 修改用户名
export const updateUserUsername = (usernamequery: string, username: string): Promise<any> => {
  return request.post(`/user/username/update?username=${usernamequery}`, qs.stringify({ username }))
}

// 修改用户密码
export const updateUserPassword = (id: number, pass: string, password: string): Promise<any> => {
  return request.post(`/user/password/update?id=${id}`, qs.stringify({ pass, password }))
}

// 获取所有权限信息
export const getAllRole = (): Promise<any> => request.get('/user/roles')
