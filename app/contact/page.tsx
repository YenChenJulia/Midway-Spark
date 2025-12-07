"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "發送失敗");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "發送失敗，請稍後再試");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* 標題區塊 */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-light text-charcoal-dark mb-4">
          聯絡我
        </h1>
        <p className="text-lg text-charcoal-light font-serif">
          有什麼想說的嗎？歡迎留言給我
        </p>
      </div>

      {/* 表單區塊 */}
      <div className="bg-white rounded-lg border border-accent-clay/20 p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 姓名欄位 */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-charcoal-dark mb-2"
            >
              姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-accent-clay/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-moss focus:border-transparent transition-all duration-300"
              placeholder="請輸入您的姓名"
            />
          </div>

          {/* Email 欄位 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-charcoal-dark mb-2"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-accent-clay/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-moss focus:border-transparent transition-all duration-300"
              placeholder="your.email@example.com"
            />
          </div>

          {/* 訊息欄位 */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-charcoal-dark mb-2"
            >
              訊息 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-accent-clay/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-moss focus:border-transparent transition-all duration-300 resize-none"
              placeholder="想和我說些什麼呢？"
            />
          </div>

          {/* 送出按鈕 - 只在 idle 或 sending 狀態顯示 */}
          {(status === "idle" || status === "sending") && (
            <div className="pt-6 mt-6 border-t border-accent-clay/20">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 px-6 rounded-lg font-medium text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: '#B5C4B0',
                  color: 'white',
                  minHeight: '48px',
                }}
              >
                {status === "sending" ? "送出中..." : "送出"}
              </button>
            </div>
          )}

          {/* 狀態訊息 */}
          {status === "success" && (
            <div className="pt-6 mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center">
              訊息已送出！感謝您的來信，我會盡快回覆 ✨
            </div>
          )}

          {status === "error" && (
            <div className="pt-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
