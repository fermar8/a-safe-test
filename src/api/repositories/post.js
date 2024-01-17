"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function createPost(postDto) {
    try {
        return await prisma.post.create({
            data: {
                title: postDto.title,
                content: postDto.content,
                author: {
                    connect: {
                        id: postDto.userId,
                    },
                },
            },
        });
    }
    catch (error) {
        throw error;
    }
}
exports.createPost = createPost;
