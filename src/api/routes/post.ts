import { FastifyInstance } from 'fastify'
import * as postService from '../services/post'
import * as postSchemas from '../../domain/post/validation/schemas'
import { PostDto } from '../../domain/post/dto'

export default async function postRoute(app: FastifyInstance) {
  app.post(
    '/',
    {
      schema: postSchemas.createPostSchema,
      preHandler: async (request, reply) => {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.send(err)
        }
      },
    },
    async (request, reply) => {
      try {
        const postDto = request.body
        const post = await postService.createPost(postDto as PostDto)
        reply.code(201)
        return post
      } catch (error: any) {
        switch (error.code) {
          default:
            reply.code(500)
            reply.send({ message: 'An unexpected error occurred' })
        }
      }
    }
  )
}
