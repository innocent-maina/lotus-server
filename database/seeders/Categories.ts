import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CategoriesFactory } from 'Database/factories/CategoriesFactory'

export default class CategoriesSeeder extends BaseSeeder {
  public async run() {
    await CategoriesFactory.createMany(10)
  }
}
