import { request } from '@/utils'
import type { Params } from '@/interface'
import qs from 'qs'

// 获取病历
export const getRecord = (id: number): Promise<any> => request.get(`/record/record?id=${id}`)

// 获取所有病历
export const getAllRecord = (params?: Params): Promise<any> => request.get('/record/records', { params })

// 新增病历
export const insertRecord = (name: string, illness: string, text: string, dp: string, doctor: string): Promise<any> => {
  return request.post('/record/insert', qs.stringify({ name, illness, text, dp, doctor }))
}

// 修改病历
export const updateRecord = (
  id: number,
  name: string,
  illness: string,
  text: string,
  dp: string,
  doctor: string
): Promise<any> => {
  return request.post(`/record/update?id=${id}`, qs.stringify({ name, illness, text, dp, doctor }))
}

// 删除病历
export const deleteRecord = (id: number): Promise<any> => request.post(`/record/delete?id=${id}`)
