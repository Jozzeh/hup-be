import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new ForbiddenException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ForbiddenException extends Exception {
  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(403).send({
      errors: [
        {
          message: error.message,
          code: 'E_ROLE_NOT_AUTHORISED',
        },
      ],
    })
  }
}
