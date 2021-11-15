import test from 'japa'
import supertest from 'supertest'
import Env from '@ioc:Adonis/Core/Env'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Users test', () => {
  test('ensure that unauthenticated users can not fetch users', async () => {
    /**
     * Make request
     */
    await supertest(BASE_URL).get('/api/v1/users').expect(401)
  })

  test('ensure the users can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const usersResponse = await supertest(BASE_URL)
      .get('/api/v1/users')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const users = JSON.parse(usersResponse.text)
    assert.equal(users[0].name, Env.get('ADMIN_NAME'))
  })

  test('ensure an admin can create a user', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const usersResponse = await supertest(BASE_URL)
      .post('/api/v1/users')
      .send({ email: 'test@test.be', name: 'tester', company_id: 1, role_id: 2 })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const user = JSON.parse(usersResponse.text)
    assert.equal(user.name, 'tester')
    assert.equal(user.email, 'test@test.be')
  })

  test('ensure a single user can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const userResponse = await supertest(BASE_URL)
      .get('/api/v1/users/2')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const user = JSON.parse(userResponse.text)
    assert.equal(user.name, 'tester')
  })

  test('ensure an admin can update a user', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const usersResponse = await supertest(BASE_URL)
      .put('/api/v1/users/2')
      .send({ email: 'test2@test.be', name: 'tester2', company_id: 1, role_id: 2, active: false })
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const user = JSON.parse(usersResponse.text)
    assert.equal(user.name, 'tester2')
    assert.equal(user.email, 'test2@test.be')
    assert.equal(user.active, false)
  })

  test('ensure an admin can delete a user', async () => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    await supertest(BASE_URL)
      .delete('/api/v1/users/2')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(204)
  })

  test('ensure the profile of the current user can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const usersResponse = await supertest(BASE_URL)
      .get('/api/v1/users/profile')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const user = JSON.parse(usersResponse.text)
    assert.equal(user.name, Env.get('ADMIN_NAME'))
  })
})
