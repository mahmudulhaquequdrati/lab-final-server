import { OrderEntity } from 'src/modules/order/order.entity'
import { ReviewEntity } from 'src/modules/review/review.entity'

export const createReview = async (reviewData, userId) => {
  try {
    const review = await ReviewEntity.create({
      ...reviewData,
      user: userId
    })

    await OrderEntity.findByIdAndUpdate(reviewData.orderId, { isReviewGiven: true }, { new: true }).exec()

    return review
  } catch (err) {
    throw new Error(err.message)
  }
}
