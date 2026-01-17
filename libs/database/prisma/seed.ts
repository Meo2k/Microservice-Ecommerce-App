import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PermissionsConfig } from '../../shared/src/config/permissions.config';
import { hashPassword } from '../../shared/src/utils/hash-password';

const prisma = new PrismaClient();


const ADMIN_EMAIL = process.env.NX_ADMIN_EMAIL || "admin@org.com";
const ADMIN_PASSWORD = process.env.NX_ADMIN_PASSWORD || "admin";

async function main() {
    await Promise.all([
        prisma.rolePermission.deleteMany(),
        prisma.userRole.deleteMany(),
    ])
    await Promise.all([
        prisma.permission.deleteMany(),
        prisma.role.deleteMany(),
        prisma.user.deleteMany(),
    ])

    console.log('Database cleaned...');
    console.log('Seeding database...');

    const permission = await prisma.permission.upsert({
        where: { action: PermissionsConfig.ACTION.MANAGER },
        update: {
            resource: PermissionsConfig.RESOURCE.ALL
        },
        create: {
            action: PermissionsConfig.ACTION.MANAGER,
            resource: PermissionsConfig.RESOURCE.ALL,
        },
    });
    console.log(`Permission ensured: ${permission.action}`);

    const role = await prisma.role.upsert({
        where: { name: 'FULL_ACCESS' },
        update: {},
        create: {
            name: 'FULL_ACCESS',
        },
    });
    console.log(`Role ensured: ${role.name}`);

    const rolePermissionInitial = await prisma.rolePermission.findFirst({
        where: {
            roleId: role.id,
            permissionId: permission.id
        }
    });

    if (!rolePermissionInitial) {
        await prisma.rolePermission.create({
            data: {
                roleId: role.id,
                permissionId: permission.id
            }
        });
        console.log('Linked Role "FULL_ACCESS" to Permission "MANAGER"');
    } else {
        console.log('Role "FULL_ACCESS" already has Permission "MANAGER"');
    }


    let userAdmin = await prisma.user.findUnique({
        where: { email: ADMIN_EMAIL }
    });

    if (!userAdmin) {
        const hashedPassword = await hashPassword(ADMIN_PASSWORD);
        userAdmin = await prisma.user.create({
            data: {
                email: ADMIN_EMAIL,
                password: hashedPassword,
                username: 'Admin',
            }
        });
        console.log(`Admin User created: ${ADMIN_EMAIL}`);
    } else {
        console.log(`Admin User already exists: ${ADMIN_EMAIL}`);
    }

    // Link User <-> Role (Assign FULL_ACCESS to Admin)
    const userRoleRelation = await prisma.userRole.findFirst({
        where: {
            userId: userAdmin.id,
            roleId: role.id
        }
    });

    if (!userRoleRelation) {
        await prisma.userRole.create({
            data: {
                userId: userAdmin.id,
                roleId: role.id
            }
        });
        console.log(`Assigned Role "FULL_ACCESS" to User "${ADMIN_EMAIL}"`);
    } else {
        console.log(`User "${ADMIN_EMAIL}" already has Role "FULL_ACCESS"`);
    }

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
