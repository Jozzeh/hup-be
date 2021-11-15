import Route from '@ioc:Adonis/Core/Route'
// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.group(() => {
  Route.get('/', 'UsersController.index')

  Route.post('/', 'UsersController.insert').middleware('role:Admin')

  Route.get('/profile', 'UsersController.profile')

  Route.get('/:id', 'UsersController.single')

  Route.put('/:id', 'UsersController.update')

  Route.delete('/:id', 'UsersController.delete').middleware('role:Admin')
})
  .prefix('/api/v1/users')
  .middleware('auth')
