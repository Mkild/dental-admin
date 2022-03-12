import { request } from '@/utils'
import type { Params, OutpatientDetail } from '@/interface'
import qs from 'qs'

// 获取门诊量记录
export const getOutpatient = (id: number): Promise<any> => request.get(`/outpatient/outpatient?id=${id}`)

// 获取所有门诊量记录
export const getAllOutpatient = (params?: Params): Promise<any> => request.get('/outpatient/outpatients', { params })

// 新增门诊量记录
export const insertOutpatient = (date: string, total: string, outpatient_details: OutpatientDetail[]): Promise<any> => {
  return request.post('/outpatient/insert', qs.stringify({ date, total, outpatient_details }))
}

// 修改门诊量记录
export const updateOutpatient = (
  id: number,
  date: string,
  total: string,
  outpatient_details: OutpatientDetail[]
): Promise<any> => {
  return request.post(`/outpatient/update?id=${id}`, qs.stringify({ date, total, outpatient_details }))
}

// 删除门诊量记录
export const deleteOutpatient = (id: number): Promise<any> => request.post(`/outpatient/delete?id=${id}`)

// 根据日期获取门诊量记录
export const getOutpatientByDate = (date: string): Promise<any> => {
  return request.get(`/outpatient/dateoutpatient?date=${date}`)
}
