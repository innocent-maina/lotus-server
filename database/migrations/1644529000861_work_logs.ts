import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class WorkLogs extends BaseSchema {
  protected tableName = 'work_logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE')
      table.string('user_email')
      table.string('description')
      table.date('date')
      table.string('day')
      table.integer('hours')
      table.boolean('approval')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
