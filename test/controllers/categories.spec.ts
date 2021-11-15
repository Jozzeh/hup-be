import test from 'japa'
import supertest from 'supertest'
import Env from '@ioc:Adonis/Core/Env'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Categories test', () => {
  test('ensure that unauthenticated users can not fetch categories', async () => {
    /**
     * Make request
     */
    await supertest(BASE_URL).get('/api/v1/categories').expect(401)
  })

  test('ensure the categories can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const categoriesResponse = await supertest(BASE_URL)
      .get('/api/v1/categories')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const categories = JSON.parse(categoriesResponse.text)
    assert.equal(categories.length, 0)
  })

  test('ensure an admin can create a category', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const categoriesResponse = await supertest(BASE_URL)
      .post('/api/v1/categories')
      .send({ name: 'test cat' })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const category = JSON.parse(categoriesResponse.text)
    assert.equal(category.name, 'test cat')
  })

  test('ensure a single category can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const categoriesResponse = await supertest(BASE_URL)
      .get('/api/v1/categories/1')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const category = JSON.parse(categoriesResponse.text)
    assert.equal(category.name, 'test cat')
  })

  test('ensure an admin can update a category', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const categoriesResponse = await supertest(BASE_URL)
      .put('/api/v1/categories/1')
      .send({ name: 'tester2' })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const category = JSON.parse(categoriesResponse.text)
    assert.equal(category.name, 'tester2')
  })

  test('ensure an admin can soft delete a category', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const categoriesResponse = await supertest(BASE_URL)
      .post('/api/v1/categories')
      .send({ name: 'test cat 2' })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const category = JSON.parse(categoriesResponse.text)
    assert.equal(category.name, 'test cat 2')

    await supertest(BASE_URL)
      .delete('/api/v1/categories/2')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(204)

    const categoriesAssertResponse = await supertest(BASE_URL)
      .get('/api/v1/categories/2')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const categoryAssert = JSON.parse(categoriesAssertResponse.text)
    assert.equal(categoryAssert.active, false)
  })
})
