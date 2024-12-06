// Services
import { orderService } from 'src/modules/services'

export default {
  async createAnOrder(parent, args, context) {
    return orderService.createAnOrder(args?.inputData, context)
  },
  async updateAnOrder(parent, args) {
    return orderService.updateAnOrder(args.queryData.id, args.inputData)
  },
  async updateOrderStatus(parent, args) {
    return orderService.updateOrderStatus(args.queryData.id, args.inputData)
  }
}
