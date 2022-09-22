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

  //user updating routes
  Route.group(() => {
    Route.put('/:id', 'UserController.update')
    Route.delete('/:id', 'UserController.delete')
  }).prefix('/user-change')

  // feedback routes
  Route.group(() => {
    Route.get('/', 'FeedbackController.index')
    Route.get('/product/:id', 'FeedbackController.productFeedback')
    Route.post('/', 'FeedbackController.store')
    Route.get('/:id', 'FeedbackController.show')
    Route.put('/:id', 'FeedbackController.update')
    Route.delete('/:id', 'FeedbackController.delete')
  }).prefix('/feedback')

  // maintenance routes
  Route.group(() => {
    Route.get('/', 'ServiceRequestController.index')
    Route.post('/', 'ServiceRequestController.store')
    Route.get('/:id', 'ServiceRequestController.show')
    Route.put('/:id', 'ServiceRequestController.update')
    Route.delete('/:id', 'ServiceRequestController.delete')
  }).prefix('/service-request')

  // worklog routes
  Route.group(() => {
    Route.get('/', 'WorkLogController.index')
    Route.get('/user/:id', 'WorkLogController.userWorkLog') // done
    Route.post('/', 'WorkLogController.store')
    Route.get('/:id', 'WorkLogController.show')
    Route.put('/:id', 'WorkLogController.update')
    Route.delete('/:id', 'WorkLogController.delete')
  }).prefix('/worklog')
})
  .prefix('/api/v1')
  .middleware('auth')
