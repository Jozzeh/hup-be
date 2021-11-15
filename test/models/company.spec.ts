import test from 'japa'
import Company from 'App/Models/Company'

test.group('Companies test', () => {
  test('ensure company name is properly saved', async (assert) => {
    const company = new Company()
    company.name = 'Test'
    await company.save()

    assert.equal(company.name, 'Test')
  })
})
