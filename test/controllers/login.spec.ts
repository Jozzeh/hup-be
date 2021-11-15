import test from 'japa'
import supertest from 'supertest'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Login test', () => {
  test('ensure the users can be logged in', async (assert) => {
    /**
     * Make request
     */
    const loginResponse = await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    const loginToken = JSON.parse(loginResponse.text)
    assert.equal(loginToken.type, 'bearer')
    assert.isNotEmpty(loginToken.token)
  })

  test('ensure a user can log out', async () => {
    /**
     * Make request
     */
    await supertest(BASE_URL)
      .post('/api/v1/login')
      .send({ email: Env.get('ADMIN_EMAIL'), password: Env.get('ADMIN_PASSWORD') })
      .set('Accept', 'application/json')
      .expect(200)

    await supertest(BASE_URL).post('/api/v1/logout').expect(204)
  })

  test('ensure a user can forget his/her password and reset his/her password', async (assert) => {
    /**
     * Make request
     */
    await supertest(BASE_URL)
      .post('/api/v1/forgot')
      .send({ email: Env.get('ADMIN_EMAIL') })
      .expect(204)

    const originalAdminUser = await Database.query()
      .from('users')
      .select('*')
      .where('email', Env.get('ADMIN_EMAIL'))
      .firstOrFail()
    assert.isNotEmpty(originalAdminUser.one_time_key)

    await supertest(BASE_URL)
      .post('/api/v1/reset')
      .send({ one_time_key: originalAdminUser.one_time_key, password: 'testest' })
      .expect(204)

    const newAdminUser = await Database.query()
      .from('users')
      .select('*')
      .where('email', Env.get('ADMIN_EMAIL'))
      .firstOrFail()

    assert.isEmpty(newAdminUser.one_time_key)
    assert.notEqual(newAdminUser.password, originalAdminUser.password)

    //reset password to correct entry
    const currentAdminUser = await User.query().where('email', Env.get('ADMIN_EMAIL')).firstOrFail()
    currentAdminUser.password = Env.get('ADMIN_PASSWORD')
    await currentAdminUser.save()
  })
})
