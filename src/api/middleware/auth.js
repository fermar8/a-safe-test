"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsAdmin = exports.checkIsLoggedIn = void 0;
async function checkIsLoggedIn(request, reply) {
    try {
        await request.jwtVerify();
    }
    catch (err) {
        reply.send(err);
    }
}
exports.checkIsLoggedIn = checkIsLoggedIn;
async function checkIsAdmin(request, reply) {
    try {
        const token = await request.jwtVerify();
        const payload = token;
        if (!(payload === null || payload === void 0 ? void 0 : payload.isAdmin)) {
            throw new Error('User is not an admin');
        }
    }
    catch (err) {
        reply.code(403);
        reply.send(err);
    }
}
exports.checkIsAdmin = checkIsAdmin;
