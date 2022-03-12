import { request } from '@/utils'
import type { Params } from '@/interface'
import qs from 'qs'

// 获取收入记录
export const getIncome = (id: number): Promise<any> => request.get(`/income/income?id=${id}`)

// 获取所有收入记录
export const getAllIncome = (params?: Params): Promise<any> => request.get('/income/incomes', { params })

// 新增收入记录
export const insertIncome = (date: string, total: string): Promise<any> => {
  return request.post('/income/insert', qs.stringify({ date, total }))
}

// 修改收入记录
export const updateIncome = (id: number, date: string, total: string): Promise<any> => {
  return request.post(`/income/update?id=${id}`, qs.stringify({ date, total }))
}

// 删除收入记录
export const deleteIncome = (id: number): Promise<any> => request.post(`/income/delete?id=${id}`)

// 根据日期获取收入记录
export const getIncomeByDate = (date: string): Promise<any> => request.get(`/income/dateincome?date=${date}`)
