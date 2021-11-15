import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    one_time_key: schema.string({}, [rules.minLength(12)]),
    password: schema.string(),
  })

  public messages = {}
}
