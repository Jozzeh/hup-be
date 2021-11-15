import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ForbiddenException from 'App/Exceptions/ForbiddenException'
import Role from 'App/Models/Role'

export default class Roles {
  public async authorize(user, validRoles) {
    const allRoles = await Role.all()
    for (let i = 0; i < allRoles.length; i++) {
      if (user?.roleId === allRoles[i].id && validRoles?.indexOf(allRoles[i].name) !== -1) {
        return true
      }
    }

    const errormessage = 'User is forbidden to do this action'
    throw new ForbiddenException(errormessage)
  }

  public async handle(
    { auth }: HttpContextContract,
    next: () => Promise<void>,
    validRoles: string[]
  ) {
    const user = auth.use('api').user
    await this.authorize(user, validRoles)
    await next()
  }
}
