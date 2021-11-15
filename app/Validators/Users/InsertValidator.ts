import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InsertValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    role_id: schema.number.optional([rules.exists({ table: 'roles', column: 'id' })]),
    company_id: schema.number([rules.exists({ table: 'companies', column: 'id' })]),
    name: schema.string(),
  })

  public messages = {}
}
