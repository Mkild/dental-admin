import { request } from '@/utils'
import { Params } from '@/interface'
import qs from 'qs'

// 获取公告
export const getNotice = (id: number): Promise<any> => request.get(`/notice/notice?id=${id}`)

// 获取公告内容
export const getNoticeContent = (id: number): Promise<any> => request.get(`/notice/content?id=${id}`)

// 获取所有公告
export const getAllNotice = (params?: Params): Promise<any> => request.get('/notice/notices', { params })

// 新增公告
export const insertNotice = (title: string, text: string): Promise<any> => {
  return request.post('/notice/insert', qs.stringify({ title, text }))
}

// 修改公告
export const updateNotice = (id: number, title: string, text: string): Promise<any> => {
  return request.post(`/notice/update?id=${id}`, qs.stringify({ title, text }))
}

// 删除公告
export const deleteNotice = (id: number): Promise<any> => request.post(`/notice/delete?id=${id}`)
