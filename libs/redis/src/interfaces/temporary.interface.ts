export interface ITemporaryRepository {
    getKey(key: string): Promise<any>; 
    setKey(key: string, payload: object, options: {ex: number}): Promise<void>
    deletePattern(pattern: string): Promise<void>
}