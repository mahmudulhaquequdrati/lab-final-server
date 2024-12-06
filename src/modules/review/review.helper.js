import { ReviewEntity } from 'src/modules/review/review.entity'

export const getAReviewFromOrder = async (queryData, userId) => {
  try {
    const review = await ReviewEntity.findOne({
      orderId: queryData.id,
      user: userId
    })
      .populate('user')
      .exec()
    return review
  } catch (err) {
    throw new Error(err.message)
  }
}
