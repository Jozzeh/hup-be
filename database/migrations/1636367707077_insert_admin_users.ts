import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Env from '@ioc:Adonis/Core/Env'
import Hash from '@ioc:Adonis/Core/Hash'

export default class InsertAdminUsers extends BaseSchema {
  public async up() {
    const password = await Hash.make(Env.get('ADMIN_PASSWORD'))

    this.defer(async (db) => {
      await db.table('users').insert({
        email: Env.get('ADMIN_EMAIL'),
        password: password,
        created_at: this.now(),
        updated_at: this.now(),
      })
    })
  }

  public async down() {}
}
