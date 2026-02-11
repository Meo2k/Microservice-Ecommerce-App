// --- Server-Only Code (Node.js Environment) ---

// Re-export common code
export * from './index.js';

// Node-specific Utilities
export * from './utils/get-env.js';
export * from './config/env.config.js';
export * from './config/path.config.js';
export * from './utils/password.util.js';
export * from './utils/jwt.util.js';
export * from './utils/otp.util.js';
export * from './utils/email.util.js';

// Middlewares
export * from './middlewares/async-handler.middleware.js';
export * from './middlewares/error-handler.middleware.js';
export * from './middlewares/validate.middleware.js';
export * from './middlewares/auth.middleware.js';
export * from './middlewares/check-ownership.middleware.js';
export * from './middlewares/check-permission.middleware.js';

// Utils
export * from './utils/time-out.util.js';

// OpenAPI Docs
export * from './docs/openapi-config.js';
export * from './docs/schemas.registry.js';
