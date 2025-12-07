# Midway Spark

一個使用 Next.js 和 Sanity CMS 建立的個人部落格，具有文章管理、按讚功能和聯絡表單。

🌐 **線上網站**: [https://midway-sparkyc.vercel.app/](https://midway-sparkyc.vercel.app/)
🎨 **Sanity Studio**: [midway-spark-studio](https://github.com/YenChenJulia/midway-spark-studio)

## 功能特色

- 📝 **雙分類文章系統**
  - 生活誌 (Journal): 記錄日常生活、旅遊和攝影
  - 思維室 (Thinking): 分享想法、學習筆記和技術文章

- ❤️ **文章按讚功能**
  - 使用者可為喜歡的文章按讚
  - 按讚數據存儲在 Sanity CMS
  - 使用 localStorage 防止重複按讚

- 📧 **聯絡表單**
  - 使用 Resend 服務發送 email
  - 表單驗證和錯誤處理
  - 美觀的 email 模板

- 🎨 **現代化設計**
  - 響應式設計，支援手機和桌面裝置
  - 使用 Tailwind CSS
  - 優雅的排版和視覺效果

## 技術棧

- **框架**: [Next.js 16.0.7](https://nextjs.org/) (App Router)
- **CMS**: [Sanity](https://www.sanity.io/)
- **樣式**: [Tailwind CSS](https://tailwindcss.com/)
- **部署**: [Vercel](https://vercel.com/)
- **Email**: [Resend](https://resend.com/)
- **語言**: TypeScript
- **日期處理**: date-fns

## 專案結構

```
midway-spark/                 # 主專案（本 Repository）
├── app/                      # Next.js App Router
│   ├── api/                 # API Routes
│   │   ├── contact/        # 聯絡表單 API
│   │   └── likes/          # 按讚功能 API
│   ├── about/              # 關於頁面
│   ├── contact/            # 聯絡頁面
│   ├── post/[slug]/        # 動態文章頁面
│   └── layout.tsx          # 全局佈局
├── components/              # React 元件
│   ├── LikeButton.tsx      # 按讚按鈕元件
│   └── ...
├── lib/                     # 工具函數
│   └── sanity.ts           # Sanity 客戶端設定
└── public/                  # 靜態資源

midway-spark-studio/         # Sanity Studio 專案（獨立 Repository）
└── schemaTypes/            # Sanity Schema 定義
    └── post.ts             # 文章 Schema（包含 likes 欄位）
```

> **注意**: `midway-spark-studio` 是獨立的 GitHub repository，用於管理 Sanity CMS 的內容結構和後台介面。

## 環境變數設定

在專案根目錄創建 `.env.local` 檔案：

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token

# Resend Email Configuration
RESEND_API_KEY=your-resend-api-key

# Contact Form Configuration
CONTACT_EMAIL=your-email@example.com
```

### 如何取得環境變數

1. **Sanity 設定**:
   - 前往 [Sanity 管理介面](https://www.sanity.io/manage)
   - 找到你的專案 ID
   - 在 API 設定中生成 API Token（需要 Editor 或 Admin 權限）

2. **Resend API Key**:
   - 前往 [Resend](https://resend.com/api-keys)
   - 註冊並生成 API Key

3. **Contact Email**:
   - 填入你想接收聯絡表單訊息的 email 地址

## 本地開發

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定 Sanity Studio（內容管理後台）

Sanity Studio 是獨立的專案，用於管理部落格內容。

**選項 A: 從獨立 Repository Clone**
```bash
# Clone Sanity Studio 專案
git clone https://github.com/YenChenJulia/midway-spark-studio.git
cd midway-spark-studio
npm install
npm run dev
```

**選項 B: 使用本地現有專案**
```bash
# 如果你已有本地的 Sanity Studio 專案
cd /path/to/midway-spark-studio
npm install
npm run dev
```

Sanity Studio 會在 [http://localhost:3333](http://localhost:3333) 啟動。

### 3. 啟動 Next.js 開發伺服器

開啟另一個終端視窗：

```bash
npm run dev
```

網站會在 [http://localhost:3000](http://localhost:3000) 啟動。

### 4. 設定 Sanity CORS（本地開發）

如果需要測試按讚功能：

1. 前往 [Sanity 管理介面](https://www.sanity.io/manage)
2. 選擇你的專案
3. 進入 API > CORS Origins
4. 加入 `http://localhost:3000`
5. 勾選 "Allow credentials"

## 部署到 Vercel

### 方式 1: 使用 Vercel CLI

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 登入
vercel login

# 部署
vercel

# 部署到正式環境
vercel --prod
```

### 方式 2: 使用 GitHub + Vercel 介面

1. **推送到 GitHub**:
```bash
git add .
git commit -m "feat: initial commit"
git push origin main
```

2. **在 Vercel 建立專案**:
   - 前往 [Vercel](https://vercel.com/new)
   - 選擇你的 GitHub repository
   - 點擊 "Import"

3. **設定環境變數**:
   - 在 Vercel Dashboard 進入 Settings > Environment Variables
   - 加入所有 `.env.local` 中的變數

4. **設定 Sanity CORS**:
   - 在 Sanity 管理介面加入你的 Vercel 網址
   - 例如: `https://your-project.vercel.app`
   - 勾選 "Allow credentials"

5. **部署**:
   - 點擊 "Deploy"
   - 之後每次推送到 main 分支會自動重新部署

## 建置指令

```bash
# 開發模式
npm run dev

# 建置正式版本
npm run build

# 啟動正式版本
npm start

# 程式碼檢查
npm run lint
```

## Sanity Schema 管理

文章結構 (post.ts) 包含以下欄位：

- `title`: 文章標題
- `slug`: URL 路徑
- `category`: 分類（journal 或 thinking）
- `tags`: 標籤
- `coverImage`: 封面圖片
- `excerpt`: 摘要
- `body`: 文章內容（Portable Text）
- `publishedAt`: 發布日期
- `likes`: 按讚數

## API 端點

### GET /api/likes
取得文章按讚數

**查詢參數**:
- `postId`: 文章 ID

**回應**:
```json
{
  "likes": 10
}
```

### POST /api/likes
增加文章按讚數

**請求 Body**:
```json
{
  "postId": "文章ID"
}
```

**回應**:
```json
{
  "likes": 11
}
```

### POST /api/contact
發送聯絡表單

**請求 Body**:
```json
{
  "name": "姓名",
  "email": "email@example.com",
  "message": "訊息內容"
}
```

## 疑難排解

### 按讚功能無法使用

1. 檢查 Sanity CORS 設定是否包含你的網域
2. 確認 `SANITY_API_TOKEN` 有寫入權限
3. 檢查瀏覽器開發者工具的 Console 是否有錯誤

### 聯絡表單無法發送

1. 確認 `RESEND_API_KEY` 設定正確
2. 確認 `CONTACT_EMAIL` 設定正確
3. 檢查 Resend 的 API 配額是否已用完

### 建置失敗

1. 確認所有環境變數都已設定
2. 執行 `npm run build` 查看詳細錯誤訊息
3. 確認 Sanity 資料格式正確

## 授權

此專案為個人作品，僅供參考學習使用。

## 聯絡資訊

如有問題或建議，歡迎透過網站的聯絡表單與我聯繫。
