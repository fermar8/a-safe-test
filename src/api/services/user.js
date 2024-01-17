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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.loginUser = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository = __importStar(require("../repositories/user"));
async function getAllUsers() {
    try {
        return await userRepository.getAllUsers();
    }
    catch (error) {
        throw error;
    }
}
exports.getAllUsers = getAllUsers;
async function getUserById(id) {
    try {
        return await userRepository.getUserById(id);
    }
    catch (error) {
        throw error;
    }
}
exports.getUserById = getUserById;
async function getUserByEmail(email) {
    try {
        return await userRepository.getUserByEmail(email);
    }
    catch (error) {
        throw error;
    }
}
exports.getUserByEmail = getUserByEmail;
async function updateUser(id, userDto) {
    try {
        return await userRepository.updateUser(id, userDto);
    }
    catch (error) {
        throw error;
    }
}
exports.updateUser = updateUser;
async function loginUser(userDto) {
    try {
        const { email, password } = userDto;
        const user = await userRepository.getUserByEmail(email);
        const isMatch = user && (await bcrypt_1.default.compare(password, user.password));
        if (!user || !isMatch) {
            throw new Error('Invalid email or password');
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    }
    catch (error) {
        throw error;
    }
}
exports.loginUser = loginUser;
async function createUser(userDto) {
    try {
        const hash = await bcrypt_1.default.hash(userDto.password, 10);
        userDto.password = hash;
        return await userRepository.createUser(userDto);
    }
    catch (error) {
        throw error;
    }
}
exports.createUser = createUser;
async function deleteUser(id) {
    try {
        return await userRepository.deleteUser(id);
    }
    catch (error) {
        throw error;
    }
}
exports.deleteUser = deleteUser;
