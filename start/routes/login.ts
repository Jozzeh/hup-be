import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'LoginController.login')
  Route.post('/logout', 'LoginController.logout')
  Route.post('/forgot', 'LoginController.forgotPassword')
  Route.post('/reset', 'LoginController.resetPassword')
}).prefix('/api/v1')
