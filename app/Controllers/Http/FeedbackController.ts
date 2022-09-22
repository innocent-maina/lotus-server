import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Feedback from '../../Models/Feedback'

export default class FeedbackController {
  /**
   * Retrieve all feedback records
   *
   * @param {HttpContextContract} {request, response, auth}
   * @return {*}
   * @memberof FeedbackController
   */
  public async index({ response }: HttpContextContract) {
    try {
      const feedbacks = await Feedback.query()
        .preload('user')
        .preload('product')
        .select('*')
        .from('feedbacks')
      return response.json({
        success: true,
        message: 'Feedbacks retrieved successfully',
        data: feedbacks,
      })
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
        data: error,
      })
    }
  }

  // get single product's feedback
  public async productFeedback({ response, params }: HttpContextContract) {
    try {
      const feedback = await Feedback.query()
        .select('*')
        .preload('product')
        .from('feedbacks')
        .whereHas('product', (query) => {
          query.where('product_id', params.id)
        })
      return response.json({
        success: true,
        message: 'Single Product Feedback retrieved successfully',
        data: feedback,
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
      const feedback = await Feedback.find(params.id)
      if (feedback) {
        return response.json({
          success: true,
          message: 'Feedback found',
          data: feedback,
        })
      } else {
        return response.json({
          success: true,
          message: 'Feedback not found',
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
      const feedback = await Feedback.create(data)
      return response.json({
        success: true,
        message: 'Feedback created successfully',
        data: feedback,
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
      const feedback = await Feedback.findOrFail(params.id)
      if (!feedback) {
        return response.json({
          success: true,
          message: 'Feedback not found',
          data: null,
        })
      } else {
        feedback.merge(request.all())
        await feedback.save()
        return response.json({
          success: true,
          message: 'Feedback updated successfully',
          data: feedback,
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
      const feedback = await Feedback.find(params.id)
      if (feedback) {
        feedback.delete()
        return response.json({
          success: true,
          message: 'Successfully deleted the feedback',
          data: null,
        })
      } else {
        return response.json({
          success: false,
          message: 'Feedback does not exist',
          data: feedback,
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
