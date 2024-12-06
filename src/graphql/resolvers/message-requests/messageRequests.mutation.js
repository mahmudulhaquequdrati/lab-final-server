// Services

import { messageRequestsService } from 'src/modules/services'

export default {
  async createMessageRequest(parent, args, context) {
    return messageRequestsService.createAMessageRequest(args?.inputData, context)
  }
}
