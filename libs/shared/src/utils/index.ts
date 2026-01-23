import ms from "ms";
import { v4 as uuid } from 'uuid';

export const Helper = {
    toMs: (time: string) => Number(ms( time as unknown as number)), 
    generateUUID: () => uuid()
}