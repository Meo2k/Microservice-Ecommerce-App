import * as dotenv from 'dotenv';
import * as path from 'path';
import { PrismaClient } from '../generated/client/index.js';
import { hashPassword } from './utils/password.util.js';

// Load environment variables before initializing Prisma Client
// Explicitly load from project root
const envPath = path.resolve(process.cwd(), '.env');
console.log('🔍 [Prisma] Loading .env from:', envPath);
dotenv.config({ path: envPath });

const prismaClientSingleton = () => {
    const dbUrl = process.env['NX_DATABASE_URL_POSTGRESQL'];
    console.log('🔍 [Prisma] Initializing with DATABASE_URL:', dbUrl ? '✅ Set' : '❌ Not set');

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
        console.log('🔍 [PrismaClient] Initializing new client instance via getPrismaClient...');
        globalForPrisma.prisma = prismaClientSingleton();
    }
    return globalForPrisma.prisma;
};

export const prisma = getPrismaClient();
console.log('🔍 [PrismaClient] Exported prisma type:', typeof prisma);

if (process.env['NODE_ENV'] !== 'production') globalForPrisma.prisma = prisma;

