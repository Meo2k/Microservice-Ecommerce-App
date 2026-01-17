import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@org/shared';

const prismaClientSingleton = () => {
    return new PrismaClient({
        datasourceUrl: process.env['NX_DATABASE_URL'],
    }).$extends({
        result: {
            user: {
                password: {
                    compute() {
                        return undefined // undefined for password field 
                    },
                },
            }
        }, 
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

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env['NODE_ENV'] !== 'production') globalForPrisma.prisma = prisma;

export * from '@prisma/client';
