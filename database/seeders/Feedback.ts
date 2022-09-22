import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { FeedbackFactory } from 'Database/factories/FeedbackFactory'

export default class FeedbackSeeder extends BaseSeeder {
  public async run() {
    await FeedbackFactory.with('user', 5).with('product', 5).createMany(10)
  }
}
