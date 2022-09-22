import Factory from '@ioc:Adonis/Lucid/Factory'
import WorkLog from 'App/Models/WorkLog'
import { UserFactory } from './UserFactory'

export const WorkLogFactory = Factory.define(WorkLog, ({ faker }) => {
  return {
    date: faker.date.recent(),
    day: faker.date.weekday(),
    userId: faker.datatype.number(),
    description: faker.commerce.productDescription(),
    hours: faker.datatype.number({
      min: 0,
      max: 12,
    }),
    approval: faker.datatype.boolean(),
  }
})
  .relation('user', () => UserFactory)
  .build()
