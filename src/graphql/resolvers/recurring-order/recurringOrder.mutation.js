import { recurringOrderService } from 'src/modules/services'

export default {
  async updateARecurringOrder(parent, args) {
    return recurringOrderService.updateARecurringOrder(args.queryData.id, args.inputData)
  },
  async updateRecurringOrderStatus(parent, args, { user }) {
    return recurringOrderService.updateRecurringOrderStatus(args.queryData.id, args.inputData.status, user)
  }
}
