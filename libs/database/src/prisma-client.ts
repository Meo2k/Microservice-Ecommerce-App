
import { PrismaClient } from '../generated/client/index.js';
import { hashPassword } from './utils/password.util.js';


const prismaClientSingleton = () => {
    const dbUrl = process.env['NX_DATABASE_URL_POSTGRESQL'];
    
    if (!dbUrl) {
        console.error('❌ [Prisma] NX_DATABASE_URL_POSTGRESQL is not set!');
    }

    return new PrismaClient({
        datasourceUrl: dbUrl,
    }).$extends({
        query: {
            user: {
                async create({ args, query }) {
                    if (args.data.password && typeof args.data.password === 'string') {
                        args.data.password = await hashPassword(args.data.password);
                    }
                    return query(args);
                },
                async update({ args, query }) {
                    if (args.data.password && typeof args.data.password === 'string') {
                        args.data.password = await hashPassword(args.data.password);
                    }
                    return query(args);
                },
            },
        },
    });
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

