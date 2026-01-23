import { prisma } from '../prisma-client';

export const getUserPermissions = async (userId: number): Promise<bigint> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            userRole: {
                include: {
                    role: true
                }
            }
        }
    });

    if (!user) return BigInt(0);

    return user.userRole.reduce((acc, curr) => acc | curr.role.permissions, BigInt(0));
};
