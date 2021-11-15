import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { cuid } from '@ioc:Adonis/Core/Helpers'

import User from 'App/Models/User'
import InsertValidator from 'App/Validators/Users/InsertValidator'
import UpdateAdminValidator from 'App/Validators/Users/UpdateAdminValidator'
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator'

export default class UsersController {
  public async index() {
    const users = User.all()
    return users
  }

  public async single({ request }: HttpContextContract) {
    const user = await User.query()
      .preload('role')
      .preload('company')
      .where('id', request.params().id)
      .firstOrFail()
    return user
  }

  public async insert({ request }: HttpContextContract) {
    const req = await request.validate(InsertValidator)

    const user = new User()
    user.email = req.email
    user.companyId = req.company_id
    user.name = req.name
    user.oneTimeKey = cuid()
    if (req.role_id) {
      user.roleId = req.role_id
    }

    await user.save()
    // hier zou een mail verstuurd worden

    return user
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const authUser = await auth.use('api').user
    await authUser?.load('role')
    if (authUser) {
      if (authUser?.role.name === 'Admin') {
        const req = await request.validate(UpdateAdminValidator)
        const user = await User.findOrFail(request.params().id)
        user.name = req.name
        user.roleId = req.role_id
        user.companyId = req.company_id
        user.active = req.active
        if (req.email) {
          user.email = req.email
        }
        await user.save()
        return user
      } else {
        const req = await request.validate(UpdateUserValidator)
        const user = await User.findOrFail(authUser.id)
        user.name = req.name
        user.active = req.active
        await user.save()
        return user
      }
    }

    response.badRequest({
      errors: [{ message: 'User id is required in path.' }],
    })
  }

  public async delete({ request, response }: HttpContextContract) {
    if (request.params().id) {
      const user = await User.query().where('id', request.params().id).firstOrFail()
      user.active = false
      user.save()

      return response.noContent()
    } else {
      response.badRequest({
        errors: [{ message: 'User id is required in path.' }],
      })
    }
  }

  public async profile({ auth }: HttpContextContract) {
    const user = await auth.use('api').user
    await user?.load('role')
    await user?.load('company')
    return user
  }
}
