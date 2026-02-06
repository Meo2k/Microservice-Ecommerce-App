
// Explicitly export PrismaClient and useful types, avoiding export * which shadows getPrismaClient in CJS
export { PrismaClient, Prisma } from '../generated/client/index.js';
export { getPrismaClient, prisma } from './prisma-client.js';
export * from './utils/password.util.js';

