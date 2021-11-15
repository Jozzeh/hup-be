import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:catid/links/:id', 'LinksController.single')
  Route.put('/:catid/links/:id', 'LinksController.update')
  Route.delete('/:catid/links/:id', 'LinksController.delete')
  Route.get('/:catid/links', 'LinksController.index')
  Route.post('/:catid/links', 'LinksController.insert')
})
  .prefix('/api/v1/categories')
  .middleware('auth')
