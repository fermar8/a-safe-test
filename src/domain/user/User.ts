import { Post } from '../post/Post'

export interface User {
  name: string
  email: string
  password: string
  posts: Post[]
}
