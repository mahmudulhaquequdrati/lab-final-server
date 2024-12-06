export const verificationEmailTemplate = (verificationLink) => `
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f0f5f9;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(20,83,116,0.1);">
          <tr>
              <td style="padding: 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                          <td align="center" style="padding-bottom: 30px;">
                              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="30" cy="30" r="30" fill="#145374"/>
                                  <path d="M41 22L26 37L19 30" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                          </td>
                      </tr>
                  </table>
                  <h1 style="color: #145374; text-align: center; font-size: 24px; font-weight: 600; margin-bottom: 20px;">Verify Your Email</h1>
                  <p style="color: #4a6572; margin-bottom: 30px; text-align: center;">To complete your registration, please verify your email address by clicking the button below:</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                          <td align="center">
                              <a href="${verificationLink}" style="display: inline-block; background-color: #145374; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 25px; font-weight: 500; font-size: 16px; transition: background-color 0.3s ease;">Verify Email</a>
                          </td>
                      </tr>
                  </table>
                  <p style="color: #4a6572; margin-top: 30px; text-align: center; font-size: 14px;">If the button doesn't work, you can copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; color: #145374; text-align: center; font-size: 14px;">${verificationLink}</p>
              </td>
          </tr>
      </table>
      <p style="text-align: center; font-size: 12px; color: #4a6572; margin-top: 20px;">This is an automated message, please do not reply to this email.</p>
  </body>
  </html>
`
