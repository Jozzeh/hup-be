import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CategoriesController.index')
  Route.post('/', 'CategoriesController.insert')
  Route.get('/:id', 'CategoriesController.single')
  Route.put('/:id', 'CategoriesController.update')
  Route.delete('/:id', 'CategoriesController.delete')
})
  .prefix('/api/v1/categories')
  .middleware('auth')
