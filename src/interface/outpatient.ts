export interface Outpatient {
  id: number
  date: string
  total: number
  editor: string
  createdAt: Date
  updatedAt: Date
  outpatient_details: OutpatientDetail[] | []
}

export interface OutpatientDetail {
  key: number
  doctor: string
  total: number
}
