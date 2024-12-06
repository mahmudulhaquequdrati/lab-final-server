import { reviewHelper } from 'src/modules/helpers'

export default {
  async getAReviewFromOrder(parent, { queryData }, { user }) {
    return reviewHelper.getAReviewFromOrder(queryData, user._id)
    // return reviewHelper.getAReview(reviewId, user._id)
  }
}
