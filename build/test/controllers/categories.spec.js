"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const supertest_1 = __importDefault(require("supertest"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
japa_1.default.group('Categories test', () => {
    japa_1.default('ensure that unauthenticated users can not fetch categories', async () => {
        await supertest_1.default(BASE_URL).get('/api/v1/categories').expect(401);
    });
    japa_1.default('ensure the categories can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const categoriesResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/categories')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const categories = JSON.parse(categoriesResponse.text);
        assert.equal(categories.length, 0);
    });
    japa_1.default('ensure an admin can create a category', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const categoriesResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/categories')
            .send({ name: 'test cat' })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const category = JSON.parse(categoriesResponse.text);
        assert.equal(category.name, 'test cat');
    });
    japa_1.default('ensure a single category can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const categoriesResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/categories/1')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const category = JSON.parse(categoriesResponse.text);
        assert.equal(category.name, 'test cat');
    });
    japa_1.default('ensure an admin can update a category', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const categoriesResponse = await supertest_1.default(BASE_URL)
            .put('/api/v1/categories/1')
            .send({ name: 'tester2' })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const category = JSON.parse(categoriesResponse.text);
        assert.equal(category.name, 'tester2');
    });
    japa_1.default('ensure an admin can soft delete a category', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const categoriesResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/categories')
            .send({ name: 'test cat 2' })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const category = JSON.parse(categoriesResponse.text);
        assert.equal(category.name, 'test cat 2');
        await supertest_1.default(BASE_URL)
            .delete('/api/v1/categories/2')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(204);
        const categoriesAssertResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/categories/2')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const categoryAssert = JSON.parse(categoriesAssertResponse.text);
        assert.equal(categoryAssert.active, false);
    });
});
//# sourceMappingURL=categories.spec.js.map