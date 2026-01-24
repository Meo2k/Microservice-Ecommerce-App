import { ITemporaryRepository } from "../interfaces/temporary.interface.js";
import { redis } from "../redis.js";

/**
 * Temporary Cache Repository Implementation using Redis
 * Provides generic key-value data access with expiration
 */
export class TemporaryRepository implements ITemporaryRepository {
    constructor() { }

    async getKey(key: string): Promise<string | null> {
        const value = await redis.get(key);
        return value as string | null;
    }

    async setKey(key: string, payload: object, options: { ex: number }): Promise<void> {
        await redis.set(key, payload, options);
    }

    async deletePattern(pattern: string): Promise<void> {
        await redis.del(pattern);
    }
}
