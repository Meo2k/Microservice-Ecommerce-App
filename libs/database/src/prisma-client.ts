
import { PrismaClient } from '../generated/client/index.js';


const prismaClientSingleton = () => {
    const dbUrl = process.env['NX_DATABASE_URL_POSTGRESQL'];
    
    if (!dbUrl) {
        console.error('❌ [Prisma] NX_DATABASE_URL_POSTGRESQL is not set!');
    }

    return new PrismaClient({
        datasourceUrl: dbUrl,
    })
};

type ExtendedPrismaClient = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: ExtendedPrismaClient | undefined;
};

// Helper to ensure singleton
export const getPrismaClient = () => {
    if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = prismaClientSingleton();
    }
    return globalForPrisma.prisma;
};

export const prismaSelf = getPrismaClient();

if (process.env['NODE_ENV'] !== 'production') globalForPrisma.prisma = prismaSelf;

