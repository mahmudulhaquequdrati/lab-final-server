export const forgotPasswordEmailTemplate = ({ user_name, verification_link }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Dimertra Password</title>
</head>
<body style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7f9;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td>
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td style="background-color: rgb(20, 83, 116); padding: 30px 20px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Reset Your Password</h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 30px 20px;">
                            <img src="https://dimetra-buckets.s3.eu-north-1.amazonaws.com/WhatsApp+Image+2024-08-08+at+21.04.15_1161109d+1.png" alt="Healthcare professionals with ambulance" style="max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 20px;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 30px 30px;">
                            <p style="margin-top: 0; font-size: 16px;">Dear ${user_name},</p>
                            <p style="font-size: 16px;">We received a request to reset your password for your Dimertra account. If you didn't make this request, please ignore this email.</p>
                            <p style="font-size: 16px;">To reset your password, click on the button below:</p>
                            <div style="text-align: center;">
                                <a href=${verification_link} style="display: inline-block; background-color: rgb(20, 83, 116); color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 20px;">Reset Password</a>
                            </div>
                            <p style="font-size: 16px; margin-top: 20px;">If the button above doesn't work, you can copy and paste the following link into your browser:</p>
                            <p style="font-size: 14px; word-break: break-all; color: rgb(20, 83, 116);">${verification_link}</p>
                            <p style="font-size: 16px;">This link will expire in 24 hours for security reasons. If you need to reset your password after that, please request a new reset link.</p>
                            <p style="font-size: 16px;">If you have any questions or need assistance, our support team is always here to help.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f4f7f9; padding: 20px; text-align: center;">
                            <p style="margin: 0; font-size: 14px; color: #666666;">This email was sent to [user's email]. If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.</p>
                            <p style="margin: 10px 0 0; font-size: 14px; color: #666666;">&copy; 2023 Dimertra. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`
