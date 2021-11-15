"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const supertest_1 = __importDefault(require("supertest"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
japa_1.default.group('Login test', () => {
    japa_1.default('ensure the users can be logged in', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text);
        assert.equal(loginToken.type, 'bearer');
        assert.isNotEmpty(loginToken.token);
    });
    japa_1.default('ensure a user can log out', async () => {
        await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        await supertest_1.default(BASE_URL).post('/api/v1/logout').expect(204);
    });
    japa_1.default('ensure a user can forget his/her password and reset his/her password', async (assert) => {
        await supertest_1.default(BASE_URL)
            .post('/api/v1/forgot')
            .send({ email: Env_1.default.get('ADMIN_EMAIL') })
            .expect(204);
        const originalAdminUser = await Database_1.default.query()
            .from('users')
            .select('*')
            .where('email', Env_1.default.get('ADMIN_EMAIL'))
            .firstOrFail();
        assert.isNotEmpty(originalAdminUser.one_time_key);
        await supertest_1.default(BASE_URL)
            .post('/api/v1/reset')
            .send({ one_time_key: originalAdminUser.one_time_key, password: 'testest' })
            .expect(204);
        const newAdminUser = await Database_1.default.query()
            .from('users')
            .select('*')
            .where('email', Env_1.default.get('ADMIN_EMAIL'))
            .firstOrFail();
        assert.isEmpty(newAdminUser.one_time_key);
        assert.notEqual(newAdminUser.password, originalAdminUser.password);
        const currentAdminUser = await User_1.default.query().where('email', Env_1.default.get('ADMIN_EMAIL')).firstOrFail();
        currentAdminUser.password = Env_1.default.get('ADMIN_PASSWORD');
        await currentAdminUser.save();
    });
});
//# sourceMappingURL=login.spec.js.map