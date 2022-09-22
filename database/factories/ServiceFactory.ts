import Factory from '@ioc:Adonis/Lucid/Factory'
import Service from 'App/Models/Service'
import { UserFactory } from './UserFactory'

export const ServiceFactory = Factory.define(Service, ({ faker }) => {
  return {
    // category: faker.random.arrayElement(['Software Update', 'Service Request', 'Maintenance']),
    category: 'Software Update',
    description: faker.commerce.productDescription(),
    userId: faker.datatype.number(),
    date: faker.date.recent(),
    completed: faker.datatype.boolean(),
  }
})
  .relation('user', () => UserFactory)
  .build()
