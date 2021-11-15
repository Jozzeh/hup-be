"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
exports.default = Env_1.default.rules({
    HOST: Env_1.default.schema.string({ format: 'host' }),
    PORT: Env_1.default.schema.number(),
    APP_KEY: Env_1.default.schema.string(),
    APP_NAME: Env_1.default.schema.string(),
    DRIVE_DISK: Env_1.default.schema.enum(['local']),
    NODE_ENV: Env_1.default.schema.enum(['development', 'production', 'testing']),
    CORS_ORIGIN: Env_1.default.schema.enum([true, false, '*', 'hup.be']),
    DB_CONNECTION: Env_1.default.schema.enum(['sqlite', 'mysql']),
    MYSQL_HOST: Env_1.default.schema.string(),
    MYSQL_PORT: Env_1.default.schema.number(),
    MYSQL_USER: Env_1.default.schema.string(),
    MYSQL_PASSWORD: Env_1.default.schema.string(),
    MYSQL_DB_NAME: Env_1.default.schema.string(),
    ADMIN_EMAIL: Env_1.default.schema.string(),
    ADMIN_PASSWORD: Env_1.default.schema.string(),
    ADMIN_NAME: Env_1.default.schema.string(),
});
//# sourceMappingURL=env.js.map