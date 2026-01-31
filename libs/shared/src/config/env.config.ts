import { getEnv } from '../utils/get-env.js';

export const ENV = {
    NODE_ENV: getEnv("NX_NODE_ENV", "development"),

    EMAIL_HOST: getEnv("NX_EMAIL_HOST", "smtp.ethereal.email"),
    EMAIL_USER: getEnv("NX_EMAIL_USER", "user@gmail.com"),
    EMAIL_PASS: getEnv("NX_EMAIL_PASS", "password"),
    EMAIL_FROM: getEnv("NX_EMAIL_FROM", "user@gmail.com"),

    DATABASE_URL_POSTGRESQL: getEnv("NX_DATABASE_URL_POSTGRESQL"),
    DATABASE_URL_MONGODB: getEnv("NX_DATABASE_URL_MONGODB"),


    ACCESS_TOKEN_KEY: getEnv("NX_ACCESS_TOKEN_KEY", "access_token_key"),
    ACCESS_TOKEN_EXPIRED: getEnv("NX_ACCESS_TOKEN_EXPIRED", "1h"),
    REFRESH_TOKEN_KEY: getEnv("NX_REFRESH_TOKEN_KEY", "refresh_token_key"),
    REFRESH_TOKEN_EXPIRED: getEnv("NX_REFRESH_TOKEN_EXPIRED", "7d"),
    ROTATE_TIME_TOKEN: getEnv("NX_ROTATE_TIME_TOKEN", "24h"),

    ADMIN_EMAIL: getEnv("NX_ADMIN_EMAIL", "admin@org.com"),
    ADMIN_PASSWORD: getEnv("NX_ADMIN_PASSWORD", "admin"),

    MAX_ADDRESS: getEnv("NX_MAX_ADDRESS", "5"),

    OTP_EXPIRED: getEnv("NX_OTP_EXPIRED", "600"),
    OTP_COOLDOWN: getEnv("NX_OTP_COOLDOWN", "60"),
    OTP_LOCKTIME: getEnv("NX_OTP_LOCKTIME", "3600"),
    OTP_MAX_ATTEMPTS: getEnv("NX_OTP_MAX_ATTEMPTS", "5"),


    REDIS_URL: getEnv("NX_REDIS_URL"),
    REDIS_TOKEN: getEnv("NX_REDIS_TOKEN"),

    API_GATEWAY_HOST: getEnv("NX_API_GATEWAY_HOST", "localhost"),
    API_GATEWAY_PORT: getEnv("NX_API_GATEWAY_PORT", "9000"),
    API_GATEWAY_CLIENT_URL: getEnv("NX_API_GATEWAY_CLIENT_URL", "*"),

    AUTH_SERVICE_PORT: getEnv("NX_AUTH_SERVICE_PORT", "6001"),
    AUTH_SERVICE_HOST: getEnv("NX_AUTH_SERVICE_HOST", "localhost"),

    USER_SERVICE_PORT: getEnv("NX_USER_SERVICE_PORT", "6002"),
    USER_SERVICE_HOST: getEnv("NX_USER_SERVICE_HOST", "localhost"),

    PRODUCT_SERVICE_PORT: getEnv("NX_PRODUCT_SERVICE_PORT", "6003"),
    PRODUCT_SERVICE_HOST: getEnv("NX_PRODUCT_SERVICE_HOST", "localhost"),

    SHOP_SERVICE_PORT: getEnv("NX_SHOP_SERVICE_PORT", "6004"),
    SHOP_SERVICE_HOST: getEnv("NX_SHOP_SERVICE_HOST", "localhost"),

}