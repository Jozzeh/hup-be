import test from 'japa'
import supertest from 'supertest'
import Env from '@ioc:Adonis/Core/Env'
import Company from 'App/Models/Company'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Companies test', () => {
  test('ensure that unauthenticated users can not fetch companies', async () => {
    /**
     * Make request
     */
    await supertest(BASE_URL).get('/api/v1/companies').expect(401)
  })

  test('ensure the companies can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const companiesResponse = await supertest(BASE_URL)
      .get('/api/v1/companies')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const companies = JSON.parse(companiesResponse.text)
    assert.equal(companies.length, 2)
  })

  test('ensure an admin can create a company', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const companiesResponse = await supertest(BASE_URL)
      .post('/api/v1/companies')
      .send({ name: 'testCompany' })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const company = JSON.parse(companiesResponse.text)
    assert.equal(company.name, 'testCompany')
  })

  test('ensure a single company can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const companiesResponse = await supertest(BASE_URL)
      .get('/api/v1/companies/1')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const company = JSON.parse(companiesResponse.text)
    assert.equal(company.name, 'Empty')
  })

  test('ensure an admin can update a company', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const companiesResponse = await supertest(BASE_URL)
      .put('/api/v1/companies/3')
      .send({ name: 'tester2' })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const company = JSON.parse(companiesResponse.text)
    assert.equal(company.name, 'tester2')

    //after asserting... delete the extra company
    await Company.query().where('name', 'tester2').delete()
  })
})
