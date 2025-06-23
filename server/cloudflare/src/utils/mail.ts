import { Context } from "hono"
import { Env } from ".."
import { captureException } from "@sentry/cloudflare"

// TODO instead of directly sending mails, I need to implement queuing using BullMQ or RabbitMQ
export async function sendEmailVerificationMail(
  c: Context<Env>,
  email: string,
  token: string
) {
  const verificationLink = `http://${c.req.header(
    "Host"
  )}/auth/confirmation/${token}`

  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
            min-height: 100vh;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.1)"/><circle cx="80" cy="40" r="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="40" cy="80" r="1" fill="rgba(255,255,255,0.1)"/></svg>');
            opacity: 0.3;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
            position: relative;
            z-index: 1;
        }
        
        .logo::before {
            content: '✉️';
            font-size: 36px;
        }
        
        .header h1 {
            color: white;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
        }
        
        .header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px 30px;
            text-align: center;
        }
        
        .welcome-text {
            font-size: 18px;
            color: #333;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .verification-box {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }
        
        .verification-box::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
            );
            animation: shimmer 3s linear infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%); }
            100% { transform: translateX(100%) translateY(100%); }
        }
        
        .verify-button {
            display: inline-block;
            background: white;
            color: #f5576c;
            text-decoration: none;
            padding: 16px 40px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            position: relative;
            z-index: 1;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .verify-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .security-info {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
            border-left: 4px solid #667eea;
        }
        
        .security-info h3 {
            color: #333;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .security-info h3::before {
            content: '🔒';
        }
        
        .security-info p {
            color: #666;
            font-size: 14px;
            line-height: 1.5;
        }
        
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #eee;
        }
        
        .footer p {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .social-links {
            margin: 20px 0;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 10px;
            width: 40px;
            height: 40px;
            background: #667eea;
            color: white;
            border-radius: 50%;
            text-decoration: none;
            line-height: 40px;
            transition: all 0.3s ease;
        }
        
        .social-links a:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, #667eea, transparent);
            margin: 30px 0;
        }
        
        @media (max-width: 600px) {
            body { padding: 10px; }
            .container { margin: 0; }
            .header, .content, .footer { padding: 20px; }
            .header h1 { font-size: 24px; }
            .welcome-text { font-size: 16px; }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo"></div>
            <h1>WebBuilder</h1>
            <p>Welcome to the future of web development</p>
        </div>
        
        <div class="content">
            <h2 style="color: #333; margin-bottom: 20px; font-size: 24px;">Almost there! 🎉</h2>
            
            <p class="welcome-text">
                Thank you for joining <strong>WebBuilder</strong>! We're excited to have you on board. 
                To get started and secure your account, please verify your email address.
            </p>
            
            <div class="verification-box">
                <a href="${verificationLink}" class="verify-button">
                    Verify My Email
                </a>
            </div>
            
            <div class="divider"></div>
            
            <div class="security-info">
                <h3>Security Notice</h3>
                <p>
                    This verification link will expire in 24 hours for your security. 
                    If you didn't create an account with WebBuilder, please ignore this email.
                </p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
                Having trouble? Copy and paste this link into your browser:<br>
                <span style="color: #667eea; word-break: break-all;">VERIFICATION_LINK_HERE</span>
            </p>
        </div>
        
        <div class="footer">
            <p><strong>WebBuilder Team</strong></p>
            <p>Building the web, one site at a time</p>
            
            <div class="social-links">
                <a href="#">📧</a>
                <a href="#">🐦</a>
                <a href="#">💼</a>
            </div>
            
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
                © 2024 WebBuilder. All rights reserved.<br>
                This email was sent to verify your account. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>`
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": c.env.BREVO_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Web Builder", email: "streamthread2206@gmail.com" },
        to: [{ email }],
        subject: "Web Builder Signup Email verification",
        htmlContent: htmlTemplate,
      }),
    })
  } catch (err) {
    captureException(err)
  }
  return
}

export async function sendOTPMail(c: Context<Env>, email: string, OTP: string, jti: string) {
    //TODO when making frontend make a page which handles the not you? functionality
    // For not you? get jti with the function call, and send with main in form of query of something
  const HTMLcontent = `<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      @media (max-width: 600px) {
        .container {
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#f6f6f6;font-family:Arial,sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding:20px 0;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color:#ffffff;border-radius:8px;padding:40px;box-shadow:0 0 10px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <h2 style="margin:0;color:#333333;">Your One-Time Password (OTP)</h2>
              </td>
            </tr>
            <tr>
              <td style="color:#555555;font-size:16px;padding-bottom:20px;">
                Hello,<br><br>
                Please use the following OTP to verify your identity. This OTP is valid for the next <strong>10 minutes</strong>.
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px 0;">
                <div style="display:inline-block;background-color:#f0f0f0;color:#111111;font-size:24px;font-weight:bold;letter-spacing:4px;padding:12px 24px;border-radius:6px;">
                  ${OTP}
                </div>
              </td>
            </tr>
            <tr>
              <td style="color:#777777;font-size:14px;padding-top:20px;">
                If you didn't request this, please ignore this email or contact support if you have concerns.
                <a href="http://${c.env.FRONTEND_DOMAIN}/handleOTPissue/${jti}">Not you? Click here</a>
              </td>
            </tr>
            <tr>
              <td style="color:#999999;font-size:12px;padding-top:30px;text-align:center;">
                &copy; 2025 Web builder. All rights reserved.<br>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`   
try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": c.env.BREVO_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Web Builder", email: "streamthread2206@gmail.com" },
        to: [{ email }],
        subject: "Web Builder OTP verification for password change",
        htmlContent: HTMLcontent,
      }),
    })
  } catch (err) {
    throw err
  }
  return
}
