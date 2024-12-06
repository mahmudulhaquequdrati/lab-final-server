import { RecurringOrderEntity } from 'src/modules/recurring-order/recurringOrder.entity'
import { ITEMS_PER_PAGE } from 'src/utils/constants'

export const getAllRecurringOrders = async (queryData, user) => {
  const { date, filter_by, search_keyword, page = 1, orderId, sort_by, sort_order } = queryData

  try {
    const query = {
      user: user?._id,
      order: orderId
    }

    if (date) {
      query['destinationDetailsData.drop_off_pick_up_date'] = { $eq: new Date(date) }
    }

    if (filter_by && filter_by !== 'all_order') {
      query['transportationData.type_of_transport'] = filter_by
    }

    if (search_keyword) {
      const regex = new RegExp(search_keyword, 'i') // case-insensitive search
      query.$or = [
        { 'transportationData.type_of_transport': regex },
        { 'transportationData.mode_of_transportation': regex },
        { 'transportationData.transport_with': regex },
        { 'patientData.name': regex },
        { 'patientData.surname': regex },
        { 'patientData.area_room': regex },
        { 'patientData.cost_center': regex },
        { 'destinationDetailsData.pick_up_name': regex },
        { 'destinationDetailsData.pick_up_address': regex },
        { 'destinationDetailsData.drop_off_name': regex },
        { 'destinationDetailsData.drop_off_address': regex },
        { 'billingDetailsData.name': regex },
        { 'billingDetailsData.street': regex },
        { 'billingDetailsData.place': regex },
        { 'billingDetailsData.contact': regex }
      ]
    }

    const sort = {}
    if (sort_by) {
      sort[sort_by] = sort_order === 'desc' ? -1 : 1
    }

    const recurringOrders = await RecurringOrderEntity.find(query)
      .populate('user')
      .sort(sort)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .exec()
    const totalOrders = await RecurringOrderEntity.countDocuments(query)

    return {
      data: recurringOrders,
      total: totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / ITEMS_PER_PAGE)
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getARecurringOrder = async (orderId, user) => {
  try {
    const order = await RecurringOrderEntity.findOne({
      _id: orderId,
      user: user?._id
    })
      .populate('user')
      .exec()

    if (!order) {
      throw new Error('Recurring Order not found')
    }

    // Return the found order
    return order
  } catch (err) {
    throw new Error(err.message)
  }
}
