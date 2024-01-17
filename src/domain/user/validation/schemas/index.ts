export const getAllUsersSchema = {
  headers: {
    type: 'object',
    properties: {
      Authorization: {
        type: 'string',
        pattern: '^Bearer .+$',
        description: 'Bearer token',
      },
    },
    required: ['Authorization'],
  },
  response: {
    200: {
      description: 'Find all users',
      type: 'array',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
    403: {
      description: 'User is not an admin',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User is not an admin',
        },
      },
    },
    500: {
      description: 'Unexpected error',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'An unexpected error ocurred' },
      },
    },
  },
}

export const getUserSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  headers: {
    type: 'object',
    properties: {
      Authorization: {
        type: 'string',
        pattern: '^Bearer .+$',
        description: 'Bearer token',
      },
    },
    required: ['Authorization'],
  },
  response: {
    200: {
      description: 'Find user by id',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
    400: {
      description: 'Params id must be a number',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Params id must be a number',
        },
      },
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User not found',
        },
      },
    },
    500: {
      description: 'Unexpected error',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'An unexpected error ocurred' },
      },
    },
  },
}

export const updateUserSchema = {
  headers: {
    type: 'object',
    properties: {
      Authorization: {
        type: 'string',
        pattern: '^Bearer .+$',
        description: 'Bearer token',
      },
    },
    required: ['Authorization'],
  },
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  response: {
    201: {
      description: 'Update user by id',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
    400: {
      description: 'Params id must be a number',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Params id must be a number',
        },
      },
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User not found',
        },
      },
    },
    500: {
      description: 'Unexpected error',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'An unexpected error ocurred' },
      },
    },
  },
}

export const createUserSchema = {
  body: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' },
    },
  },
  response: {
    201: {
      description: 'User registered successfully',
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
    400: {
      description: 'Body must have required property',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'body must have required property "email"',
        },
      },
    },
    403: {
      description: 'Email already exists',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Email already exists' },
      },
    },
    500: {
      description: 'Unexpected error',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'An unexpected error ocurred' },
      },
    },
  },
}

export const deleteUserSchema = {
  headers: {
    type: 'object',
    properties: {
      Authorization: {
        type: 'string',
        pattern: '^Bearer .+$',
        description: 'Bearer token',
      },
    },
    required: ['Authorization'],
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'number' },
    },
    required: ['id'],
  },
  response: {
    204: {
      description: 'Delete user by id',
      type: 'object',
      properties: {},
    },
    400: {
      description: 'Params id must be a number',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Params id must be a number',
        },
      },
    },
    404: {
      description: 'User not found',
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User not found',
        },
      },
    },
    500: {
      description: 'Unexpected error',
      type: 'object',
      properties: {
        message: { type: 'string', example: 'An unexpected error ocurred' },
      },
    },
  },
}
