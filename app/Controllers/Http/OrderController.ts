import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from '../../Models/Order'
// import User from 'App/Models/User'

export default class OrderController {
  public async index({ response }: HttpContextContract) {
    try {
      const orders = await Order.query().select('*').from('orders').preload('user')
      return response.json({
        success: true,
        message: 'Orders retrieved successfully',
        data: orders,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // get single user's orders
  public async userOrder({ response, params }: HttpContextContract) {
    try {
      // const user = await User.find(params.id)
      const orders = await Order.query()
        .select('*')
        .preload('user')
        .from('orders')
        // .where('user_id', params.id)
        .whereHas('user', (query) => {
          query.where('user_id', params.id)
        })
      return response.json({
        success: true,
        message: 'Single User Orders retrieved successfully',
        data: orders,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
  public async show({ params, response }: HttpContextContract) {
    try {
      const order = await Order.find(params.id)
      if (order) {
        return response.json({
          success: true,
          message: 'Order found',
          data: order,
        })
      } else {
        return response.json({
          success: true,
          message: 'Order not found',
          data: null,
        })
      }
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.all()
      const order = await Order.create(data)
      return response.json({
        success: true,
        message: 'Order created successfully',
        data: order,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const order = await Order.findOrFail(params.id)
      if (!order) {
        return response.json({
          success: true,
          message: 'Order not found',
          data: null,
        })
      } else {
        order.merge(request.all())

        await order.save()
        return response.json({
          success: true,
          message: 'Order updated successfully',
          data: order,
        })
      }
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const order = await Order.find(params.id)
      if (order) {
        order.delete()
        return response.json({
          success: true,
          message: 'Successfully deleted the order',
          data: null,
        })
      } else {
        return response.json({
          success: false,
          message: 'Order does not exist',
          data: order,
        })
      }
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }
}
