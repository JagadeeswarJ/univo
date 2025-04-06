import { transporter } from "../config/nodemailer.config";

export async function mailer(
  receiver_email: string,
  payment_id: string,
  name: string,
  amount: number
): Promise<void> {
  await transporter.sendMail({
    from: '"UNIVO Events" <no-reply@univo.in>',
    to: receiver_email,
    subject: "Your payment to UNIVO Sports Fest is confirmed!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Payment Confirmation</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap" rel="stylesheet"/>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6fa;
      font-family: 'Outfit', sans-serif;
      color: #1c1c1c;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border: 1px solid #d8e2ec;
    }
    .header {
      background-color: #004b93;
      color: #fff;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
    }
    .content {
      padding: 24px 28px;
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin: 12px 0;
    }
    .highlight {
      color: #004b93;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888;
      padding: 20px;
      border-top: 1px solid #e0e0e0;
    }
    a {
      color: #004b93;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Payment Confirmed – UNIVO Sports Fest</h1>
    </div>
    <div class="content">
      <p>Dear <span class="highlight">${name}</span>,</p>
      <p>Thank you for registering for the <strong>UNIVO Sports Fest</strong>!</p>
      <p>Your payment has been successfully received. Please find your transaction details below:</p>
      <p><strong>🧾 Payment ID:</strong> <span class="highlight">${payment_id}</span></p>
      <p><strong>💰 Amount Paid:</strong> <span class="highlight">₹${amount}</span></p>
      <p>We’re thrilled to have you with us. Stay tuned for more updates on our official website: <a href="https://www.univo.in" target="_blank">univo.in</a></p>
    </div>
    <div class="footer">
      &copy; 2024 UNIVO Sports Fest. All Rights Reserved.
    </div>
  </div>
</body>
</html>`
  });
}