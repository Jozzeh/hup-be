"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    uiEnabled: process.env.NODE_ENV === 'production' ? false : true,
    uiUrl: 'docs',
    specEnabled: process.env.NODE_ENV === 'production' ? false : true,
    specUrl: '/swagger.json',
    middleware: [],
    options: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Hups swagger docs',
                version: '1.0.0',
                description: 'The swagger docs of the hup application',
            },
        },
        apis: ['app/**/*.ts', 'docs/swagger/**/*.yml', 'start/routes.ts'],
        basePath: '/',
    },
    mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
    specFilePath: 'docs/swagger.json',
};
//# sourceMappingURL=swagger.js.map