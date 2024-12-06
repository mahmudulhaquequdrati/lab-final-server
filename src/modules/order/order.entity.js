import mongoose from 'mongoose'

const transportationSchema = new mongoose.Schema({
  type_of_transport: { type: String, default: '' },
  mode_of_transportation: { type: String, default: '' },
  transport_with: { type: [String], default: [] },
  oxygen_quantity: { type: Number, default: null }
})

const recurringSchema = new mongoose.Schema({
  start_date: { type: Date, default: '' },
  return_date: { type: Date, default: '' },
  start_time: { type: String, default: '' },
  return_time: { type: String, default: '' },
  recurring_type: { type: String, enum: ['week', 'free'] },
  multiple_week_days: { type: [String], default: [] },
  free_dates_start_time: { type: String, default: '' },
  free_dates_return_time: { type: String, default: '' },
  free_dates: { type: [Date], default: [] },
  ends: { type: String, default: '' }
})

const patientSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  surname: { type: String, default: '' },
  date_of_birth: { type: Date, default: null },
  area_room: { type: String, default: '' },
  cost_center: { type: String, default: '' },
  how_much: { type: String, default: null },
  which: { type: String, default: null },
  isolation: { type: Boolean, default: false },
  patient_above_90kg: { type: Boolean, default: false }
})

const destinationDetailsSchema = new mongoose.Schema({
  pick_up_name: { type: String, default: '' },
  pick_up_address: { type: String, default: '' },
  pick_up_postal_code: { type: String, default: '' },
  pick_up_city: { type: String, default: '' },
  pick_up_country: { type: String, default: '' },
  pick_up_employee_name: { type: String, default: '' },
  pickup_phone: { type: String, default: '' },
  drop_off_pick_up_date: { type: Date, default: '' },
  drop_off_pick_up_time: { type: String, default: '' },
  pickup_appointment_time: { type: String, default: '' },
  drop_off_name: { type: String, default: '' },
  drop_off_address: { type: String, default: '' },
  drop_off_postal_code: { type: String, default: '' },
  drop_off_city: { type: String, default: '' },
  drop_off_country: { type: String, default: '' },
  drop_off_phone: { type: String, default: '' },
  return_date: { type: Date, default: '' },
  return_approx_time: { type: String, default: '' }
})

const billingDetailsSchema = new mongoose.Schema({
  pre_name: { type: String, default: '' },
  name: { type: String, default: '' },
  street: { type: String, default: '' },
  place: { type: String, default: '' },
  contact: { type: String, default: '' },
  contact_phone: { type: String, default: '' }
})

export const OrderEntity = mongoose.model(
  'Order',
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      status: {
        type: String,
        enum: ['confirmed', 'pending', 'on_ride', 'paused', 'completed', 'rejected', 'deleted'],
        default: 'pending'
      },
      order_type: {
        type: String,
        enum: ['normal', 'return', 'recurring'],
        default: 'normal'
      },
      transportationData: transportationSchema,
      recurringData: recurringSchema,
      patientData: patientSchema,
      destinationDetailsData: destinationDetailsSchema,
      billingDetailsData: billingDetailsSchema,
      isReviewGiven: { type: Boolean, default: false }
    },
    {
      timestamps: true
    }
  )
)
