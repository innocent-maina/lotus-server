import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Deliveries extends BaseSchema {
  protected tableName = 'deliveries'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.boolean('payment_status')
      table.boolean('dispatch_status')
      table.boolean('delivery_status')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
