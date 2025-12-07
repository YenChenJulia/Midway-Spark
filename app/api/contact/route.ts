import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 驗證必要欄位
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "請填寫所有必要欄位" },
        { status: 400 }
      );
    }

    // 驗證 email 格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email 格式不正確" },
        { status: 400 }
      );
    }

    // 發送 email
    const data = await resend.emails.send({
      from: "Midway Spark <onboarding@resend.dev>", // Resend 的測試 email
      to: ["fairy750122@gmail.com"],
      replyTo: email,
      subject: `來自 ${name} 的訊息 - Midway Spark`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #95a99e; padding-bottom: 10px;">
            新訊息通知
          </h2>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #495057;">姓名：</strong>
              <span style="color: #212529;">${name}</span>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #495057;">Email：</strong>
              <a href="mailto:${email}" style="color: #95a99e; text-decoration: none;">${email}</a>
            </p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #95a99e; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">訊息內容：</h3>
            <p style="color: #212529; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px;">
            <p>此訊息來自 Midway Spark 聯絡表單</p>
            <p>您可以直接回覆此 email 給 ${email}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "訊息已成功送出", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "發送失敗，請稍後再試" },
      { status: 500 }
    );
  }
}
