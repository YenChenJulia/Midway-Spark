# 🚀 快速開始指南：按讚功能 + Vercel 部署

## ✅ 已完成的工作

我已經為你完成以下設定：

1. ✅ **Sanity Schema 已更新** - 在 `midway-spark-studio/schemaTypes/post.ts` 加入 `likes` 欄位
2. ✅ **API 端點已創建** - `/app/api/likes/route.ts` (處理按讚功能)
3. ✅ **按讚按鈕元件** - `/components/LikeButton.tsx` (美觀的愛心按讚按鈕)
4. ✅ **整合到文章頁面** - 文章底部已加入按讚功能

## 📝 你需要做的步驟

### 步驟 1: 啟動 Sanity Studio（本地測試用）

Sanity schema 已更新，但需要本地啟動來測試：

```bash
cd /Users/julia/Documents/react/midway-spark-project/midway-spark-studio
npm run dev
```

這會在 http://localhost:3333 啟動 Sanity Studio
- 你可以在這裡查看文章的 `likes` 欄位
- Schema 的變更會自動同步到 Sanity 雲端

### 步驟 2: 測試部落格（本地）

開啟另一個終端視窗：

```bash
cd /Users/julia/Documents/react/midway-spark-project/midway-spark
npm run dev
```

這會在 http://localhost:3000 啟動你的部落格

**測試按讚功能**：
1. 開啟任一文章頁面
2. 滑到文章底部，會看到愛心按讚按鈕
3. 點擊按讚 - 數字會增加 +1
4. 按鈕會變成粉紅色並顯示「已按讚」
5. 重新整理頁面，按讚數應該保持（已儲存到 Sanity）

### 步驟 3: 部署到 Vercel

#### 選項 A：使用 Vercel CLI（最快）

```bash
cd /Users/julia/Documents/react/midway-spark-project/midway-spark

# 安裝 Vercel CLI（如果還沒有）
npm install -g vercel

# 登入
vercel login

# 部署
vercel

# 部署到正式環境
vercel --prod
```

#### 選項 B：使用 GitHub + Vercel 網頁介面（推薦給初學者）

**1. 提交並推送程式碼到 GitHub：**

```bash
cd /Users/julia/Documents/react/midway-spark-project/midway-spark
git add .
git commit -m "feat: add like functionality and prepare for deployment"
git push origin main
```

**2. 在 Vercel 建立新專案：**

- 前往 https://vercel.com/new
- 登入你的 Vercel 帳號
- 點擊 "Import Project"
- 選擇你的 GitHub repository（`midway-spark`）
- 點擊 "Import"

**3. 設定環境變數（重要！）**

在 Vercel 專案設定頁面，前往 **Settings > Environment Variables**，加入以下變數：

| 變數名稱 | 值 | 適用環境 |
|---------|-----|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `405sg6n7` | Production, Preview, Development |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Production, Preview, Development |
| `SANITY_API_TOKEN` | `從 .env.local 複製` | Production, Preview, Development |
| `RESEND_API_KEY` | `從 .env.local 複製` | Production, Preview, Development |
| `CONTACT_EMAIL` | `你的 Gmail` | Production, Preview, Development |

**重要**：從你的 `.env.local` 檔案複製實際的 token 和 API key 值

**4. 部署：**

- 點擊 "Deploy"
- 等待建置完成（約 2-3 分鐘）
- 完成後會得到一個網址，例如：`https://midway-spark.vercel.app`

**5. 設定 Sanity CORS（讓 Vercel 網站可以存取 Sanity）：**

- 前往 https://www.sanity.io/manage
- 選擇你的專案（project ID: `405sg6n7`）
- 點擊左側選單 "API"
- 找到 "CORS Origins" 區塊
- 點擊 "Add CORS origin"
- 輸入你的 Vercel 網址（例如 `https://midway-spark.vercel.app`）
- 勾選 "Allow credentials"
- 點擊 "Save"

## 🎉 完成！

現在你的部落格已經部署到 Vercel，並且有按讚功能了！

### 測試部署後的網站：

1. 訪問你的 Vercel 網址
2. 進入任一文章
3. 測試按讚功能
4. 確認一切運作正常

### 之後的更新流程：

每次你修改程式碼並推送到 GitHub：

```bash
git add .
git commit -m "更新說明"
git push origin main
```

Vercel 會自動偵測並重新部署！

## 🔧 疑難排解

### 問題：按讚後沒有反應

**檢查清單**：
- [ ] Vercel 環境變數是否都已設定
- [ ] `SANITY_API_TOKEN` 是否正確（需要有寫入權限）
- [ ] Sanity CORS 設定是否包含你的 Vercel 網址
- [ ] 打開瀏覽器開發者工具（F12），查看 Console 是否有錯誤

### 問題：部署失敗

- 檢查 Vercel 的部署日誌（Deployment Logs）
- 確認 `npm run build` 在本地可以成功執行

### 問題：環境變數沒有生效

- 重新部署專案（在 Vercel Dashboard 點擊 "Redeploy"）
- 確認環境變數有勾選正確的環境（Production, Preview, Development）

## 📞 需要幫助？

如果遇到問題：

1. 檢查瀏覽器開發者工具的 Console
2. 查看 Vercel 部署日誌
3. 確認所有環境變數都已正確設定
4. 確認 Sanity CORS 設定包含你的網域

## 🎨 自訂按讚按鈕

如果你想修改按讚按鈕的樣式，編輯：
`/Users/julia/Documents/react/midway-spark-project/midway-spark/components/LikeButton.tsx`

---

祝你部署順利！🚀
