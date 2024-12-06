// Services
import { userService } from 'src/modules/services'

export default {
  async registerAnUser(parent, args, context) {
    return userService.registerAnUser(args?.inputData, context)
  },
  async loginAnUser(parent, args, context) {
    return userService.loginAnUser(args?.inputData, context)
  },
  async updateAnUser(parent, { inputData }, { user }) {
    return userService.updateAnUser(inputData, user)
  },
  async updateUserPassword(parent, { inputData }, { user }) {
    return userService.updateUserPassword(inputData, user)
  }
}
