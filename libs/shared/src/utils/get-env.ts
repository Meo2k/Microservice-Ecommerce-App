export const getEnv = (key: string, defaultValue?: string) => {
    const value = process.env[key] || defaultValue;
    if (!value) {
        // @ts-ignore
        const isBrowser = typeof window !== 'undefined';
        const isNextBuild = process.env.NODE_ENV === 'production' || process.env.NEXT_PHASE;

        if (isBrowser || isNextBuild) {
            return defaultValue || "";
        }

        // Only log warning instead of throwing to prevent crashing the app startup
        // especially during builds or in environments where some variables are optional.
        console.warn(`Missing environment variable ${key}`);
        return defaultValue || "";
    }
    return value;
}