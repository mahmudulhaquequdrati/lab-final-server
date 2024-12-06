import { RecurringOrderEntity } from 'src/modules/recurring-order/recurringOrder.entity'

export const createAnOrder = async (inputData, { user }) => {
  try {
    const newOrder = new RecurringOrderEntity({ ...inputData, user: user?._id })
    const savedOrder = await newOrder.save()
    const orderWithUser = await RecurringOrderEntity.findById(savedOrder._id).populate('user').exec()

    return orderWithUser
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateARecurringOrder = async (orderId, updateData) => {
  try {
    // Find the order by ID
    const order = await RecurringOrderEntity.findById(orderId)

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

export const deleteAnOrder = async (orderId) => {
  try {
    const deletedOrder = await RecurringOrderEntity.findByIdAndDelete(orderId)

    if (!deletedOrder) {
      throw new Error('Order not found')
    }
    return deletedOrder
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateRecurringOrderStatus = async (orderId, status, user) => {
  try {
    const updatedOrder = await RecurringOrderEntity.findOneAndUpdate(
      {
        _id: orderId,
        user: user?._id
      },
      {
        status
      },
      { new: true }
    )

    if (!updatedOrder) {
      throw new Error('Recurring order not found')
    }
    return updatedOrder
  } catch (err) {
    throw new Error(err.message)
  }
}
