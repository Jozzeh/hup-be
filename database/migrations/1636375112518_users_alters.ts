import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersAlters extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable('users', (table) => {
      table.string('name').notNullable().defaultTo('')
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .notNullable()
        .defaultTo(2)
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .notNullable()
        .defaultTo(1)
      table.string('one_time_key')
      table.boolean('active').defaultTo(true)
    })
  }

  public async down() {}
}
