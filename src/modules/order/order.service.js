import moment from 'moment'
import { OrderEntity } from 'src/modules/order/order.entity'
import { RecurringOrderEntity } from 'src/modules/recurring-order/recurringOrder.entity'
import mongoose from 'mongoose' // Import mongoose for session handling

const createSingleOrder = async (orderData, session) => {
  const order = new OrderEntity(orderData)
  return await order.save({ session })
}

const createReturnOrder = (inputData, destinationDetailsData, user) => ({
  ...inputData,
  user: user?._id,
  order_type: 'return',
  destinationDetailsData: {
    ...destinationDetailsData,
    pick_up_name: destinationDetailsData.drop_off_name,
    pick_up_address: destinationDetailsData.drop_off_address,
    pick_up_city: destinationDetailsData.drop_off_city,
    pick_up_country: destinationDetailsData.drop_off_country,
    pick_up_postal_code: destinationDetailsData.drop_off_postal_code,
    drop_off_name: destinationDetailsData.pick_up_name,
    drop_off_address: destinationDetailsData.drop_off_address,
    drop_off_city: destinationDetailsData.pick_up_city,
    drop_off_country: destinationDetailsData.drop_off_country,
    drop_off_postal_code: destinationDetailsData.drop_off_postal_code,
    drop_off_pick_up_date: destinationDetailsData.return_date,
    drop_off_pick_up_time: destinationDetailsData.return_approx_time
  }
})

const createWeeklyRecurringOrders = async (inputData, recurringData, savedOrder, user, recurringOrdersToInsert) => {
  const durationMap = { '1month': 1, '3months': 3, '6months': 6, '1year': 12 }
  const recurringDuration = durationMap[recurringData.ends] || 1
  const startDate = moment(recurringData.start_date)
  const endDate = startDate.clone().add(recurringDuration, 'months')

  const weekDays = recurringData.multiple_week_days.map((day) => moment().day(day).day())

  for (const currentDate = startDate.clone(); currentDate.isSameOrBefore(endDate); currentDate.add(1, 'day')) {
    if (weekDays.includes(currentDate.day())) {
      const recurringOrderData = {
        ...inputData,
        user: user?._id,
        order: savedOrder._id,
        order_type: 'normal_recurring',
        destinationDetailsData: {
          ...inputData.destinationDetailsData,
          drop_off_pick_up_date: currentDate.toDate(),
          drop_off_pick_up_time: recurringData.start_time
        }
      }
      recurringOrdersToInsert.push(recurringOrderData)

      if (recurringData.return_time) {
        const returnOrderData = {
          ...recurringOrderData,
          order_type: 'return_recurring',
          destinationDetailsData: {
            ...recurringOrderData.destinationDetailsData,
            pick_up_name: inputData.destinationDetailsData.drop_off_name,
            pick_up_address: inputData.destinationDetailsData.drop_off_address,
            pick_up_city: inputData.destinationDetailsData.drop_off_city,
            pick_up_country: inputData.destinationDetailsData.drop_off_country,
            pick_up_postal_code: inputData.destinationDetailsData.drop_off_postal_code,
            drop_off_name: inputData.destinationDetailsData.pick_up_name,
            drop_off_address: inputData.destinationDetailsData.pick_up_address,
            drop_off_city: inputData.destinationDetailsData.pick_up_city,
            drop_off_country: inputData.destinationDetailsData.pick_up_country,
            drop_off_postal_code: inputData.destinationDetailsData.pick_up_postal_code,
            drop_off_pick_up_date: currentDate.toDate(),
            drop_off_pick_up_time: recurringData.return_time
          }
        }
        recurringOrdersToInsert.push(returnOrderData)
      }
    }
  }
}

const createFreeDatesRecurringOrders = async (inputData, recurringData, savedOrder, user, recurringOrdersToInsert) => {
  for (const date of recurringData.free_dates) {
    const recurringOrderData = {
      ...inputData,
      user: user?._id,
      order: savedOrder._id,
      order_type: 'normal_recurring',
      destinationDetailsData: {
        ...inputData.destinationDetailsData,
        drop_off_pick_up_date: date,
        drop_off_pick_up_time: recurringData.free_dates_start_time
      }
    }
    recurringOrdersToInsert.push(recurringOrderData)

    if (recurringData.free_dates_return_time) {
      const returnOrderData = {
        ...recurringOrderData,
        order_type: 'return_recurring',
        destinationDetailsData: {
          ...recurringOrderData.destinationDetailsData,
          pick_up_name: inputData.destinationDetailsData.drop_off_name,
          pick_up_address: inputData.destinationDetailsData.drop_off_address,
          pick_up_city: inputData.destinationDetailsData.drop_off_city,
          pick_up_country: inputData.destinationDetailsData.drop_off_country,
          pick_up_postal_code: inputData.destinationDetailsData.drop_off_postal_code,
          drop_off_name: inputData.destinationDetailsData.pick_up_name,
          drop_off_address: inputData.destinationDetailsData.pick_up_address,
          drop_off_city: inputData.destinationDetailsData.pick_up_city,
          drop_off_country: inputData.destinationDetailsData.pick_up_country,
          drop_off_postal_code: inputData.destinationDetailsData.pick_up_postal_code,
          drop_off_pick_up_date: date,
          drop_off_pick_up_time: recurringData.free_dates_return_time
        }
      }
      recurringOrdersToInsert.push(returnOrderData)
    }
  }
}

export const createAnOrder = async (inputData, { user }) => {
  const session = await mongoose.startSession() // Start a session
  session.startTransaction() // Start the transaction

  try {
    const { transportationData, recurringData, destinationDetailsData } = inputData
    let savedOrder
    const recurringOrdersToInsert = []

    if (transportationData.type_of_transport !== 'recurring') {
      // Create a single non-recurring order
      savedOrder = await createSingleOrder({ ...inputData, user: user?._id }, session)

      // Create a return order if return_date is present
      if (destinationDetailsData.return_date) {
        const returnOrderData = createReturnOrder(inputData, destinationDetailsData, user)
        await createSingleOrder(returnOrderData, session)
      }
    } else if (recurringData) {
      // Create the main recurring order
      const mainOrderData = {
        ...inputData,
        user: user?._id,
        order_type: 'recurring',
        destinationDetailsData: {
          ...inputData.destinationDetailsData,
          drop_off_pick_up_date:
            recurringData.recurring_type === 'week' ? recurringData.start_date : recurringData.free_dates[0],
          drop_off_pick_up_time:
            recurringData.recurring_type === 'week' ? recurringData.start_time : recurringData.free_dates_start_time
        }
      }
      savedOrder = await createSingleOrder(mainOrderData, session)

      if (recurringData.recurring_type === 'week') {
        await createWeeklyRecurringOrders(inputData, recurringData, savedOrder, user, recurringOrdersToInsert)
      } else if (recurringData.recurring_type === 'free') {
        await createFreeDatesRecurringOrders(inputData, recurringData, savedOrder, user, recurringOrdersToInsert)
      }

      // Insert all recurring orders in bulk
      if (recurringOrdersToInsert.length > 0) {
        await RecurringOrderEntity.insertMany(recurringOrdersToInsert, { session })
      }
    }

    await session.commitTransaction() // Commit the transaction
    return savedOrder
  } catch (err) {
    await session.abortTransaction() // Abort the transaction on error
    throw new Error(err.message)
  } finally {
    session.endSession() // End the session
  }
}

export const updateAnOrder = async (orderId, updateData) => {
  try {
    // Find the order by ID
    const order = await OrderEntity.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    // Update the order with new data
    Object.assign(order, updateData)

    // Save the updated order
    const updatedOrder = await order.save()

    return updatedOrder
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}

export const updateOrderStatus = async (orderId, { status, pauseDate }) => {
  try {
    const order = await OrderEntity.findById(orderId)

    if (!order) {
      throw new Error('Order not found')
    }

    if (order.transportationData.type_of_transport === 'recurring' && pauseDate) {
      if (status === 'paused') {
        const recurringOrders = await RecurringOrderEntity.find({
          order: orderId,
          status: { $eq: 'pending' }
        })

        const pauseMoment = moment(pauseDate)

        for (const recurringOrder of recurringOrders) {
          const dropOffDate = moment(recurringOrder.destinationDetailsData.drop_off_pick_up_date)

          if (dropOffDate.isSameOrAfter(pauseMoment)) {
            if (recurringOrder.status === 'pending') {
              await RecurringOrderEntity.findByIdAndUpdate(recurringOrder._id, { status: 'paused' }, { new: true })
            }
          }
        }
        return order
      } else if (status === 'pending') {
        const recurringOrders = await RecurringOrderEntity.find({
          order: orderId,
          status: { $eq: 'paused' }
        })

        const pauseMoment = moment(pauseDate)

        for (const recurringOrder of recurringOrders) {
          const dropOffDate = moment(recurringOrder.destinationDetailsData.drop_off_pick_up_date)

          if (dropOffDate.isSameOrAfter(pauseMoment)) {
            if (recurringOrder.status !== 'paused') {
              await RecurringOrderEntity.findByIdAndUpdate(recurringOrder._id, { status: 'pending' }, { new: true })
            }
          }
        }
        return order
      }
    } else if (order.transportationData.type_of_transport === 'recurring' && !pauseDate && status !== 'deleted') {
      if (status === 'paused') {
        const recurringOrders = await RecurringOrderEntity.find({
          order: orderId,
          status: { $eq: 'pending' }
        })

        for (const recurringOrder of recurringOrders) {
          if (recurringOrder.status === 'pending') {
            await RecurringOrderEntity.findByIdAndUpdate(recurringOrder._id, { status: 'paused' }, { new: true })
          }
        }
        return order
      } else if (status === 'pending') {
        const recurringOrders = await RecurringOrderEntity.find({
          order: orderId,
          status: { $eq: 'paused' }
        })

        for (const recurringOrder of recurringOrders) {
          if (recurringOrder.status !== 'paused') {
            await RecurringOrderEntity.findByIdAndUpdate(recurringOrder._id, { status: 'pending' }, { new: true })
          }
        }
        return order
      }
    } else if (order.transportationData.type_of_transport === 'recurring' && !pauseDate && status === 'deleted') {
      const recurringOrders = await RecurringOrderEntity.find({
        order: orderId,
        status: { $in: ['confirmed', 'on_ride', 'paused', 'completed', 'rejected', 'deleted'] }
      })
      if (recurringOrders.length > 0) {
        throw new Error(
          `Cannot delete the order with ID: ${orderId}. Please ensure that the order exists and is not already processed.`
        )
      } else {
        await RecurringOrderEntity.updateMany({ order: orderId }, { status: 'deleted' })
      }
      return order
    } else {
      const updatedOrder = await OrderEntity.findByIdAndUpdate(orderId, { status }, { new: true })
      return updatedOrder
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
