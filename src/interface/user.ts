export interface User {
  id: number
  username: string
  password: string
  salt: string
  state: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Role {
  id: number
  rolename: string
}

export interface UserRole {
  id: number
  username: string
  role_id: number
  role: Role
}

export interface User_Detail {
  id: number
  name: string | null
  username: string
  gender: string | null
  phone: number | null
  email: string | null
}

export interface UserDetail {
  id: number
  username: string
  state: boolean
  createdAt: Date
  updatedAt: Date
  user_role: UserRole
  user_detail: User_Detail
}

export interface UserDetailRef {
  id: number
  username: string
  name: string | null
  gender: string | null
  phone: number | null
  email: string | null
  state: boolean
  role_id: number
  role: string
  createdAt: Date
  updatedAt: Date
}
