import 'dotenv/config';
import { PrismaClient } from '.././src/client';
import { hashPassword } from '../../shared/src/utils/password.util';
import { ADMIN_PERM, SELLER_PERM } from '../../shared/src/config/permissions.config';

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.NX_ADMIN_EMAIL || "admin@org.com";
const ADMIN_PASSWORD = process.env.NX_ADMIN_PASSWORD || "admin";

async function main() {
    await prisma.userRole.deleteMany();
    await prisma.role.deleteMany();
    await prisma.user.deleteMany();

    console.log('Database cleaned...');
    console.log('Seeding database...');

    const adminRole = await prisma.role.create({
        data: {
            name: 'ADMIN',
            permissions: ADMIN_PERM,
        },
    });
    console.log(`Role created: ${adminRole.name} with full permissions.`);

    const sellerRole = await prisma.role.create({
        data: {
            name: 'SELLER',
            permissions: SELLER_PERM,
        },
    });
    console.log(`Role created: ${sellerRole.name} with seller permissions.`);

    const userRole = await prisma.role.create({
        data: {
            name: 'USER',
            permissions: 0n,
        },
    });
    console.log(`Role created: ${userRole.name} with basic permissions.`);

    const hashedPassword = await hashPassword(ADMIN_PASSWORD);
    const userAdmin = await prisma.user.create({
        data: {
            email: ADMIN_EMAIL,
            password: hashedPassword,
            username: 'Admin',
            is_verified: true,
            is_locked: false,
        }
    });
    console.log(`Admin User created: ${ADMIN_EMAIL}`);

    await prisma.userRole.create({
        data: {
            userId: userAdmin.id,
            roleId: adminRole.id
        }
    });
    console.log(`Assigned Role "ADMIN" to User "${ADMIN_EMAIL}"`);

    console.log('Seeding finished successfully.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });


