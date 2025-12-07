# 部署指南與按讚功能設定

## 🎯 按讚功能已完成的部分

✅ API 端點已創建 (`app/api/likes/route.ts`)
✅ LikeButton 元件已創建 (`components/LikeButton.tsx`)
✅ 文章頁面已整合按讚按鈕
✅ TypeScript 型別已更新

## ⚠️ 必須手動完成的步驟

### 步驟 1: 更新 Sanity Schema（**最重要！必須先做**）

#### 找到你的 Sanity Studio 專案

你的 Sanity Studio 可能在以下位置之一：
- 另一個獨立的資料夾（例如 `midway-spark-studio`）
- 或是透過 Sanity 網頁管理介面

#### 更新 Schema

在你的 Sanity Studio 專案中，找到 `post` schema 檔案（通常在 `schemas/` 資料夾），加入以下欄位：

```javascript
// 在 post.js 或 post.ts 的 fields 陣列中加入：
{
  name: 'likes',
  title: '按讚數',
  type: 'number',
  initialValue: 0,
  validation: Rule => Rule.min(0),
  description: '文章獲得的按讚數量'
}
```

完整範例（post schema 的 fields 部分）：
```javascript
fields: [
  {
    name: 'title',
    title: '標題',
    type: 'string',
  },
  // ... 其他欄位 ...
  {
    name: 'likes',           // 👈 加入這個新欄位
    title: '按讚數',
    type: 'number',
    initialValue: 0,
    validation: Rule => Rule.min(0),
  },
]
```

#### 部署 Schema 變更

1. 在 Sanity Studio 專案資料夾中執行：
   ```bash
   sanity deploy
   ```

2. 或者如果你使用網頁介面，變更會自動同步

### 步驟 2: 測試按讚功能（本地）

在部署前先本地測試：

```bash
npm run dev
```

1. 開啟任一文章頁面
2. 應該會看到愛心按讚按鈕
3. 點擊按讚，數字應該會增加
4. 重新整理頁面，按讚數應該保持（已記錄在 Sanity）
5. 按讚後按鈕會變成粉紅色並顯示「已按讚」

### 步驟 3: 部署到 Vercel

#### 方式 A: 使用 Vercel CLI（推薦）

1. 安裝 Vercel CLI（如果還沒有）：
   ```bash
   npm install -g vercel
   ```

2. 登入 Vercel：
   ```bash
   vercel login
   ```

3. 部署：
   ```bash
   vercel
   ```

   第一次部署時會詢問：
   - 確認專案設定（按 Enter 使用預設值）
   - 是否要連結現有專案或建立新專案

4. 部署到正式環境：
   ```bash
   vercel --prod
   ```

#### 方式 B: 透過 GitHub + Vercel 網頁介面

1. **推送程式碼到 GitHub**：
   ```bash
   git add .
   git commit -m "feat: add like functionality and prepare for deployment"
   git push origin main
   ```

2. **連結 Vercel**：
   - 前往 https://vercel.com
   - 登入你的帳號
   - 點擊 "Add New Project"
   - 選擇你的 GitHub repository
   - 點擊 "Import"

3. **設定環境變數**（重要！）：

   在 Vercel 專案設定中，前往 "Settings" > "Environment Variables"，加入以下變數：

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=405sg6n7
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=<從 .env.local 複製你的 token>
   RESEND_API_KEY=<從 .env.local 複製你的 API key>
   CONTACT_EMAIL=<你接收聯絡表單的 email>
   ```

   **注意**:
   - `NEXT_PUBLIC_*` 開頭的變數會暴露在前端，這是正常的
   - `SANITY_API_TOKEN` 和 `RESEND_API_KEY` 會保密在伺服器端
   - 確認 `SANITY_API_TOKEN` 有**寫入權限**（Editor 或 Admin）

4. **部署**：
   - 點擊 "Deploy"
   - Vercel 會自動建置和部署
   - 完成後會得到一個網址（例如 `your-project.vercel.app`）

5. **自動部署設定**：
   - 之後每次推送到 `main` 分支，Vercel 會自動重新部署
   - 推送到其他分支會創建預覽部署

### 步驟 4: 驗證部署

部署完成後：

1. **檢查網站**：
   - 訪問 Vercel 提供的網址
   - 測試按讚功能是否正常運作

2. **檢查環境變數**：
   - 在 Vercel Dashboard 確認所有環境變數都已設定
   - 特別確認 `SANITY_API_TOKEN` 有正確的寫入權限

3. **檢查 Sanity CORS 設定**：
   - 前往 https://www.sanity.io/manage
   - 選擇你的專案
   - 進入 "API" > "CORS Origins"
   - 加入你的 Vercel 網址（例如 `https://your-project.vercel.app`）
   - 勾選 "Allow credentials"

## 🔧 疑難排解

### 問題 1: 按讚後數字沒有增加

**解決方式**：
- 檢查 Sanity schema 是否有 `likes` 欄位
- 檢查 `SANITY_API_TOKEN` 是否有寫入權限
- 打開瀏覽器開發者工具，查看 Console 是否有錯誤訊息

### 問題 2: API 錯誤 (401 Unauthorized)

**解決方式**：
- 確認 Vercel 環境變數中的 `SANITY_API_TOKEN` 正確
- 在 Sanity 專案設定中生成新的 token（需要 Editor 或 Admin 權限）

### 問題 3: CORS 錯誤

**解決方式**：
- 在 Sanity 專案設定中加入你的 Vercel 網域到 CORS 白名單

### 問題 4: 本地測試正常，部署後無法按讚

**解決方式**：
- 檢查 Vercel 的環境變數是否都已設定
- 查看 Vercel 的部署日誌 (Deployment Logs) 是否有錯誤

## 📊 按讚功能架構說明

### 資料流程

1. **用戶點擊按讚** →
2. **前端送出 POST 請求** (`/api/likes`) →
3. **API 使用 SANITY_API_TOKEN 更新資料** →
4. **Sanity 資料庫儲存新的按讚數** →
5. **回傳更新後的數字給前端** →
6. **前端更新顯示並記錄到 localStorage**（防止重複按讚）

### 防止重複按讚機制

- 使用 **localStorage** 記錄用戶已按讚的文章
- 簡單有效，但用戶可清除瀏覽器資料後重新按讚
- 如需更嚴格的控制，可以考慮：
  - IP 追蹤（需要額外的資料庫）
  - Cookie 追蹤
  - 用戶登入系統

## 🎉 完成！

完成所有步驟後，你的部落格就有按讚功能了！

用戶可以：
- ❤️ 為喜歡的文章按讚
- 📊 看到每篇文章的按讚數
- 💾 按讚後狀態會保存（即使重新整理頁面）

## 🔗 相關連結

- Vercel 文件: https://vercel.com/docs
- Sanity 文件: https://www.sanity.io/docs
- Next.js 部署: https://nextjs.org/docs/deployment

---

如有問題，請檢查：
1. Sanity schema 是否已更新
2. 環境變數是否正確設定
3. CORS 設定是否包含你的網域
