import test from 'japa'
import supertest from 'supertest'
import Env from '@ioc:Adonis/Core/Env'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Roles test', () => {
  test('ensure that unauthenticated users can not fetch roles', async () => {
    /**
     * Make request
     */
    await supertest(BASE_URL).get('/api/v1/roles').expect(401)
  })

  test('ensure the roles can be fetched', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text).token

    const rolesResponse = await supertest(BASE_URL)
      .get('/api/v1/roles')
      .set('Authorization', 'Bearer ' + loginToken)
      .expect(200)
    const roles = JSON.parse(rolesResponse.text)
    assert.equal(roles.length, 2)
  })
})
