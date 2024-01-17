import { PostDto } from '../../domain/post/dto'
import { PostResponse } from '../../domain/post/responses'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createPost(postDto: PostDto): Promise<PostResponse> {
  try {
    return await prisma.post.create({
      data: {
        title: postDto.title,
        content: postDto.content,
        author: {
          connect: {
            id: postDto.userId,
          },
        },
      },
    })
  } catch (error) {
    throw error
  }
}
