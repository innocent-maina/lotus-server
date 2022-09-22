import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Deliveries from '../../Models/Deliveries'
// import User from 'App/Models/User'

export default class DeliveriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const deliveries = await Deliveries.query().select('*').from('deliveries')
      return response.json({
        success: true,
        message: 'Deliveries retrieved successfully',
        data: deliveries,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // // get single user's deliveries
  // public async userOrder({ response, params }: HttpContextContract) {
  //   try {
  //     // const user = await User.find(params.id)
  //     const deliveries = await Deliveries.query()
  //       .select('*')
  //       .preload('user')
  //       .from('deliveries')
  //       // .where('user_id', params.id)
  //       .whereHas('user', (query) => {
  //         query.where('user_id', params.id)
  //       })
  //     return response.json({
  //       success: true,
  //       message: 'Single User Deliveries retrieved successfully',
  //       data: deliveries,
  //     })
  //   } catch (error) {
  //     return response.json({
  //       success: false,
  //       message: error.message,
  //       data: error,
  //     })
  //   }
  // }
  public async show({ params, response }: HttpContextContract) {
    try {
      const deliveries = await Deliveries.find(params.id)
      if (deliveries) {
        return response.json({
          success: true,
          message: 'Deliveries found',
          data: deliveries,
        })
      } else {
        return response.json({
          success: true,
          message: 'Deliveries not found',
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
      const deliveries = await Deliveries.create(data)
      return response.json({
        success: true,
        message: 'Deliveries created successfully',
        data: deliveries,
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
      const deliveries = await Deliveries.findOrFail(params.id)
      if (!deliveries) {
        return response.json({
          success: true,
          message: 'Deliveries not found',
          data: null,
        })
      } else {
        deliveries.merge(request.all())

        await deliveries.save()
        return response.json({
          success: true,
          message: 'Deliveries updated successfully',
          data: deliveries,
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
      const deliveries = await Deliveries.find(params.id)
      if (deliveries) {
        deliveries.delete()
        return response.json({
          success: true,
          message: 'Successfully deleted the deliveries',
          data: null,
        })
      } else {
        return response.json({
          success: false,
          message: 'Deliveries does not exist',
          data: deliveries,
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
