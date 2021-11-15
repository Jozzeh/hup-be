import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255)
    })

    this.defer(async (db) => {
      const roles = ['Admin', 'User']
      await Promise.all(
        roles.map((element) => {
          return db.table('roles').insert({
            name: element,
          })
        })
      )
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
