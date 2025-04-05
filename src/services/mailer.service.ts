import { transporter } from "../config/nodemailer.config";

export async function mailer(
  receiver_email: string,
  payment_id: string,
  name: string,
  amount: number
): Promise<void> {
  await transporter.sendMail({
    from: '"UNIVO Events" ',
    to: receiver_email,
    subject: "Your payment to UNIVO Event is confirmed",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Confirmation</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #eef3f9;
      color: #1c1c1c;
      font-family: 'Outfit', Arial, sans-serif;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #d0d9e4;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
    }
    .header {
      background-color: #004b93;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      margin: 0;
    }
    .content {
      padding: 25px 20px;
    }
    .content p {
      font-size: 16px;
      margin: 12px 0;
    }
    .footer {
      margin-top: 20px;
      padding: 15px;
      text-align: center;
      font-size: 14px;
      color: #888;
      border-top: 1px solid #e0e0e0;
    }
    .highlight {
      font-weight: 600;
      color: #004b93;
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
      <h1>UNIVO Confirmation</h1>
    </div>
    <div class="content">
      <p>Dear <span class="highlight">${name}</span>,</p>
      <p>Your payment has been successfully confirmed. Here are the details of your transaction:</p>
      <p><b>Payment ID:</b> <span class="highlight">${payment_id}</span></p>
      <p><b>Amount Paid:</b> <span class="highlight">₹${amount}</span></p>
      <p class="highlight">Thank you for registering! Stay tuned for more updates on our website: <a href="https://www.univo.in" target="_blank">univo.in</a></p>
    </div>
    <div class="footer">
      <p>&copy; 2024 UNIVO Sports Fest. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>
`,
  });
}
