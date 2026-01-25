/**
 * Temporary Cache Service Interface
 * Defines contract for generic key-value storage operations
 */
export interface ITemporaryService {
    getKey(key: string): Promise<string | null>;
    setKey(key: string, payload: object, options: { ex: number }): Promise<void>;
    deletePattern(pattern: string): Promise<void>;
}