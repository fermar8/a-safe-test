"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = void 0;
exports.createPostSchema = {
    body: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
            title: { type: 'string' },
            content: { type: 'string' },
        },
    },
    response: {
        201: {
            description: 'Post created successfully',
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                content: { type: 'string' },
                authorId: { type: 'number' },
            },
        },
        400: {
            description: 'Body must have required property',
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    example: 'body must have required property "title"',
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
};
