import { User } from '../user/User'

export interface Post {
  id: number
  title: string
  concent: string
  authorId: number
  author?: User
}
