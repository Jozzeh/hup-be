"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const supertest_1 = __importDefault(require("supertest"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
japa_1.default.group('Roles test', () => {
    japa_1.default('ensure that unauthenticated users can not fetch roles', async () => {
        await supertest_1.default(BASE_URL).get('/api/v1/roles').expect(401);
    });
    japa_1.default('ensure the roles can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const rolesResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/roles')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const roles = JSON.parse(rolesResponse.text);
        assert.equal(roles.length, 2);
    });
});
//# sourceMappingURL=roles.spec.js.map