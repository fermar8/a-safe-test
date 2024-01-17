export interface UserResponse {
  id: number
  name: string
  email: string
  password?: string
  isAdmin?: boolean | null
  image?: string | null
  createdAt: Date
  updatedAt: Date
}
