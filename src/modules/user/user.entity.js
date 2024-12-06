import mongoose from 'mongoose'

export const UserEntity = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      first_name: {
        type: String,
        required: true,
        default: null
      },
      last_name: {
        type: String,
        required: true,
        default: null
      },
      email: {
        type: String,
        required: true,
        default: null
      },
      phone: {
        type: String,
        required: true,
        default: null
      },
      address: {
        type: String,
        required: true,
        default: null
      },
      billing_address: {
        type: String,
        required: false,
        default: null
      },
      code: {
        type: String,
        required: true,
        default: null
      },
      place: {
        type: String,
        required: true,
        default: null
      },
      internal_cost_center: {
        type: String,
        required: false,
        default: null
      },
      password: {
        type: String,
        required: true,
        default: null
      },
      profile_image: {
        type: String,
        required: false,
        default: ''
      },
      is_verified: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    {
      timestamps: true
    }
  )
)
