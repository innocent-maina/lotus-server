import Factory from '@ioc:Adonis/Lucid/Factory'
import Deliveries from 'App/Models/Deliveries'
import { UserFactory } from './UserFactory'
import { OrderFactory } from './OrderFactory'

export const DeliveriesFactory = Factory.define(Deliveries, ({ faker }) => {
  return {
    userId: faker.datatype.number(),
    orderId: faker.datatype.number(),
    paymentStatus: faker.datatype.boolean(),
    dispatchStatus: faker.datatype.boolean(),
    deliveryStatus: faker.datatype.boolean(),
  }
})
  .relation('user', () => UserFactory)
  .relation('order', () => OrderFactory)
  .build()
