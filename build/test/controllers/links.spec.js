"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const supertest_1 = __importDefault(require("supertest"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
japa_1.default.group('Links test', () => {
    japa_1.default('ensure that unauthenticated users can fetch links', async () => {
        await supertest_1.default(BASE_URL).get('/api/v1/categories/1/links').expect(401);
    });
    japa_1.default('ensure the links can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const linksResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/categories/1/links')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const links = JSON.parse(linksResponse.text);
        assert.equal(links.length, 0);
    });
    japa_1.default('ensure an admin can create a link', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const linksResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/categories/1/links')
            .send({ name: 'test cat', link: 'https://josdeberdt.be' })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const link = JSON.parse(linksResponse.text);
        assert.equal(link.name, 'test cat');
    });
    japa_1.default('ensure a single link can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const linksResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/categories/1/links/1')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const link = JSON.parse(linksResponse.text);
        assert.equal(link.name, 'test cat');
    });
    japa_1.default('ensure an admin can update a link', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const linksResponse = await supertest_1.default(BASE_URL)
            .put('/api/v1/categories/1/links/1')
            .send({ name: 'tester2', link: 'https://josdeberdt.be' })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const link = JSON.parse(linksResponse.text);
        assert.equal(link.name, 'tester2');
    });
    japa_1.default('ensure an admin can soft delete a link', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const linksResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/categories/1/links')
            .send({ name: 'test link 2', link: 'https://josdeberdt.be' })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const link = JSON.parse(linksResponse.text);
        assert.equal(link.name, 'test link 2');
        await supertest_1.default(BASE_URL)
            .delete('/api/v1/categories/1/links/2')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(204);
        const linksAssertResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/categories/1/links/2')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const linkAssert = JSON.parse(linksAssertResponse.text);
        assert.equal(linkAssert.active, false);
    });
});
//# sourceMappingURL=links.spec.js.map