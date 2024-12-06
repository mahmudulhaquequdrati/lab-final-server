import mongoose from 'mongoose'

const transportationSchema = new mongoose.Schema({
  type_of_transport: { type: String, default: '' },
  mode_of_transportation: { type: String, default: '' },
  transport_with: { type: [String], default: [] },
  oxygen_quantity: { type: Number, default: null }
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

export const RecurringOrderEntity = mongoose.model(
  'RecurringOrder',
  new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
      },
      status: {
        type: String,
        enum: ['confirmed', 'pending', 'on_ride', 'paused', 'completed', 'rejected', 'deleted'],
        default: 'pending'
      },
      order_type: {
        type: String,
        enum: ['normal_recurring', 'return_recurring'],
        default: 'normal_recurring'
      },
      transportationData: transportationSchema,
      patientData: patientSchema,
      destinationDetailsData: destinationDetailsSchema,
      billingDetailsData: billingDetailsSchema
    },
    {
      timestamps: true
    }
  )
)
