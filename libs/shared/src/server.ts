// --- Server-Only Code (Node.js Environment) ---

// Re-export common code
export * from './index';

// Node-specific Utilities
export * from './utils/get-env';
export * from './config/env.config';
export * from './config/path.config';
export * from './utils/password.util';
export * from './utils/jwt.util';
export * from './utils/otp.util';
export * from './utils/email.util';

// Middlewares
export * from './middlewares/async-handler.middleware';
export * from './middlewares/error-handler.middleware';
export * from './middlewares/validate.middleware';
export * from './middlewares/auth.middleware';
export * from './middlewares/check-ownership.middleware';
export * from './middlewares/check-permission.middleware';
