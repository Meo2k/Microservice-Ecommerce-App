import { getEnv } from '../utils/get-env.js';

export const ENV = {
    NODE_ENV: getEnv("NX_NODE_ENV", "development"),

    ADMIN_EMAIL: getEnv("NX_ADMIN_EMAIL", "admin@org.com"),
    ADMIN_PASSWORD: getEnv("NX_ADMIN_PASSWORD", "admin"),

    API_GATEWAY_HOST: getEnv("NX_API_GATEWAY_HOST", "localhost"),
    API_GATEWAY_PORT: getEnv("NX_API_GATEWAY_PORT", "9000"),
    API_GATEWAY_CLIENT_URL: getEnv("NX_API_GATEWAY_CLIENT_URL", "*"),

    AUTH_SERVICE_PORT: getEnv("NX_AUTH_SERVICE_PORT", "6001"),
    AUTH_SERVICE_HOST: getEnv("NX_AUTH_SERVICE_HOST", "localhost"),


}