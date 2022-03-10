import { request } from '@/utils'
import { Params } from '@/interface'
import qs from 'qs'

// 获取科室
export const getDepartment = (id: number): Promise<any> => request.get(`/department/department?id=${id}`)

// 获取所有科室
export const getAllDepartment = (params?: Params): Promise<any> => request.get('/department/departments', { params })

// 新增科室
export const insertDepartment = (name: string, director: string): Promise<any> => {
  return request.post('/department/insert', qs.stringify({ name, director }))
}

// 修改科室
export const updateDepartment = (id: number, name: string, director: string): Promise<any> => {
  return request.post(`/department/update?id=${id}`, qs.stringify({ name, director }))
}

// 删除科室
export const deleteDepartment = (id: number): Promise<any> => request.post(`/department/delete?id=${id}`)
