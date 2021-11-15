import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Links extends BaseSchema {
  protected tableName = 'links'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('link').notNullable()
      table.integer('category_id').unsigned().references('id').inTable('categories').notNullable()
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
