import Factory from '@ioc:Adonis/Lucid/Factory'
import Order from 'App/Models/Order'
import { UserFactory } from './UserFactory'
import { ProductFactory } from './ProductFactory'

export const OrderFactory = Factory.define(Order, ({ faker }) => {
  return {
    cost: faker.datatype.number(),
    quantity: faker.datatype.number({
      min: 0,
      max: 100,
    }),
    paymentStatus: faker.datatype.boolean(),
    dispatchStatus: faker.datatype.boolean(),
    deliveryStatus: faker.datatype.boolean(),
  }
})
  .relation('user', () => UserFactory)
  .relation('seller', () => UserFactory)
  .relation('product', () => ProductFactory)
  .build()
