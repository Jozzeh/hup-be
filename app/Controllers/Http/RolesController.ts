// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Role from 'App/Models/Role'

export default class RolesController {
  public async index() {
    const roles = await Role.all()
    return roles
  }
}
