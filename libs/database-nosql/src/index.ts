import { PrismaClient } from '../generated/prisma/client.js';

const prismaClientSingleton = () => {
    return new PrismaClient({
        datasourceUrl: process.env['NX_DATABASE_URL_MONGODB'],
    })
};

type ExtendedPrismaClient = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: ExtendedPrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env['NODE_ENV'] !== 'production') globalForPrisma.prisma = prisma;

export * from '../generated/prisma/client.js';
