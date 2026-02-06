
// Explicitly export PrismaClient and useful types, avoiding export * which shadows getPrismaClient in CJS
// Export all types from generated client to avoid build errors (TS2305)
export type * from '../generated/client/index.js';
// Export runtime values that don't conflict (PrismaClient, Prisma, Enums if any)
export { PrismaClient, Prisma } from '../generated/client/index.js';

// Export our factory and the singleton instance (aliased as prisma for backward compat)
export { getPrismaClient, prismaSelf, prismaSelf as prisma } from './prisma-client.js';
export * from './utils/password.util.js';
