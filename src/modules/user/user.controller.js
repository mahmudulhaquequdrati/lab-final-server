// Services
import { userService } from 'src/modules/services'

export const userController = {}

userController.registerAnUser = async (req, res, next) => {
  try {
    const data = await userService.registerAnUser(req.body)

    res.status(200).json({ data, message: 'Successfully registered!' })
  } catch (err) {
    next(err)
  }
}

userController.loginAnUser = async (req, res, next) => {
  try {
    const data = await userService.loginAnUser(req.body)

    res.status(200).json({ data, message: 'Successfully logged in!' })
  } catch (err) {
    next(err)
  }
}

userController.sendVerificationEmail = async (req, res, next) => {
  try {
    const data = await userService.sendVerificationEmail(req.body)

    res.status(200).json({ data, message: 'Successfully sent verification email!' })
  } catch (err) {
    next(err)
  }
}

userController.verifyUserEmail = async (req, res, next) => {
  try {
    const data = await userService.verifyUserEmail(req.body)

    res.status(200).json({ data, message: 'Successfully verified email!' })
  } catch (err) {
    next(err)
  }
}

userController.forgotPasswordEmailSent = async (req, res, next) => {
  try {
    const data = await userService.forgotPasswordEmailSent(req.body)

    res.status(200).json({ data, message: 'Successfully sent forgot password email!' })
  } catch (err) {
    next(err)
  }
}

userController.verifyForgotPassword = async (req, res, next) => {
  try {
    const data = await userService.verifyForgotPassword(req.body)

    res.status(200).json({ data, message: 'Successfully verified forgot password!' })
  } catch (err) {
    next(err)
  }
}
