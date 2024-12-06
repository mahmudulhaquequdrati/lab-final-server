// Services
import { messageRequestsHelper } from 'src/modules/helpers'

export default {
  async getMessageRequests(parent, { queryData }, { user }) {
    return messageRequestsHelper.getAllMessageRequests(queryData, user._id)
  }
}
