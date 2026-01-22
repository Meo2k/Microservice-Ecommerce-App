import { ITemporaryRepository } from "src/interfaces/temporary.interface";
import { redis } from "src/redis";

export class TemporaryRepository implements ITemporaryRepository {
    constructor(){}

    getKey = async (key: string) => {
        const value = await redis.get(key)
        return value
    }

    setKey = async (key: string, payload: object, options: {ex: number}) => {
        await redis.set(key, payload, options)
    }

    deletePattern = async (pattern: string) => {
        await redis.del(pattern)
    }
}