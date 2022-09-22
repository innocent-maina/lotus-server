import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Order from 'App/Models/Order'
import User from 'App/Models/User'

export default class Deliveries extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public orderId: number

  @column()
  public userId: number

  @column()
  public paymentStatus: boolean

  @column()
  public dispatchStatus: boolean

  @column()
  public deliveryStatus: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Order)
  public order: BelongsTo<typeof Order>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
