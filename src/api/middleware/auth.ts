import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkIsLoggedIn(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
}

export async function checkIsAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const token = await request.jwtVerify()
    const payload = token as { isAdmin?: boolean }
    if (!payload?.isAdmin) {
      throw new Error('User is not an admin')
    }
  } catch (err) {
    reply.code(403)
    reply.send(err)
  }
}
