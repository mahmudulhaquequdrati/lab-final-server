import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config() // Initiating dotenv, if we keep in controller it does not work

import { UserEntity } from 'src/modules/user/user.entity'
// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET

import { sendEmail } from 'src/utils/aws/simple-email-service' // Import the sendEmail function
import {
  verificationEmailTemplate,
  welcomeEmailTemplate,
  forgotPasswordEmailTemplate
} from 'src/utils/email-templates/index'

// Add this line to get the client URL from environment variables
const CLIENT_URL = process.env.CLIENT_URL

export const registerAnUser = async (inputData) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    billing_address,
    code,
    place,
    internal_cost_center,
    password,
    profile_image
  } = inputData

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Check if user already exists
    const existingUser = await UserEntity.findOne({ email }).session(session)
    if (existingUser) {
      throw new Error('User already exists with this email address')
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user
    const newUser = new UserEntity({
      first_name,
      last_name,
      email,
      phone,
      address,
      billing_address,
      code,
      place,
      internal_cost_center,
      password: hashedPassword, // Save hashed password
      profile_image
    })

    // Save the user to the database
    await newUser.save({ session })

    // Generate JWT token for email verification
    const verificationToken = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' })

    // Construct the full verification URL
    const verificationLink = `${CLIENT_URL}/verify-email?token=${verificationToken}`

    // Use the email template with the full verification link
    const emailContent = verificationEmailTemplate(verificationLink)

    // Send verification email
    await sendEmail({
      to_email: email,
      subject: 'Verify Your Email',
      content: emailContent // Use the template content here
    })

    // Commit the transaction if everything is successful
    await session.commitTransaction()
    return {
      token: jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' }),
      user: newUser
    }
  } catch (err) {
    await session.abortTransaction() // Rollback the transaction
    throw new Error(err.message)
  } finally {
    session.endSession() // End the session
  }
}

export const loginAnUser = async (inputData) => {
  const { email, password } = inputData

  try {
    // Check if user exists
    const user = await UserEntity.findOne({ email })
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })

    // Return AuthPayload
    return {
      token,
      user
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateAnUser = async (args, context) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    billing_address,
    place,
    code,
    internal_cost_center,
    profile_image
  } = args

  try {
    // Check if user exists
    const user = await UserEntity.findById(context?._id)
    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = await UserEntity.findByIdAndUpdate(
      context?._id,
      {
        first_name,
        last_name,
        email,
        phone,
        address,
        billing_address,
        code,
        place,
        internal_cost_center,
        profile_image
      },
      {
        new: true
      }
    )

    return updatedUser
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateUserPassword = async (args, context) => {
  const { current_password, new_password } = args

  try {
    // Check if user exists
    const user = await UserEntity.findById(context?._id)
    if (!user) {
      throw new Error('User not found')
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(current_password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid old password')
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(new_password, 10)

    const updatedUser = await UserEntity.findByIdAndUpdate(
      context?._id,
      {
        password: hashedPassword
      },
      {
        new: true
      }
    )

    return updatedUser
  } catch (err) {
    throw new Error(err.message)
  }
}

export const sendVerificationEmail = async (args) => {
  const { token } = args

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    if (!payload && !payload.userId) {
      throw new Error('Unauthorized request')
    }

    const { userId } = payload

    const user = await UserEntity.findById(userId)
    if (!user) {
      throw new Error('Unauthorized')
    }

    const verificationToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    // send email from here

    // Construct the full verification URL
    const verificationLink = `${CLIENT_URL}/verify-email?token=${verificationToken}`

    // Use the email template with the full verification link
    const emailContent = verificationEmailTemplate(verificationLink)

    // Send verification email
    await sendEmail({
      to_email: user?.email,
      subject: 'Verify Your Email',
      content: emailContent // Use the template content here
    })

    return {
      token: verificationToken,
      message: 'Verification email sent successfully'
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const verifyUserEmail = async (args) => {
  const { token } = args

  try {
    const payload = jwt.verify(token, JWT_SECRET)

    if (!payload && !payload.userId) {
      throw new Error('Unauthorized request')
    }

    const { userId } = payload

    const user = await UserEntity.findById(userId)
    if (!user) {
      throw new Error('Unauthorized')
    } else if (user.is_verified) {
      throw new Error('User is already verified')
    }

    user.is_verified = true
    await user.save()

    // Use the email template with the full verification link
    const emailContent = welcomeEmailTemplate({
      user_name: user?.first_name,
      dashboard_url: `${CLIENT_URL}`
    })

    // Send verification email
    await sendEmail({
      to_email: user?.email,
      subject: 'Welcome to our platform',
      content: emailContent // Use the template content here
    })

    return {
      message: 'User verified successfully'
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const forgotPasswordEmailSent = async (args) => {
  const { email } = args

  try {
    // Check if user exists
    const user = await UserEntity.findOne({ email })
    if (!user) {
      throw new Error('User not found')
    }

    // Generate JWT token for email verification
    const verificationToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' })

    // Construct the full verification URL
    const verificationLink = `${CLIENT_URL}/verify-forgot-password?token=${verificationToken}`

    // Use the email template with the full verification link
    const emailContent = forgotPasswordEmailTemplate({
      user_name: user?.first_name,
      verification_link: verificationLink
    })

    // Send verification email
    await sendEmail({
      to_email: user?.email,
      subject: 'Forgot Password',
      content: emailContent // Use the template content here
    })

    return {
      message: 'Forgot password email sent successfully'
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const verifyForgotPassword = async (args) => {
  const { token, new_password } = args

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    if (!payload && !payload.userId) {
      throw new Error('Unauthorized request')
    }

    const { userId } = payload

    const user = await UserEntity.findById(userId)
    if (!user) {
      throw new Error('Unauthorized')
    }

    const hashedPassword = await bcrypt.hash(new_password, 10)

    user.password = hashedPassword
    await user.save()

    return {
      message: 'Password reset successfully'
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
