import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Categories from '../../Models/Categories'
// import User from 'App/Models/User'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    try {
      const categories = await Categories.query().select('*').from('categories')
      return response.json({
        success: true,
        message: 'categories retrieved successfully',
        data: categories,
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
      const categories = await Categories.find(params.id)
      if (categories) {
        return response.json({
          success: true,
          message: 'Categories found',
          data: categories,
        })
      } else {
        return response.json({
          success: true,
          message: 'Categories not found',
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
      const categories = await Categories.create(data)
      return response.json({
        success: true,
        message: 'Categories created successfully',
        data: categories,
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
      const categories = await Categories.findOrFail(params.id)
      if (!categories) {
        return response.json({
          success: true,
          message: 'Categories not found',
          data: null,
        })
      } else {
        categories.merge(request.all())

        await categories.save()
        return response.json({
          success: true,
          message: 'Categories updated successfully',
          data: categories,
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
      const categories = await Categories.find(params.id)
      if (categories) {
        categories.delete()
        return response.json({
          success: true,
          message: 'Successfully deleted the categories',
          data: null,
        })
      } else {
        return response.json({
          success: false,
          message: 'Categories does not exist',
          data: categories,
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
