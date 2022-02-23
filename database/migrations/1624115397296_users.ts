import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name')
      table.string('username')
      table.string('email', 255).notNullable()
      table.string('password', 180)
      table.string('remember_me_token').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
