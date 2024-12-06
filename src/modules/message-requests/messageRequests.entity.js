import mongoose from 'mongoose'

export const MessageRequestsEntity = mongoose.model(
  'MessageRequests',
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['pending', 'resolved'],
        default: 'pending'
      },
      file: {
        type: String,
        default: ''
      },
      order_number: {
        type: String,
        default: ''
      }
    },
    {
      timestamps: true
    }
  )
)
