import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Company from './Company'
import User from './User'
import Link from './Link'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public companyId: number

  @column()
  public createdBy: number

  @column()
  public updatedBy: number

  @column()
  public active: boolean

  @belongsTo(() => Company, {
    localKey: 'id',
    foreignKey: 'companyId',
  })
  public company: BelongsTo<typeof Company>

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'createdBy',
  })
  public creator: BelongsTo<typeof User>

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'updatedBy',
  })
  public editor: BelongsTo<typeof User>

  @hasMany(() => Link, {
    foreignKey: 'categoryId',
  })
  public links: HasMany<typeof Link>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
