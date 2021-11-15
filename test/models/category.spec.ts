import Category from 'App/Models/Category'
import test from 'japa'

test.group('Category test', () => {
  test('ensure category name is properly saved', async (assert) => {
    const category = new Category()
    category.name = 'Test'
    category.companyId = 1
    category.createdBy = 1
    category.updatedBy = 1
    category.active = false
    await category.save()

    assert.equal(category.name, 'Test')
    assert.equal(category.active, false)
  })
})
