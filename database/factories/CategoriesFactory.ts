import Factory from '@ioc:Adonis/Lucid/Factory'
import Categories from 'App/Models/Categories'

export const CategoriesFactory = Factory.define(Categories, ({ faker }) => {
  return {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  }
}).build()
