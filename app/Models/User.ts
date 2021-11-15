import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  BelongsTo,
  belongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Company from './Company'
import Category from './Category'
import Link from './Link'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column({ serializeAs: null })
  public oneTimeKey: string

  @column()
  public roleId: number

  @column()
  public companyId: number

  @column()
  public active: boolean

  @belongsTo(() => Role, {
    localKey: 'id',
  })
  public role: BelongsTo<typeof Role>

  @belongsTo(() => Company, {
    localKey: 'id',
  })
  public company: BelongsTo<typeof Company>

  @hasMany(() => Category, {
    foreignKey: 'createdBy',
  })
  public categories: HasMany<typeof Category>

  @hasMany(() => Link, {
    foreignKey: 'createdBy',
  })
  public links: HasMany<typeof Link>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
