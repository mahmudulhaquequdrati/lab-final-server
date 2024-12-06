import { Router } from 'express'

// Controllers
import { userController } from 'src/modules/controllers'

export const userRouter = Router()

userRouter.post('/register', userController.registerAnUser)

userRouter.post('/login', userController.loginAnUser)

userRouter.post('/verify-email', userController.verifyUserEmail)

userRouter.post('/verification-email-sent', userController.sendVerificationEmail)

userRouter.post('/forgot-password-sent', userController.forgotPasswordEmailSent)

userRouter.post('/verify-forgot-password', userController.verifyForgotPassword)
