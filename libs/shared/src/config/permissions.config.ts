
export enum Action {
    READ = 1 << 0,
    CREATE = 1 << 1,
    UPDATE = 1 << 2,
    DELETE = 1 << 3,
    MANAGER = 1 << 4,
}

export enum Resource {
    ALL = 0,
    USER = 1,
    ORDER = 2,
    PRODUCT = 3,
    CATEGORY = 4,
    SYSTEM = 5,
    ROLE = 6,
}

export const ADMIN_PERM: bigint = -1n;

const SELLER_BASE_ACTIONS = BigInt(Action.READ | Action.CREATE | Action.UPDATE);

export const SELLER_PERM: bigint =
    (SELLER_BASE_ACTIONS << (BigInt(Resource.ORDER) * 8n)) |
    (SELLER_BASE_ACTIONS << (BigInt(Resource.PRODUCT) * 8n)) |
    (SELLER_BASE_ACTIONS << (BigInt(Resource.CATEGORY) * 8n));

export class PermissionManager {
    private static readonly BITS_PER_RESOURCE = 8n;

    static pack(resource: Resource, action: Action): bigint {
        return BigInt(action) << (BigInt(resource) * this.BITS_PER_RESOURCE);
    }

    static can(userPerm: bigint, resource: Resource, action: Action): boolean {
        if (userPerm === ADMIN_PERM) return true;

        const requiredBit = this.pack(resource, action);
        const managerBit = this.pack(resource, Action.MANAGER);

        return (userPerm & (requiredBit | managerBit)) !== 0n;
    }

    static addPermission(userPerm: bigint, resource: Resource, action: Action | number): bigint {
        const bit = typeof action === 'number'
            ? BigInt(action) << (BigInt(resource) * this.BITS_PER_RESOURCE)
            : this.pack(resource, action);
        return userPerm | bit;
    }

    static removePermission(userPerm: bigint, resource: Resource, action: Action): bigint {
        const bit = this.pack(resource, action);
        return userPerm & ~bit;
    }

    static unpackToNames(userPerms: bigint): string[] {
        const results: string[] = [];

        for (let r = 0; r < 8; r++) {
            for (let a = 0; a < 8; a++) {
                const bitPosition = BigInt(r * 8 + a);
                const bit = 1n << bitPosition;

                if ((userPerms & bit) !== 0n) {
                    const rName = Resource[r] || `RES_${r}`;
                    const aValue = 1 << a;
                    const aName = Action[aValue] || `ACT_${a}`;
                    results.push(`${rName}:${aName}`);
                }
            }
        }
        return results;
    }

    static unpackToMap(userPerms: bigint): Record<string, string[]> {
        const map: Record<string, string[]> = {};
        const list = this.unpackToNames(userPerms);

        list.forEach(item => {
            const [r, a] = item.split(':');
            if (!map[r]) map[r] = [];
            map[r].push(a);
        });
        return map;
    }
}

