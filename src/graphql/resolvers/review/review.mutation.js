import { reviewService } from 'src/modules/services'

export default {
  async createReview(parent, { inputData }, { user }) {
    return reviewService.createReview(inputData, user._id)
    // return reviewHelper.createReview(reviewData, user._id)
  }
}
