import { ITemporaryService } from "../interfaces/temporary.interface.js";
import { redis } from "../redis.js";

/**
 * Temporary Cache Service Implementation using Redis
 */
export class TemporaryService implements ITemporaryService {
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
