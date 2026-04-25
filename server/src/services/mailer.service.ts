import { transporter } from "../config/nodemailer.config";

export async function adminRegistrationMailer(
  user: Record<string, any>,
  event: Record<string, any>,
  payment_id: string,
  order_id: string,
  amount: number
): Promise<void> {
  await transporter.sendMail({
    from: '"UNIVO Events" <no-reply@univo.in>',
    to: "sparkscj110@gmail.com",
    subject: `New Registration: ${event.title ?? "Event"}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>UNIVO – New Registration</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet"/>
  <style>
    body { margin:0; padding:0; background:#f4f6fa; font-family:'Outfit',sans-serif; color:#1c1c1c; }
    .wrap { max-width:620px; margin:30px auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.09); border:1px solid #d8e2ec; }
    .header { background:#004b93; color:#fff; padding:24px 28px; }
    .header h1 { margin:0; font-size:20px; font-weight:700; }
    .header p { margin:6px 0 0; font-size:14px; opacity:.85; }
    .badge { display:inline-block; background:#e8f1fb; color:#004b93; font-size:12px; font-weight:600; padding:3px 10px; border-radius:20px; margin-top:8px; }
    .section { padding:20px 28px; border-bottom:1px solid #f0f0f0; }
    .section:last-of-type { border-bottom:none; }
    .section-title { font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color:#888; margin:0 0 14px; }
    .row { display:flex; justify-content:space-between; margin-bottom:10px; }
    .label { font-size:14px; color:#666; }
    .value { font-size:14px; font-weight:600; color:#1c1c1c; text-align:right; max-width:60%; }
    .amount-box { background:#f0f7ff; border:1px solid #c2d9f5; border-radius:8px; padding:14px 20px; display:flex; justify-content:space-between; align-items:center; margin-top:4px; }
    .amount-box .amt { font-size:22px; font-weight:700; color:#004b93; }
    .pid { font-size:12px; color:#888; word-break:break-all; }
    .footer { text-align:center; font-size:13px; color:#aaa; padding:18px; background:#fafafa; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>New Event Registration</h1>
      <p>A participant just completed payment on UNIVO</p>
      <span class="badge">Registration Alert</span>
    </div>

    <div class="section">
      <p class="section-title">User Profile</p>
      <div class="row"><span class="label">Full Name</span><span class="value">${user.fullName ?? "—"}</span></div>
      <div class="row"><span class="label">Username</span><span class="value">${user.username ?? "—"}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${user.email ?? "—"}</span></div>
      <div class="row"><span class="label">Phone</span><span class="value">${user.phone ?? "—"}</span></div>
      <div class="row"><span class="label">Role</span><span class="value">${user.role ?? "—"}</span></div>
    </div>

    <div class="section">
      <p class="section-title">Event Details</p>
      <div class="row"><span class="label">Event</span><span class="value">${event.title ?? "—"}</span></div>
      <div class="row"><span class="label">Category</span><span class="value">${event.category ?? "—"}</span></div>
      <div class="row"><span class="label">Location</span><span class="value">${event.location ?? "—"}</span></div>
      <div class="row"><span class="label">Start</span><span class="value">${event.startTime ? new Date(event.startTime).toLocaleString("en-IN") : "—"}</span></div>
      <div class="row"><span class="label">End</span><span class="value">${event.endTime ? new Date(event.endTime).toLocaleString("en-IN") : "—"}</span></div>
      <div class="row"><span class="label">Organised By</span><span class="value">${event.organizedBy ?? "—"}</span></div>
    </div>

    <div class="section">
      <p class="section-title">Payment</p>
      <div class="amount-box">
        <span class="label">Amount Received</span>
        <span class="amt">₹${amount}</span>
      </div>
      <div style="margin-top:12px;">
        <div class="row"><span class="label">Payment ID</span><span class="value pid">${payment_id}</span></div>
        <div class="row"><span class="label">Order ID</span><span class="value pid">${order_id}</span></div>
      </div>
    </div>

    <div class="footer">&copy; ${new Date().getFullYear()} UNIVO &mdash; Admin Notification</div>
  </div>
</body>
</html>`,
  });
}

export async function mailer(
  receiver_email: string,
  payment_id: string,
  name: string,
  amount: number
): Promise<void> {
  await transporter.sendMail({
    from: '"UNIVO Events" <no-reply@univo.in>',
    to: receiver_email,
    subject: "Your payment to UNIVO Technologies is confirmed!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>UNIVO – Payment Confirmation</title>
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
      <h1>Payment Confirmed – UNIVO Event Registration</h1>
    </div>
    <div class="content">
      <p>Dear <span class="highlight">${name}</span>,</p>
      <p>Thank you for registering for the <strong>UNIVO Event Registration</strong>!</p>
      <p>Your payment has been successfully received. Please find your transaction details below:</p>
      <p><strong>🧾 Payment ID:</strong> <span class="highlight">${payment_id}</span></p>
      <p><strong>💰 Amount Paid:</strong> <span class="highlight">₹${amount}</span></p>
      <p>We’re thrilled to have you with us. Stay tuned for more updates on our official website: <a href="https://univo-hazel.vercel.app/" target="_blank">https://univo-hazel.vercel.app/</a></p>
    </div>
    <div class="footer">
      &copy; 2024 UNIVO Event Registration. All Rights Reserved.
    </div>
  </div>
</body>
</html>`
  });
}