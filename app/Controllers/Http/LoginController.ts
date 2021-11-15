import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import { cuid } from '@ioc:Adonis/Core/Helpers'

import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Login/LoginValidator'
import ResetValidator from 'App/Validators/Login/ResetValidator'
import ForgotValidator from 'App/Validators/Login/ForgotValidator'

export default class LoginController {
  public async forgotPassword({ request, response }: HttpContextContract) {
    const req = await request.validate(ForgotValidator)
    const user = await User.query().where('email', req.email).first()
    if (user) {
      user.oneTimeKey = cuid()
      await user.save()

      // hier mail verzenden
    }

    return response.noContent()
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const req = await request.validate(ResetValidator)
    const user = await User.query().where('one_time_key', req.one_time_key).firstOrFail()
    user.password = req.password
    user.oneTimeKey = ''
    await user.save()

    return response.noContent()
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const req = await request.validate(LoginValidator)
    const email = req.email
    const password = req.password
    const rememberme = req.rememberme

    // Lookup user manually
    const user = await User.query().where('email', email).andWhere('active', true).firstOrFail()

    // Verify password
    if (user.password !== '') {
      if (!(await Hash.verify(user.password, password))) {
        return response.badRequest({
          messages: [
            {
              message: 'Invalid credentials',
              stack: 'LoginController',
              code: 'E_INVALID_CREDENTIALS',
            },
          ],
        })
      }
    } else {
      return response.badRequest({
        messages: [
          {
            message: 'Invalid credentials',
            stack: 'LoginController',
            code: 'E_INVALID_CREDENTIALS',
          },
        ],
      })
    }

    // Generate token
    if (rememberme === 1) {
      const token = await auth.use('api').generate(user)
      return token
    } else {
      const token = await auth.use('api').generate(user, {
        expiresIn: '1days',
      })
      return token
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.noContent()
  }
}
