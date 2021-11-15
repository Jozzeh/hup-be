import test from 'japa'
import Role from 'App/Models/Role'

test.group('Roles test', () => {
  test('ensure role name is properly saved', async (assert) => {
    const role = new Role()
    role.name = 'Test'
    await role.save()

    assert.equal(role.name, 'Test')
  })
})
