import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import User from './User'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public link: string

  @column()
  public categoryId: number

  @column()
  public createdBy: number

  @column()
  public updatedBy: number

  @column()
  public active: boolean

  @belongsTo(() => Category, {
    localKey: 'id',
  })
  public category: BelongsTo<typeof Category>

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
