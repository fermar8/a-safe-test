import { UserDto, UserDtoOptionalPassword } from '../../domain/user/dto'
import { UserResponse } from '../../domain/user/responses'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getAllUsers(): Promise<UserResponse[]> {
  try {
    return await prisma.user.findMany()
  } catch (error) {
    throw error
  }
}

export async function getUserById(id: number): Promise<UserResponse> {
  try {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  } catch (error) {
    throw error
  }
}

export async function getUserByEmail(email: string): Promise<UserResponse> {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  } catch (error) {
    throw error
  }
}

export async function updateUser(
  id: number,
  userDto: UserDto | UserDtoOptionalPassword
): Promise<UserResponse> {
  try {
    return await prisma.user.update({
      where: { id },
      data: userDto,
    })
  } catch (error) {
    throw error
  }
}

export async function createUser(userDto: UserDto): Promise<UserResponse> {
  try {
    return await prisma.user.create({
      data: {
        name: userDto.name,
        email: userDto.email,
        password: userDto.password,
        isAdmin: userDto.isAdmin,
      },
    })
  } catch (error) {
    throw error
  }
}

export async function deleteUser(id: number): Promise<{}> {
  try {
    return await prisma.user.delete({
      where: { id },
    })
  } catch (error) {
    throw error
  }
}
