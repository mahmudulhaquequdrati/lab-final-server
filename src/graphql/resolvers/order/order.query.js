// Services
import { orderHelper } from 'src/modules/helpers'

export default {
  async getAllOrders(parent, { queryData }, { user }) {
    return orderHelper.getAllOrders(queryData, user)
  },
  async getAnOrder(parent, args) {
    return orderHelper.getAnOrder(args.queryData.id)
  },
  async getOrdersForHistory(parent, { queryData }, { user }) {
    return orderHelper.getOrdersForHistory(queryData, user)
  }
}
