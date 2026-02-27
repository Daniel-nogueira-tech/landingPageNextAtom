export const EMAIL_WELCOME_TEMPLATE = `
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f9; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f9; padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:linear-gradient(90deg,#4f46e5,#9333ea); padding:30px;">
                <h1 style="color:#ffffff; margin:0; font-size:24px;">
                  🎉 Welcome, {{name}}!
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px; color:#333333;">
                <p style="font-size:16px; margin-bottom:20px;">
                  We are very happy to have you with us.
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  Your account was created successfully using the email:
                  <strong>{{email}}</strong>
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  Now you can explore all the features of our platform.
                </p>

                <!-- Button -->
                <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:30px auto;">
                  <tr>
                    <td align="center" bgcolor="#4f46e5" style="border-radius:5px;">
                      <a href="http://localhost:5173"
                         style="display:inline-block; padding:12px 25px; font-size:14px; color:#ffffff; text-decoration:none; border-radius:5px;">
                        Access Platform
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:12px; color:#777777; text-align:center;">
                  If you did not create this account, you can ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f1f1f1; padding:15px; font-size:12px; color:#888888;">
                © ${new Date().getFullYear()} NextAton. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
  </html>`


export const EMAIL_RESET_PASSWORD_TEMPLATE = `
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f9; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f9; padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:linear-gradient(90deg,#4f46e5,#9333ea); padding:30px;">
                <h1 style="color:#ffffff; margin:0; font-size:24px;">
                  Reset Password
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px; color:#333333;">
                <p style="font-size:16px; margin-bottom:20px;">
                  We received a request to reset the password for your account.
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  Use the code below to reset your password:
                  <strong>{{otp}}</strong>
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  This code will expire in 24 hours.
                </p>

                <!-- Button -->
                <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:30px auto;">
                  <tr>
                    <td align="center" bgcolor="#4f46e5" style="border-radius:5px;">
                      <a href="http://localhost:5173/reset-password"
                         style="display:inline-block; padding:12px 25px; font-size:14px; color:#ffffff; text-decoration:none; border-radius:5px;">
                        Reset Password
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:12px; color:#777777; text-align:center;">
                  If you did not request this reset, you can ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f1f1f1; padding:15px; font-size:12px; color:#888888;">
                © ${new Date().getFullYear()} NextAton. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
  </html>`


export const EMAIL_VERIFY_EMAIL_TEMPLATE = `
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Email</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f9; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f6f9; padding:20px 0;">
      <tr>
        <td align="center">
          
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:linear-gradient(90deg,#4f46e5,#9333ea); padding:30px;">
                <h1 style="color:#ffffff; margin:0; font-size:24px;">
                  Verify Email
                </h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px; color:#333333;">
                <p style="font-size:16px; margin-bottom:20px;">
                  We received a request to verify your email.
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  Use the code below to verify your email:
                  <strong>{{otp}}</strong>
                </p>

                <p style="font-size:14px; line-height:1.6;">
                  This code will expire in 24 hours.
                </p>

                <!-- Button -->
                <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:30px auto;">
                  <tr>
                    <td align="center" bgcolor="#4f46e5" style="border-radius:5px;">
                      <a href="http://localhost:5173/verify-email"
                         style="display:inline-block; padding:12px 25px; font-size:14px; color:#ffffff; text-decoration:none; border-radius:5px;">
                        Verify Email
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="font-size:12px; color:#777777; text-align:center;">
                  If you did not request this verification, you can ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f1f1f1; padding:15px; font-size:12px; color:#888888;">
                © ${new Date().getFullYear()} NextAton. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
  </html>`
