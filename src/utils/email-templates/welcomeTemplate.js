export const welcomeEmailTemplate = ({ user_name, dashboard_url }) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Dimertra</title>
</head>
<body style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f7f9;">
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td>
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                        <td style="background-color: rgb(20, 83, 116); padding: 30px 20px; text-align: center;">
                            <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Welcome to Dimertra!</h1>
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
                            <p style="font-size: 16px;">We're thrilled to welcome you to Dimertra! Your account has been successfully created, and we're excited to have you on board.</p>
                            <p style="font-size: 16px;">Here are a few things you can do to get started:</p>
                            <ul style="padding-left: 20px; font-size: 16px;">
                                <li style="margin-bottom: 10px;">Explore our platform features</li>
                                <li style="margin-bottom: 10px;">Create your first order</li>
                                <li style="margin-bottom: 10px;">Check out our support system</li>
                            </ul>
                            <p style="font-size: 16px;">If you have any questions or need assistance, our support team is always here to help.</p>
                            <div style="text-align: center;">
                                <a href=${dashboard_url} style="display: inline-block; background-color: rgb(20, 83, 116); color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 20px;">Start Your Journey</a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #f4f7f9; padding: 20px; text-align: center;">
                            <p style="margin: 0; font-size: 14px; color: #666666;">This email was sent to [user's email]. If you didn't create an account on Dimertra, please ignore this email.</p>
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
