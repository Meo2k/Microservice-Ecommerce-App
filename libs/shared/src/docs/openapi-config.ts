
import { extendZodWithOpenApi, OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

// Enable OpenAPI extension for Zod
extendZodWithOpenApi(z);

export const apiRegistry = new OpenAPIRegistry();

apiRegistry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
});

export const generateOpenApiDocument = () => {
    const generator = new OpenApiGeneratorV3(apiRegistry.definitions);

    return generator.generateDocument({
        openapi: '3.0.0',
        info: {
            title: 'E-commerce Microservices API',
            version: '1.0.0',
            description: 'API Contract defined by Zod Schemas',
        },
        servers: [{ url: '/' }],
    });
};
