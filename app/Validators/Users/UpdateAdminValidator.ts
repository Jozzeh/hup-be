import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateAdminValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string.optional({ trim: true }, [rules.email()]),
    role_id: schema.number([rules.exists({ table: 'roles', column: 'id' })]),
    company_id: schema.number([rules.exists({ table: 'companies', column: 'id' })]),
    active: schema.boolean(),
  })

  public messages = {}
}
