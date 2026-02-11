export const withTimeout = (promise: Promise<any>, ms: number) => {
    const safeMs = Math.max(0, ms);
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout after ${safeMs}ms`)), safeMs)
    );
    return Promise.race([promise, timeout]);
};