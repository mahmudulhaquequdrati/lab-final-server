import { MessageRequestsEntity } from 'src/modules/message-requests/messageRequests.entity'

export const createAMessageRequest = async (inputData, { user }) => {
  try {
    const newMessageRequest = new MessageRequestsEntity({ ...inputData, user: user?._id })
    const savedMessageRequest = await newMessageRequest.save()
    const messageRequestWithUser = await MessageRequestsEntity.findById(savedMessageRequest._id).populate('user').exec()
    return messageRequestWithUser
  } catch (error) {
    throw new Error(error)
  }
}
