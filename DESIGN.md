# Design System: 窩的家集團 — 新總部開幕活動報名網站
**Project ID:** wuohome-opening-event-2026

## 1. Visual Theme & Atmosphere

慶典感與專業感的平衡。背景是柔和的淺灰漸層，上面佈滿品牌色的氣球緩緩上升，營造開幕派對的歡樂氣氛。所有內容卡片使用毛玻璃（Glassmorphism）質感，讓氣球在內容後方若隱若現。整體氛圍是：歡迎你來參加一場隆重但溫暖的開幕活動。

金色紙花從天而降，微微發光，為畫面增添慶祝感。進場時會有一波紙花從底部噴射而上，隨後持續緩慢飄落。

整個頁面覆蓋一層輕薄的毛玻璃（白色 15% 不透明度 + 8px 模糊），讓氣球和紙花帶有朦朧的景深感，同時確保文字內容清晰可讀。

## 2. Color Palette & Roles

| 名稱 | 色碼 | 角色 |
|------|------|------|
| 深藍灰 Slate Navy | #3f5262 | 主色。按鈕、標題、導航列品牌字。傳達穩重專業 |
| 深藍灰（淺） | #5a7080 | 輔助。次要文字、hover 前的邊框 |
| 珊瑚紅 Coral | #dd6650 | 強調色。標籤 badge、重要提示星號、section 小標題。帶來活力與溫暖 |
| 珊瑚紅（淺） | #e8836f | 輔助強調。hover 狀態、漸層搭配 |
| 明黃 Bright Gold | #f2cf00 | 點綴色。紙花、部分氣球、贊助金額。象徵喜氣與慶祝 |
| 明黃（淺） | #f5d833 | 紙花色調變化用 |
| 白色 | #ffffff | 毛玻璃底色、卡片基底 |
| 背景灰 | linear-gradient(165deg, #f0f2f5 0%, #e8eaef 40%, #f5f0ee 100%) | 頁面底層背景。溫和的淺灰漸層，不搶視覺焦點 |
| 主文字色 | #1a2a3a | 標題與重要文字。接近黑色但帶藍調，比純黑更柔和 |
| 次要文字色 | #4a5568 | 內文描述段落 |
| 輔助文字色 | #8a94a6 | 小標籤、說明文字、時間戳記 |
| 海綠 | #2e8b57 | 跑馬燈中住商不動產的品牌識別色 |
| 暖橘 | #e67e22 | 跑馬燈中中信房屋與凌群不動產的品牌識別色 |
| 成功綠 | bg-green-50 + text-green-700 | 報名成功 modal、開放報名 badge |
| 警告橘 | bg-amber-50 + text-amber-700 | 即將額滿 badge |
| 錯誤紅 | bg-red-50 + text-red-700 | 已額滿 badge |

### 氣球顏色比例
- 深藍灰系 50%（沉穩主調）
- 珊瑚紅系 30%（活力點綴）
- 明黃系 20%（喜氣慶祝）

## 3. Typography Rules

- **字體家族**: Noto Sans TC — Google Fonts 中最完整的繁體中文無襯線字體，兼顧現代感與可讀性
- **備援字體**: -apple-system, BlinkMacSystemFont, system-ui, sans-serif
- **標題字重**: 900 (Black) — 大標題用最粗字重，撐起視覺份量
- **副標題字重**: 700 (Bold)
- **內文字重**: 400 (Regular)，說明文字用 300 (Light) 營造輕盈感
- **標題大小**: 響應式 clamp，手機 2.25rem → 桌面 3.5rem
- **內文大小**: 0.875rem (14px) 至 1.125rem (18px)
- **Letter-spacing**: 標題 tight (-0.025em)，小標籤 widest (0.1em) 搭配全大寫英文
- **行高**: 內文 1.625 (relaxed)，確保中文閱讀舒適

## 4. Component Stylings

### Buttons — Primary
- **形狀**: 全圓角膠囊型（border-radius: 9999px），友善不銳利
- **底色**: 深藍灰 #3f5262，帶有 0 4px 14px 的品牌色陰影
- **Hover**: 變為珊瑚紅 #dd6650，陰影加深擴大，微微上移 1px — 從穩重切換到熱情
- **Active**: 深珊瑚 #c4553f，回彈至原位
- **Disabled**: 50% 透明度，cursor not-allowed
- **文字**: 白色、粗體、帶右箭頭 SVG icon

### Cards — Glass Morphism（三階）
- **標準 glass**: 白色 72% 不透明 + backdrop-filter blur 50px + 飽和度 180%，1px 白色 55% 邊框，圓角 24px (rounded-3xl)
- **加強 glass-strong**: 白色 88% + blur 60px + 飽和度 200% — 用於表單區塊、成功 modal，需要更高可讀性
- **輕量 glass-subtle**: 白色 55% + blur 40px + 飽和度 160% — 用於小標籤、倒數計時格子
- **所有 glass 卡片**: 帶有 box-shadow 0 8px 32px rgba(0,0,0,0.06)，營造浮起感

### Floor Cards（樓層介紹）
- 使用標準 glass 卡片
- 左側大字樓層號（3.5rem, 900 weight），深藍灰漸層填色但只有 20% 不透明度，hover 時提升到 45%
- hover: 整張卡片上移 4px + 陰影加深
- 各樓層有彩色小 badge 標注功能類型（REAL ESTATE / DESIGN / LEASING 等）
- 服務標籤用小圓角 pill (rounded-full)，細邊框

### Session Cards（場次選擇）
- glass 卡片 + 右上角勾選框（22x22px, 圓角 6px）
- 未選：空框 + 淡邊框
- 已選：深藍灰填滿 + 白色勾勾 SVG + 卡片邊框變深
- 額滿：40% 透明度 + cursor not-allowed
- 底部有容量進度條（2px 高，深藍灰/警告黃/錯誤紅）

### Form Inputs
- 白色 60% 背景 + 8% 黑色邊框 + 圓角 12px (rounded-xl)
- Focus: 邊框變深藍灰 + 外圈 3px 品牌色 10% 光暈
- Placeholder: 輔助文字色
- Select: 自訂下拉箭頭 SVG

### Navigation Bar
- 固定頂部，初始透明
- 滾動後套用 glass-strong 效果（毛玻璃導航列）
- 左：品牌字 "WUOHOME"（tracking 3px, 粗體, 深藍灰）
- 右：膠囊型 CTA 按鈕

### Countdown Timer
- 4 個 glass-subtle 卡片並排
- 數字：2xl 粗體黑
- 標籤：10px 輔助文字色
- 最小寬度 68px，確保數字變化時不跳動

## 5. Layout Principles

- **最大內容寬度**: max-w-6xl (1152px)，大區塊 max-w-5xl (1024px)
- **留白策略**: Section 間距 py-24 (96px)，內容間用 space-y-5 或 gap-12
- **Grid**: Hero 區塊 lg:grid-cols-2，報名區塊 lg:grid-cols-2，樓層介紹單欄堆疊
- **響應式斷點**: Tailwind 預設 — sm(640) / md(768) / lg(1024)
- **手機優先**: 標題響應式縮放、Hero 單欄、session cards 全寬

## 6. Animation & Effects

### 氣球系統
- **生成方式**: JavaScript 動態建立 45 顆 SVG 氣球
- **形狀**: SVG path 水滴體 + 橢圓高光反射 + 正三角形打結 + 空心蝴蝶結 + 捲曲飄繩
- **6 層景深**: 近景（大+清晰）→ 遠景（小+模糊 16px），近大遠小
- **飄動**: CSS animation `floatUp` 線性上升，`sway` 左右搖擺
- **繩子**: SVG path `d` 屬性動畫，3 種擺幅交替，模擬被風吹動
- **淡出**: 最後 15% 路程漸變透明，像飄遠而非消失

### 金色紙花
- **持續飄落**: Canvas 動畫，約 45 片長方形紙花
- **翻轉效果**: scaleX 變化模擬紙片在空中翻滾，側面時變暗
- **微發光**: shadowBlur 6px 金色光暈
- **進場即滿畫面**: 初始化時紙花散佈全螢幕，不從空開始
- **進場爆發**: 頁面載入時額外 200 片從底部往上噴射，4.5 秒後淡出

### 跑馬燈
- overflow: hidden + inline-block + translateX(-50%) 無縫循環
- 20 秒一輪，勻速滾動
- 各品牌名稱獨立顏色，「/」分隔符用深藍灰

### 其他動畫
- **Scroll Reveal**: 元素進入視窗時 opacity 0→1 + translateY 24px→0，0.7s ease-out
- **延遲序列**: reveal-d1 到 reveal-d4，每個延遲 0.1s，製造瀑布進場效果
- **按鈕 hover**: translateY(-1px) + 陰影擴大，0.2s ease
- **表單 focus**: 邊框色變化 + 外圈光暈，0.2s ease

## 7. Marquee（跑馬燈）

品牌名稱滾動展示，放在 Hero 與樓層介紹之間：
- 背景: 深藍灰 6% + backdrop-filter blur 8px
- 上下 1px 邊框（深藍灰 8%）
- 文字 20px 粗體，各品牌獨立顏色
- 分隔符「/」用深藍灰 50% 不透明度

## 8. Special Notes

- **毛玻璃覆蓋層**: 整個頁面在氣球層和內容層之間有一層固定的毛玻璃（白色 15% + blur 8px），讓氣球有景深朦朧感
- **不透明度**: 所有氣球 100% 不透明，靠毛玻璃層和 blur 景深製造層次
- **confetti 成功動畫**: 報名成功時額外觸發彩色紙花爆發（品牌色混合）
- **GAS 串接**: 表單提交到 Google Apps Script，支援即時名額查詢
- **Accessibility**: prefers-reduced-motion 時關閉所有動畫，表單有 label + required
