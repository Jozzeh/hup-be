import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from 'App/Models/Category'
import InsertAndUpdateValidator from 'App/Validators/Categories/InsertAndUpdateValidator'

export default class CategoriesController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.use('api').user
    await user?.load('role')
    let categories
    if (user) {
      if (user?.role.name === 'Admin') {
        categories = await Category.all()
      } else {
        categories = await Category.query().where('company_id', user?.companyId)
      }
    }
    return categories
  }

  public async single({ request, auth }: HttpContextContract) {
    const user = auth.use('api').user
    await user?.load('role')

    let category = new Category()
    if (user) {
      if (user?.role.name === 'Admin') {
        category = await Category.query()
          .where('id', request.params().id)
          .preload('links')
          .preload('creator')
          .preload('editor')
          .preload('company')
          .firstOrFail()
      } else {
        category = await Category.query()
          .where('company_id', user?.companyId)
          .where('id', request.params().id)
          .preload('links')
          .preload('creator')
          .preload('editor')
          .preload('company')
          .firstOrFail()
      }
    }
    return category
  }

  public async insert({ request, auth }: HttpContextContract) {
    const req = await request.validate(InsertAndUpdateValidator)
    const user = auth.use('api').user
    await user?.load('role')

    const category = new Category()
    category.name = req.name
    if (user) {
      if (user?.role.name === 'Admin') {
        category.companyId = req.company_id ? req.company_id : user?.companyId
      } else {
        category.companyId = user.companyId
      }
      category.createdBy = user.id
      category.updatedBy = user.id
    }
    if (req.active) {
      category.active = req.active
    }
    await category.save()

    return category
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const req = await request.validate(InsertAndUpdateValidator)
    const user = auth.use('api').user
    await user?.load('role')

    let category = new Category()
    if (user) {
      if (user.role.name === 'Admin') {
        category = await Category.query()
          .where('id', request.params().id)
          .andWhere('company_id', req.company_id ? req.company_id : user?.companyId)
          .firstOrFail()
      } else {
        // non admins can only update the categories owned by their company
        category = await Category.query()
          .where('id', request.params().id)
          .andWhere('company_id', user?.companyId)
          .firstOrFail()
      }

      category.name = req.name
      category.updatedBy = user.id
      if (req.active) {
        category.active = req.active
      }
      await category.save()
      return category
    }
    return response.badRequest({ errors: [{ message: 'Category not found' }] })
  }

  public async delete({ request, auth, response }: HttpContextContract) {
    const user = auth.use('api').user
    await user?.load('role')

    let category = new Category()
    if (user) {
      if (user?.role.name === 'Admin') {
        category = await Category.query()
          .where('id', request.params().id)
          .preload('links')
          .firstOrFail()
      } else {
        category = await Category.query()
          .where('company_id', user?.companyId)
          .where('id', request.params().id)
          .preload('links')
          .firstOrFail()
      }
      category.active = false
      category.updatedBy = user?.id
      category.save()
    }
    return response.noContent()
  }
}
