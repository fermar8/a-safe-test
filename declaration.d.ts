import { FastifyRequest } from 'fastify';
import { FastifyJWT } from 'fastify-jwt';

declare module 'fastify' {
 interface FastifyRequest {
  jwt: FastifyJWT['verify'];
  file(): Promise<{ filename: string, mimetype: string, file: NodeJS.ReadableStream }>;
 }
}