import Factory from '@ioc:Adonis/Lucid/Factory'
import Feedback from 'App/Models/Feedback'
import { UserFactory } from './UserFactory'
import { ProductFactory } from './ProductFactory'

export const FeedbackFactory = Factory.define(Feedback, ({ faker }) => {
  return {
    // product_id: faker.datatype.number(),
    date: faker.date.recent(),
    // userId: faker.datatype.number(),
    description: faker.commerce.productDescription(),
    rate: faker.datatype.number({
      min: 1,
      max: 5,
    }),
  }
})
  .relation('user', () => UserFactory)
  .relation('product', () => ProductFactory)
  .build()
