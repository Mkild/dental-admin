import { request } from '@/utils'
import type { Params } from '@/interface'
import qs from 'qs'

// 获取药品
export const getDrug = (id: number): Promise<any> => request.get(`/drug/drug?id=${id}`)

// 获取所有药品
export const getAllDrug = (params?: Params): Promise<any> => request.get('/drug/drugs', { params })

// 新增药品
export const insertDrug = (
  name: string,
  price: number,
  quantity: number,
  factory: string,
  batch: string,
  pd: Date,
  exp: Date
): Promise<any> => {
  return request.post('/drug/insert', qs.stringify({ name, price, quantity, factory, batch, pd, exp }))
}

// 修改药品
export const updateDrug = (
  id: number,
  name: string,
  price: number,
  quantity: number,
  factory: string,
  batch: string,
  pd: Date,
  exp: Date
): Promise<any> => {
  return request.post(`/drug/update?id=${id}`, qs.stringify({ name, price, quantity, factory, batch, pd, exp }))
}

// 删除药品
export const deleteDrug = (id: number): Promise<any> => request.post(`/drug/delete?id=${id}`)
