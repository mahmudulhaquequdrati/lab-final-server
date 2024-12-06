import { recurringOrderHelper } from 'src/modules/helpers'

export default {
  async getAllRecurringOrders(parent, { queryData }, { user }) {
    return recurringOrderHelper.getAllRecurringOrders(queryData, user)
  },
  async getARecurringOrder(parent, args, { user }) {
    return recurringOrderHelper.getARecurringOrder(args.queryData.id, user)
  }
}
