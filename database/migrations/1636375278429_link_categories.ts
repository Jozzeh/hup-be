import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class LinkCategories extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.integer('company_id').unsigned().references('id').inTable('companies').notNullable()
      table.integer('created_by').unsigned().references('id').inTable('users').notNullable()
      table.integer('updated_by').unsigned().references('id').inTable('users').notNullable()
      table.boolean('active').defaultTo(true)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
