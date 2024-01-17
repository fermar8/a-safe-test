"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function getAllUsers() {
    try {
        return await prisma.user.findMany();
    }
    catch (error) {
        throw error;
    }
}
exports.getAllUsers = getAllUsers;
async function getUserById(id) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw error;
    }
}
exports.getUserById = getUserById;
async function getUserByEmail(email) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch (error) {
        throw error;
    }
}
exports.getUserByEmail = getUserByEmail;
async function updateUser(id, userDto) {
    try {
        return await prisma.user.update({
            where: { id },
            data: userDto,
        });
    }
    catch (error) {
        throw error;
    }
}
exports.updateUser = updateUser;
async function createUser(userDto) {
    try {
        return await prisma.user.create({
            data: {
                name: userDto.name,
                email: userDto.email,
                password: userDto.password,
                isAdmin: userDto.isAdmin,
            },
        });
    }
    catch (error) {
        throw error;
    }
}
exports.createUser = createUser;
async function deleteUser(id) {
    try {
        return await prisma.user.delete({
            where: { id },
        });
    }
    catch (error) {
        throw error;
    }
}
exports.deleteUser = deleteUser;
