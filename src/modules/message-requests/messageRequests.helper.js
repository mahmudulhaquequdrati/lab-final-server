import { ITEMS_PER_PAGE } from 'src/utils/constants'
import { MessageRequestsEntity } from 'src/modules/message-requests/messageRequests.entity'

export const getAllMessageRequests = async (queryData, user) => {
  const { page = 1 } = queryData

  try {
    const query = {
      user: user?._id
    }
    const messageRequests = await MessageRequestsEntity.find(query)
      .populate('user')
      .sort({
        createdAt: -1
      })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .exec()
    const totalMessageRequests = await MessageRequestsEntity.countDocuments(query)

    return {
      data: messageRequests,
      total: totalMessageRequests,
      currentPage: page,
      totalPages: Math.ceil(totalMessageRequests / ITEMS_PER_PAGE)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
