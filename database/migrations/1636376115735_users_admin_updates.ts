import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Env from '@ioc:Adonis/Core/Env'

export default class UsersAdminUpdates extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.defer(async (db) => {
      const AdminUser = await db
        .query()
        .select('id')
        .from(this.tableName)
        .where('email', Env.get('ADMIN_EMAIL'))
        .firstOrFail()

      await db
        .query()
        .from(this.tableName)
        .where('id', AdminUser.id)
        .update({ name: Env.get('ADMIN_NAME'), role_id: 1, company_id: 2 })
    })
  }

  public async down() {}
}
