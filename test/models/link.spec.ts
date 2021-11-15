import Link from 'App/Models/Link'
import test from 'japa'

test.group('Category test', () => {
  test('ensure link name is properly saved', async (assert) => {
    const link = new Link()
    link.name = 'Test'
    link.link = 'https://josdeberdt.be'
    link.categoryId = 1
    link.createdBy = 1
    link.updatedBy = 1
    link.active = false
    await link.save()

    assert.equal(link.name, 'Test')
    assert.equal(link.link, 'https://josdeberdt.be')
    assert.equal(link.active, false)
  })
})
