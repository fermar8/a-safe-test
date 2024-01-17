"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFastify = void 0;
const fastify_1 = __importDefault(require("fastify"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const swagger_2 = require("./config/swagger");
const user_1 = __importDefault(require("./api/routes/user"));
const post_1 = __importDefault(require("./api/routes/post"));
function buildFastify() {
    const server = (0, fastify_1.default)();
    server.register(multipart_1.default);
    server.register(jwt_1.default, { secret: process.env.JWT_SECRET });
    server.register(cookie_1.default);
    server.get('/', function (request, reply) {
        reply.send({ hello: 'world' });
    });
    server.register(swagger_1.default, swagger_2.swaggerConfig);
    server.register(swagger_ui_1.default, swagger_2.swaggerUiConfig);
    server.register(user_1.default, { prefix: '/api/user' });
    server.register(post_1.default, { prefix: '/api/post' });
    server.ready((err) => {
        if (err)
            throw err;
        server.swagger();
    });
    server.listen({ port: Number(process.env.PORT) }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening at ${address}`);
    });
    return server;
}
exports.buildFastify = buildFastify;
buildFastify();
