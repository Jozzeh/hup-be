"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const supertest_1 = __importDefault(require("supertest"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
japa_1.default.group('Users test', () => {
    japa_1.default('ensure that unauthenticated users can not fetch users', async () => {
        await supertest_1.default(BASE_URL).get('/api/v1/users').expect(401);
    });
    japa_1.default('ensure the users can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const usersResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/users')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const users = JSON.parse(usersResponse.text);
        assert.equal(users[0].name, Env_1.default.get('ADMIN_NAME'));
    });
    japa_1.default('ensure an admin can create a user', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const usersResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/users')
            .send({ email: 'test@test.be', name: 'tester', company_id: 1, role_id: 2 })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const user = JSON.parse(usersResponse.text);
        assert.equal(user.name, 'tester');
        assert.equal(user.email, 'test@test.be');
    });
    japa_1.default('ensure a single user can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const userResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/users/2')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const user = JSON.parse(userResponse.text);
        assert.equal(user.name, 'tester');
    });
    japa_1.default('ensure an admin can update a user', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const usersResponse = await supertest_1.default(BASE_URL)
            .put('/api/v1/users/2')
            .send({ email: 'test2@test.be', name: 'tester2', company_id: 1, role_id: 2, active: false })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const user = JSON.parse(usersResponse.text);
        assert.equal(user.name, 'tester2');
        assert.equal(user.email, 'test2@test.be');
        assert.equal(user.active, false);
    });
    japa_1.default('ensure an admin can delete a user', async () => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        await supertest_1.default(BASE_URL)
            .delete('/api/v1/users/2')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(204);
    });
    japa_1.default('ensure the profile of the current user can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const usersResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/users/profile')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const user = JSON.parse(usersResponse.text);
        assert.equal(user.name, Env_1.default.get('ADMIN_NAME'));
    });
});
//# sourceMappingURL=users.spec.js.map