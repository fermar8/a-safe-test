import * as postRepository from '../repositories/post'
import { PostDto } from '../../domain/post/dto'
import { PostResponse } from '../../domain/post/responses'

export async function createPost(postDto: PostDto): Promise<PostResponse> {
  try {
    return await postRepository.createPost(postDto)
  } catch (error) {
    throw error
  }
}
