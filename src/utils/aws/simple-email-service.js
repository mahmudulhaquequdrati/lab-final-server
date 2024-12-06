import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

// Utils
import { CustomError } from 'src/utils/error'

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}

const prepareSendEmailData = async (emailData = {}) => ({
  from: 'no-reply@dailyframe.site',
  to: emailData.to_email,
  subject: emailData.subject,
  html: emailData.content,
  attachments: emailData.attachments || [] // Ensure attachments are handled properly
})

export const sendEmail = async (data) => {
  try {
    const email_data = await prepareSendEmailData(data)

    const transporter = nodemailer.createTransport(smtpConfig)

    const response = await transporter.sendMail(email_data)

    console.log(`+++ Checking send email response: ${JSON.stringify(response)} +++`)

    return response
  } catch (err) {
    console.log('Could not send email via SMTP, error:', err)
    throw new CustomError(500, `Could not send email, error: ${err.message}`)
  }
}
