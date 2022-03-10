export interface Charge {
  id: number
  project: string
  name: string
  amount: number
  signature: string
  date: string
  createdAt: Date
  updatedAt: Date
  charge_details: ChargeDetail[] | []
}

export interface ChargeDetail {
  key: number
  item: string
  price: number
  quantity: number
  amount: number
}
