import fastify from 'fastify'
import FastifyMultipart from '@fastify/multipart'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import jwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { swaggerConfig, swaggerUiConfig } from './config/swagger'

import userRoute from './api/routes/user'
import postRoute from './api/routes/post'

export function buildFastify() {
  const server = fastify()

  server.register(FastifyMultipart)

  server.register(jwt, { secret: process.env.JWT_SECRET as string })
  server.register(fastifyCookie)

  server.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })

  server.register(swagger, swaggerConfig)
  server.register(swaggerUi, swaggerUiConfig)

  server.register(userRoute, { prefix: '/api/user' })
  server.register(postRoute, { prefix: '/api/post' })

  server.ready((err) => {
    if (err) throw err
    server.swagger()
  })

  server.listen({ port: Number(process.env.PORT) }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })

  return server
}

buildFastify()
