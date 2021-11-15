import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CompaniesController.index')
  Route.post('/', 'CompaniesController.insert')
  Route.get('/:id', 'CompaniesController.single')
  Route.put('/:id', 'CompaniesController.update')
})
  .prefix('/api/v1/companies')
  .middleware('auth')
  .middleware('role:Admin')
