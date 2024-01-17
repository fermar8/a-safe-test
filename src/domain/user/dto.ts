export interface UserDto {
  name: string
  email: string
  password: string
  isAdmin?: boolean
}

export interface UserDtoOptionalPassword {
  name: string
  email: string
  password?: string
  isAdmin?: boolean
}
