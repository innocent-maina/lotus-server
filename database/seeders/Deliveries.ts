import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { DeliveriesFactory } from 'Database/factories/DeliveriesFactory'

export default class DeliveriesSeeder extends BaseSeeder {
  public async run() {
    await DeliveriesFactory.with('user', 5).with('order', 5).createMany(10)
  }
}
