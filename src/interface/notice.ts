export interface Notice {
  id: number
  title: string
  author: string
  createdAt: Date
  updatedAt: Date
}

export interface Notice_Text {
  id: number
  notice_id: number
  text: string
}

export interface NoticeContent {
  id: number
  title: string
  author: string
  createdAt: Date
  updatedAt: Date
  notice_text: Notice_Text
}
