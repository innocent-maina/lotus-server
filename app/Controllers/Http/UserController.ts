import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { rules, schema } from '@ioc:Adonis/Core/Validator'

import User from 'App/Models/User'

export default class UserController {
  public async update({ params, request, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      if (!user) {
        return response.json({
          success: true,
          message: 'User not found',
          data: null,
        })
      } else {
        user.merge(request.all())
        await user.save()
        return response.json({
          success: true,
          message: 'User updated successfully',
          data: user,
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
      const user = await User.find(params.id)
      if (user) {
        user.delete()
        return response.json({
          success: true,
          message: 'Successfully deleted the user',
          data: null,
        })
      } else {
        return response.json({
          success: false,
          message: 'User does not exist',
          data: user,
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
