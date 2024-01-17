import { FastifyInstance } from 'fastify'

import * as imageService from '../services/image'
import * as userService from '../services/user'
import * as userSchemas from '../../domain/user/validation/schemas'
import { checkIsLoggedIn, checkIsAdmin } from '../middleware/auth'
import { UserDto } from '../../domain/user/dto'

export default async function userRoute(app: FastifyInstance) {
  app.get(
    '/all',
    { schema: userSchemas.getAllUsersSchema, preHandler: checkIsAdmin },
    async (request, reply) => {
      try {
        const users = await userService.getAllUsers()
        reply.code(200)
        return users
      } catch (error: any) {
        switch (error.code) {
          default:
            reply.code(500)
            reply.send({ message: 'An unexpected error occurred' })
        }
      }
    }
  )
  app.get(
    '/:id',
    { schema: userSchemas.getUserSchema, preHandler: checkIsLoggedIn },
    async (request, reply) => {
      try {
        const { id } = request.params as Record<string, unknown>
        const user = await userService.getUserById(Number(id))
        reply.code(200)
        return user
      } catch (error: any) {
        switch (error.message) {
          case 'User not found':
            reply.code(404)
            reply.send({ message: 'User not found' })
          default:
            reply.code(500)
            reply.send({ message: 'An unexpected error occurred' })
        }
      }
    }
  )
  app.put(
    '/:id',
    { schema: userSchemas.updateUserSchema, preHandler: checkIsLoggedIn },
    async (request, reply) => {
      try {
        const { id } = request.params as Record<string, unknown>
        const userDto = request.body
        const user = await userService.updateUser(
          Number(id),
          userDto as UserDto
        )
        reply.code(201)
        return user
      } catch (error: any) {
        switch (error.code) {
          case 'P2025':
            reply.code(404)
            reply.send({ message: 'User not found' })
          case 'P2002':
            reply.code(409)
            reply.send({ message: 'Email already exists' })
          default:
            reply.code(500)
            reply.send({ message: 'An unexpected error occurred' })
        }
      }
    }
  )
  app.post(
    '/login',
    { schema: userSchemas.createUserSchema },
    async (request, reply) => {
      try {
        const userDto = request.body
        const user = await userService.loginUser(userDto as UserDto)
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        }
        const token = await reply.jwtSign(payload)
        reply.setCookie('access_token', token, {
          path: '/',
          httpOnly: true,
          secure: true,
        })
        reply.code(201)
        return { payload, accessToken: token }
      } catch (error: any) {
        switch (error.code) {
          case 'P2002':
            reply.code(409)
            reply.send({ message: 'Email already exists' })
          default:
            reply.code(500)
            reply.send({ message: 'An unexpected error occurred' })
        }
      }
    }
  )
  app.post(
    '/:id/image',
    {
      preHandler: async (request, reply) => {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.send(err)
        }
      },
    },
    async (request, reply) => {
      const { id } = request.params as Record<string, unknown>
      const image = await request.file()
      return await imageService.uploadUserImage(Number(id), image)
    }
  )

  app.post(
    '/',
    { schema: userSchemas.createUserSchema },
    async (request, reply) => {
      try {
        const userDto = request.body
        const user = await userService.createUser(userDto as UserDto)
        reply.code(201)
        return user
      } catch (error: any) {
        switch (error.code) {
          case 'P2002':
            reply.code(409)
            reply.send({ message: 'Email already exists' })
          default:
            reply.code(500)
            reply.send({ message: 'An unexpected error occurred', error })
        }
      }
    }
  )
  app.delete(
    '/:id',
    { schema: userSchemas.deleteUserSchema, preHandler: checkIsLoggedIn },
    async (request, reply) => {
      try {
        const { id } = request.params as Record<string, unknown>
        const user = await userService.deleteUser(Number(id))
        reply.code(204)
        return user
      } catch (error: any) {
        switch (error.code) {
          case 'P2025':
            reply.code(404)
            reply.send({ message: 'User not found' })
          default:
            reply.code(500)
            reply.send({ message: 'An unexpected error occurred' })
        }
      }
    }
  )
}
