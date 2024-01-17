"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageService = __importStar(require("../services/image"));
const userService = __importStar(require("../services/user"));
const userSchemas = __importStar(require("../../domain/user/validation/schemas"));
const auth_1 = require("../middleware/auth");
async function userRoute(app) {
    app.get('/all', { schema: userSchemas.getAllUsersSchema, preHandler: auth_1.checkIsAdmin }, async (request, reply) => {
        try {
            const users = await userService.getAllUsers();
            reply.code(200);
            return users;
        }
        catch (error) {
            switch (error.code) {
                default:
                    reply.code(500);
                    reply.send({ message: 'An unexpected error occurred' });
            }
        }
    });
    app.get('/:id', { schema: userSchemas.getUserSchema, preHandler: auth_1.checkIsLoggedIn }, async (request, reply) => {
        try {
            const { id } = request.params;
            const user = await userService.getUserById(Number(id));
            reply.code(200);
            return user;
        }
        catch (error) {
            switch (error.message) {
                case 'User not found':
                    reply.code(404);
                    reply.send({ message: 'User not found' });
                default:
                    reply.code(500);
                    reply.send({ message: 'An unexpected error occurred' });
            }
        }
    });
    app.put('/:id', { schema: userSchemas.updateUserSchema, preHandler: auth_1.checkIsLoggedIn }, async (request, reply) => {
        try {
            const { id } = request.params;
            const userDto = request.body;
            const user = await userService.updateUser(Number(id), userDto);
            reply.code(201);
            return user;
        }
        catch (error) {
            switch (error.code) {
                case 'P2025':
                    reply.code(404);
                    reply.send({ message: 'User not found' });
                case 'P2002':
                    reply.code(409);
                    reply.send({ message: 'Email already exists' });
                default:
                    reply.code(500);
                    reply.send({ message: 'An unexpected error occurred' });
            }
        }
    });
    app.post('/login', { schema: userSchemas.createUserSchema }, async (request, reply) => {
        try {
            const userDto = request.body;
            const user = await userService.loginUser(userDto);
            const payload = {
                id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
            };
            const token = await reply.jwtSign(payload);
            reply.setCookie('access_token', token, {
                path: '/',
                httpOnly: true,
                secure: true,
            });
            reply.code(201);
            return { payload, accessToken: token };
        }
        catch (error) {
            switch (error.code) {
                case 'P2002':
                    reply.code(409);
                    reply.send({ message: 'Email already exists' });
                default:
                    reply.code(500);
                    reply.send({ message: 'An unexpected error occurred' });
            }
        }
    });
    app.post('/:id/image', {
        preHandler: async (request, reply) => {
            try {
                await request.jwtVerify();
            }
            catch (err) {
                reply.send(err);
            }
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const image = await request.file();
        return await imageService.uploadUserImage(Number(id), image);
    });
    app.post('/', { schema: userSchemas.createUserSchema }, async (request, reply) => {
        try {
            const userDto = request.body;
            const user = await userService.createUser(userDto);
            reply.code(201);
            return user;
        }
        catch (error) {
            console.log(error);
            switch (error.code) {
                case 'P2002':
                    reply.code(409);
                    reply.send({ message: 'Email already exists' });
                default:
                    reply.code(500);
                    reply.send({ message: 'An unexpected error occurred' });
            }
        }
    });
    app.delete('/:id', { schema: userSchemas.deleteUserSchema, preHandler: auth_1.checkIsLoggedIn }, async (request, reply) => {
        try {
            const { id } = request.params;
            const user = await userService.deleteUser(Number(id));
            reply.code(204);
            return user;
        }
        catch (error) {
            switch (error.code) {
                case 'P2025':
                    reply.code(404);
                    reply.send({ message: 'User not found' });
                default:
                    reply.code(500);
                    reply.send({ message: 'An unexpected error occurred' });
            }
        }
    });
}
exports.default = userRoute;
