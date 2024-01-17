import { loginUser } from '../../api/services/user'
import * as userRepository from '../../api/repositories/user'
import * as bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}))

describe('loginUser', () => {
  let getUserByEmailSpy: jest.SpyInstance
  let compareSpy: jest.SpyInstance

  beforeEach(() => {
    getUserByEmailSpy = jest.spyOn(userRepository, 'getUserByEmail')
    compareSpy = bcrypt.compare as jest.Mock
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return user data if email and password match', async () => {
    const userDto = {
      email: 'test@example.com',
      password: 'password',
      name: 'aName',
    }
    const user = { id: 1, email: 'test@example.com', name: 'aName' }

    getUserByEmailSpy.mockResolvedValue(user)
    compareSpy.mockResolvedValue(true)

    const result = await loginUser(userDto)

    expect(result).toEqual({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  })

  it('should throw an error if email or password do not match', async () => {
    const userDto = {
      email: 'test@example.com',
      password: 'wrongpassword',
      name: 'aName',
    }
    const user = {}

    getUserByEmailSpy.mockResolvedValue(user)
    compareSpy.mockResolvedValue(false)

    await expect(loginUser(userDto)).rejects.toThrow(
      'Invalid email or password'
    )
  })
})
