// Services
import { userHelper } from 'src/modules/helpers'

export default {
  async getAnUser(parent, args, { user }) {
    return userHelper.getAnUser(user._id)
  }
}
