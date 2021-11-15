import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Link from 'App/Models/Link'
import InsertValidator from 'App/Validators/Link/InsertValidator'

export default class LinksController {
  public async index({ request, auth, response }: HttpContextContract) {
    const categoryId = request.params().catid
    const user = auth.use('api').user
    await user?.load('role')

    let links
    if (user) {
      if (user?.role.name === 'Admin') {
        links = await Link.query().where('category_id', categoryId)
      } else {
        links = await Link.query()
          .where('category_id', categoryId)
          .with('category', (category) => {
            category.where('company_id', user.companyId)
          })
      }
    }

    if (links) {
      return links
    }
    response.forbidden({ errors: [{ message: 'Links and category not found' }] })
  }

  public async single({ request, auth, response }: HttpContextContract) {
    const id = request.params().id
    const categoryId = request.params().catid
    const user = auth.use('api').user
    await user?.load('role')

    let link
    if (user) {
      if (user?.role.name === 'Admin') {
        link = await Link.query().where('category_id', categoryId).where('id', id).firstOrFail()
      } else {
        link = await Link.query()
          .where('category_id', categoryId)
          .andWhere('id', id)
          .with('category', (category) => {
            category.where('company_id', user.companyId)
          })
          .firstOrFail()
      }
    }
    if (link) {
      return link
    }
    response.forbidden({ errors: [{ message: 'Links and category not found' }] })
  }

  public async insert({ request, auth, response }: HttpContextContract) {
    const req = await request.validate(InsertValidator)
    const categoryId = request.params().catid
    const user = auth.use('api').user
    await user?.load('role')

    if (categoryId && user) {
      let category = new Category()
      if (user?.role.name !== 'Admin') {
        category = await Category.query()
          .where('id', categoryId)
          .andWhere('company_id', user.companyId)
          .firstOrFail()
      }
      console.log(category)
      const link = new Link()
      link.name = req.name
      link.link = req.link
      link.categoryId = categoryId
      if (user) {
        link.createdBy = user.id
        link.updatedBy = user.id
      }
      if (req.active) {
        link.active = req.active
      }
      await link.save()

      return link
    } else {
      return response.badRequest()
    }
  }

  public async update({ request, auth }: HttpContextContract) {
    const req = await request.validate(InsertValidator)
    const categoryId = request.params().catid
    const id = request.params().id
    const user = auth.use('api').user
    await user?.load('role')

    let link = new Link()
    if (user) {
      if (user.role.name === 'Admin') {
        link = await Link.query().where('id', id).firstOrFail()
      } else {
        link = await Link.query()
          .where('id', id)
          .with('category', (category) => {
            category.where('company_id', user.companyId)
          })
          .firstOrFail()
      }
      link.name = req.name
      link.link = req.link
      link.categoryId = categoryId
      if (user) {
        link.updatedBy = user.id
      }
      if (req.active) {
        link.active = req.active
      }
      await link.save()
    }
    return link
  }

  public async delete({ request, auth, response }: HttpContextContract) {
    const categoryId = request.params().catid
    const id = request.params().id
    const user = auth.use('api').user
    await user?.load('role')

    let link = new Link()
    if (user) {
      if (user?.role.name === 'Admin') {
        link = await Link.query().where('id', id).firstOrFail()
      } else {
        if (parseInt(categoryId) === user.companyId) {
          link = await Link.query()
            .where('id', id)
            .andWhere('company_id', user.companyId)
            .firstOrFail()
        } else {
          response.badRequest({ errors: [{ message: 'Category not found' }] })
        }
      }
      link.active = false
      await link.save()
    }
    return response.noContent()
  }
}
