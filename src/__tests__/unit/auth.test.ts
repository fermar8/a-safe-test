import { FastifyRequest, FastifyReply } from 'fastify'
import { checkIsLoggedIn, checkIsAdmin } from '../../api/middleware/auth'

describe('checkIsAdmin', () => {
  let mockRequest: FastifyRequest
  let mockReply: FastifyReply

  beforeEach(() => {
    mockRequest = {
      jwtVerify: jest.fn(),
    } as unknown as FastifyRequest

    mockReply = {
      code: jest.fn(),
      send: jest.fn(),
    } as unknown as FastifyReply
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should allow access if user is logged in', async () => {
    await checkIsLoggedIn(mockRequest, mockReply)

    expect(mockReply.send).not.toHaveBeenCalled()
  })

  it('should allow access if user is admin', async () => {
    ;(mockRequest.jwtVerify as jest.Mock).mockResolvedValue({ isAdmin: true })

    await checkIsAdmin(mockRequest, mockReply)

    expect(mockReply.code).not.toHaveBeenCalledWith(403)
  })

  it('should deny access if user is not admin', async () => {
    ;(mockRequest.jwtVerify as jest.Mock).mockResolvedValue({ isAdmin: false })

    await checkIsAdmin(mockRequest, mockReply)

    expect(mockReply.code).toHaveBeenCalledWith(403)
  })

  it('should handle error if jwt verification fails', async () => {
    ;(mockRequest.jwtVerify as jest.Mock).mockRejectedValue(new Error())

    await checkIsAdmin(mockRequest, mockReply)

    expect(mockReply.code).toHaveBeenCalledWith(403)
  })
})
