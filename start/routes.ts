import Route from '@ioc:Adonis/Core/Route'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('api/v1', ({ response }: HttpContextContract) => {
  return response.status(200).json({
    success: true,
    message: 'OFAMIS API running 🚀',
  })
})
Route.get('api/v1/health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

//auth routes
Route.group(() => {
  Route.get('/user', 'AuthenticationController.user')
  Route.get('/user/:id', 'AuthenticationController.show')
  Route.get('/users', 'AuthenticationController.index')
  Route.post('/login', 'AuthenticationController.login')
  Route.post('/register', 'AuthenticationController.register')
  Route.post('/forgot-password', 'AuthenticationController.forgotPassword')
  Route.post('/reset-password', 'AuthenticationController.resetPassword')
}).prefix('/api/v1/auth')

// products routes
Route.group(() => {
  Route.group(() => {
    Route.get('/', 'ProductController.index')
    Route.post('/', 'ProductController.store')
    Route.get('/:id', 'ProductController.show')
    Route.put('/:id', 'ProductController.update')
    Route.delete('/:id', 'ProductController.delete')
  }).prefix('/product')

  // orders routes
  Route.group(() => {
    Route.get('/', 'OrderController.index')
    Route.get('/user/:id', 'OrderController.userOrder') // done
    Route.post('/', 'OrderController.store')
    Route.get('/:id', 'OrderController.show')
    Route.put('/:id', 'OrderController.update')
    Route.delete('/:id', 'OrderController.delete')
  }).prefix('/order')

  // categories routes
  Route.group(() => {
    Route.get('/', 'CategoriesController.index')
    Route.post('/', 'CategoriesController.store')
    Route.get('/:id', 'CategoriesController.show')
    Route.put('/:id', 'CategoriesController.update')
    Route.delete('/:id', 'CategoriesController.delete')
  }).prefix('/categories')

  // deliveries routes
  Route.group(() => {
    Route.get('/', 'DeliveriesController.index')
    Route.post('/', 'DeliveriesController.store')
    Route.get('/:id', 'DeliveriesController.show')
    Route.put('/:id', 'DeliveriesController.update')
    Route.delete('/:id', 'DeliveriesController.delete')
  }).prefix('/deliveries')

  //user updating routes
  Route.group(() => {
    Route.put('/:id', 'UserController.update')
    Route.delete('/:id', 'UserController.delete')
  }).prefix('/user-change')
})
  .prefix('/api/v1')
  // .middleware('auth')
