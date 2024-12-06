import mongoose from 'mongoose'

export const ReviewEntity = mongoose.model(
  'Review',
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      review_message: {
        type: String,
        required: true
      },
      orderId: {
        type: String,
        default: ''
      }
    },
    {
      timestamps: true
    }
  )
)
