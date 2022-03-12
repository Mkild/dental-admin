import { request } from '@/utils'
import type { Params, ChargeDetail } from '@/interface'
import qs from 'qs'

// 获取某日收费总金额
export const getChargeSum = (date: string): Promise<any> => request.get(`/charge/sum?date=${date}`)

// 获取收费记录
export const getCharge = (id: number): Promise<any> => request.get(`/charge/charge?id=${id}`)

// 获取所有收费记录
export const getAllCharge = (params?: Params): Promise<any> => request.get('/charge/charges', { params })

// 新增收费记录
export const insertCharge = (
  project: string,
  name: string,
  amount: number,
  signature: string,
  date: string,
  charge_details: ChargeDetail[]
): Promise<any> => {
  return request.post('/charge/insert', qs.stringify({ project, name, amount, signature, date, charge_details }))
}

// 修改收费记录
export const updateCharge = (
  id: number,
  project: string,
  name: string,
  amount: number,
  signature: string,
  date: string,
  charge_details: ChargeDetail[]
): Promise<any> => {
  return request.post(
    `/charge/update?id=${id}`,
    qs.stringify({ project, name, amount, signature, date, charge_details })
  )
}

// 删除收费记录
export const deleteCharge = (id: number): Promise<any> => request.post(`/charge/delete?id=${id}`)
