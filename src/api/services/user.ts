import bcrypt from 'bcrypt'
import * as userRepository from '../repositories/user'
import { UserDto, UserDtoOptionalPassword } from '../../domain/user/dto'
import { UserResponse } from '../../domain/user/responses'

export async function getAllUsers(): Promise<UserResponse[]> {
  try {
    return await userRepository.getAllUsers()
  } catch (error) {
    throw error
  }
}

export async function getUserById(id: number): Promise<UserResponse> {
  try {
    return await userRepository.getUserById(id)
  } catch (error) {
    throw error
  }
}

export async function getUserByEmail(email: string): Promise<UserResponse> {
  try {
    return await userRepository.getUserByEmail(email)
  } catch (error) {
    throw error
  }
}

export async function updateUser(
  id: number,
  userDto: UserDto | UserDtoOptionalPassword
): Promise<UserResponse> {
  try {
    return await userRepository.updateUser(id, userDto)
  } catch (error) {
    throw error
  }
}

export async function loginUser(userDto: UserDto): Promise<UserResponse> {
  try {
    const { email, password } = userDto
    const user = await userRepository.getUserByEmail(email)
    const isMatch = user && (await bcrypt.compare(password, user.password!))
    if (!user || !isMatch) {
      throw new Error('Invalid email or password')
    }
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  } catch (error) {
    throw error
  }
}

export async function createUser(userDto: UserDto): Promise<UserResponse> {
  try {
    const hash = await bcrypt.hash(userDto.password, 10)
    userDto.password = hash
    return await userRepository.createUser(userDto)
  } catch (error) {
    throw error
  }
}

export async function deleteUser(id: number): Promise<{}> {
  try {
    return await userRepository.deleteUser(id)
  } catch (error) {
    throw error
  }
}
