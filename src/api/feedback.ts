import { request } from '@/utils'
import { Params } from '@/interface'
import qs from 'qs'

// 获取反馈记录
export const getFeedback = (id: number): Promise<any> => request.get(`/feedback/feedback?id=${id}`)

// 获取所有反馈记录
export const getAllFeedback = (params?: Params): Promise<any> => request.get('/feedback/feedbacks', { params })

// 新增反馈记录
export const insertFeedback = (title: string, text: string): Promise<any> => {
  return request.post('/feedback/insert', qs.stringify({ title, text }))
}

// 删除反馈记录
export const deleteFeedback = (id: number): Promise<any> => request.post(`/feedback/delete?id=${id}`)
