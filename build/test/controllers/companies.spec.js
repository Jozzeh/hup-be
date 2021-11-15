"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const japa_1 = __importDefault(require("japa"));
const supertest_1 = __importDefault(require("supertest"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Company_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Company"));
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
japa_1.default.group('Companies test', () => {
    japa_1.default('ensure that unauthenticated users can not fetch companies', async () => {
        await supertest_1.default(BASE_URL).get('/api/v1/companies').expect(401);
    });
    japa_1.default('ensure the companies can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const companiesResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/companies')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const companies = JSON.parse(companiesResponse.text);
        assert.equal(companies.length, 2);
    });
    japa_1.default('ensure an admin can create a company', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const companiesResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/companies')
            .send({ name: 'testCompany' })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const company = JSON.parse(companiesResponse.text);
        assert.equal(company.name, 'testCompany');
    });
    japa_1.default('ensure a single company can be fetched', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const companiesResponse = await supertest_1.default(BASE_URL)
            .get('/api/v1/companies/1')
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const company = JSON.parse(companiesResponse.text);
        assert.equal(company.name, 'Empty');
    });
    japa_1.default('ensure an admin can update a company', async (assert) => {
        const loginResponse = await supertest_1.default(BASE_URL)
            .post('/api/v1/login')
            .send({ email: Env_1.default.get('ADMIN_EMAIL'), password: Env_1.default.get('ADMIN_PASSWORD') })
            .set('Accept', 'application/json')
            .expect(200);
        const loginToken = JSON.parse(loginResponse.text).token;
        const companiesResponse = await supertest_1.default(BASE_URL)
            .put('/api/v1/companies/3')
            .send({ name: 'tester2' })
            .set('Authorization', 'Bearer ' + loginToken)
            .expect(200);
        const company = JSON.parse(companiesResponse.text);
        assert.equal(company.name, 'tester2');
        await Company_1.default.query().where('name', 'tester2').delete();
    });
});
//# sourceMappingURL=companies.spec.js.map