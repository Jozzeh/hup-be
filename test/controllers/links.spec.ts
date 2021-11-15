import test from 'japa'
import supertest from 'supertest'
import Env from '@ioc:Adonis/Core/Env'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Links test', () => {
  test('ensure that unauthenticated users can fetch links', async () => {
    /**
     * Make request
     */
    await supertest(BASE_URL).get('/api/v1/categories/1/links').expect(401)
  })

  test('ensure the links can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const linksResponse = await supertest(BASE_URL)
      .get('/api/v1/categories/1/links')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const links = JSON.parse(linksResponse.text)
    assert.equal(links.length, 0)
  })

  test('ensure an admin can create a link', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const linksResponse = await supertest(BASE_URL)
      .post('/api/v1/categories/1/links')
      .send({ name: 'test cat', link: 'https://josdeberdt.be' })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const link = JSON.parse(linksResponse.text)
    assert.equal(link.name, 'test cat')
  })

  test('ensure a single link can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const linksResponse = await supertest(BASE_URL)
      .get('/api/v1/categories/1/links/1')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const link = JSON.parse(linksResponse.text)
    assert.equal(link.name, 'test cat')
  })

  test('ensure an admin can update a link', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const linksResponse = await supertest(BASE_URL)
      .put('/api/v1/categories/1/links/1')
      .send({ name: 'tester2', link: 'https://josdeberdt.be' })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const link = JSON.parse(linksResponse.text)
    assert.equal(link.name, 'tester2')
  })

  test('ensure an admin can soft delete a link', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const linksResponse = await supertest(BASE_URL)
      .post('/api/v1/categories/1/links')
      .send({ name: 'test link 2', link: 'https://josdeberdt.be' })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const link = JSON.parse(linksResponse.text)
    assert.equal(link.name, 'test link 2')

    await supertest(BASE_URL)
      .delete('/api/v1/categories/1/links/2')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(204)

    const linksAssertResponse = await supertest(BASE_URL)
      .get('/api/v1/categories/1/links/2')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const linkAssert = JSON.parse(linksAssertResponse.text)
    assert.equal(linkAssert.active, false)
  })
})
