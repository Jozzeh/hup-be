import test from 'japa'
import User from 'App/Models/User'

test.group('Users test', () => {
  test('ensure user password gets hashed during save', async (assert) => {
    const user = new User()
    user.name = 'Jos User'
    user.email = 'jos@adonis.be'
    user.password = 'secret'
    user.companyId = 2
    user.roleId = 2
    await user.save()

    assert.notEqual(user.password, 'secret')
  })
})
