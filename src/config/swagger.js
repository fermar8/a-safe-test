"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiConfig = exports.swaggerConfig = void 0;
const swaggerConfig = {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'A-safe Test',
            description: 'A-safe Test API',
            version: '0.1.0',
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here',
        },
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
};
exports.swaggerConfig = swaggerConfig;
const swaggerUiConfig = {
    routePrefix: '/documentation',
    exposeRoute: true,
};
exports.swaggerUiConfig = swaggerUiConfig;
