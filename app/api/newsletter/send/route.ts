import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer";


async function sendEmail(to: string, subject: string, htmlContent: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // 2. Generate unsubscribe link (same as before)
  const encodedEmail = Buffer.from(to).toString("base64");
  const unsubscribeUrl = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/unsubscribe?token=${encodedEmail}`;

  // 3. Add unsubscribe link to email content
  const emailWithUnsubscribe = `
    ${htmlContent}
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
      <p>You're receiving this email because you subscribed to our newsletter.</p>
      <p>
        <a href="${unsubscribeUrl}" style="color: #7c3aed; text-decoration: underline;">
          Unsubscribe from this newsletter
        </a>
      </p>
    </div>
  `;

  // 4. Define email options
  const mailOptions = {
    from: `"Tosin Ayodeji" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html: emailWithUnsubscribe,
  };

  try {
    // 5. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw new Error(`Failed to send email to ${to}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { subject, content, recipients } = await request.json()

    if (!subject || !content || !recipients || !Array.isArray(recipients)) {
      return NextResponse.json(
        { success: false, message: "Subject, content, and recipients are required" },
        { status: 400 },
      )
    }

    if (recipients.length === 0) {
      return NextResponse.json({ success: false, message: "No recipients provided" }, { status: 400 })
    }

    const results = []
    let successCount = 0
    let failureCount = 0

    // Send emails individually to each recipient
    for (const email of recipients) {
      try {
        const result = await sendEmail(email, subject, content)
        results.push({
          email,
          success: true,
          messageId: result.messageId,
        })
        successCount++
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error)
        results.push({
          email,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
        failureCount++
      }
    }

    // Log the newsletter send for audit purposes
    console.log(`Newsletter sent: ${successCount} successful, ${failureCount} failed`)
    console.log(`Subject: ${subject}`)
    console.log(`Recipients: ${recipients.length}`)

    return NextResponse.json({
      success: true,
      message: `Newsletter sent successfully`,
      sentCount: successCount,
      failedCount: failureCount,
      totalRecipients: recipients.length,
      results: results,
    })
  } catch (error) {
    console.error("Error sending newsletter:", error)
    return NextResponse.json({ success: false, message: "Failed to send newsletter" }, { status: 500 })
  }
}
