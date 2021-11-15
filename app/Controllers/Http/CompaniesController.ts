import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Company from 'App/Models/Company'
import InsertAndUpdateValidator from 'App/Validators/Companies/InsertAndUpdateValidator'

export default class CompaniesController {
  public async index() {
    const companies = await Company.all()
    return companies
  }

  public async single({ request }: HttpContextContract) {
    const id = request.params().id
    const company = await Company.findOrFail(id)
    await company.load('users')
    return company
  }

  public async insert({ request }: HttpContextContract) {
    const req = await request.validate(InsertAndUpdateValidator)

    const company = new Company()
    company.name = req.name
    await company.save()
    return company
  }

  public async update({ request }: HttpContextContract) {
    const id = request.params().id
    const req = await request.validate(InsertAndUpdateValidator)

    const company = await Company.findOrFail(id)
    company.name = req.name
    await company.save()
    return company
  }
}
