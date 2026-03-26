/**
 * 窩的家開幕活動報名 — Google Apps Script
 *
 * 使用方式：
 * 1. 打開原本的 Google Sheet（開幕投票用的那個）
 * 2. 新增一個工作表，命名為「報名」
 * 3. 在「報名」工作表第一行寫入欄位標題：
 *    A: 時間戳記 | B: 姓名 | C: 電話 | D: 單位 | E: 身份分類 | F: 場次 | G: 場次名稱
 * 4. 打開 Apps Script 編輯器（擴充功能 → Apps Script）
 * 5. 把原本的程式碼「全部替換」成這份
 * 6. 重新部署：部署 → 管理部署作業 → 編輯（筆圖示） → 版本選「新版本」→ 部署
 *    （網址不變，不需要改前端的 GAS_URL）
 */

const SHEET_NAME = '報名';
const MAX_PER_SESSION = 30;

// GET — 查詢各場次目前報名人數
function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'counts';

  if (action === 'counts') {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet || sheet.getLastRow() <= 1) {
      return jsonResponse({ morning: 0, afternoon1: 0, afternoon2: 0 });
    }

    const data = sheet.getRange(2, 6, sheet.getLastRow() - 1, 1).getValues(); // Column F = session
    const counts = { morning: 0, afternoon1: 0, afternoon2: 0 };

    data.forEach(row => {
      const session = row[0];
      if (counts.hasOwnProperty(session)) {
        counts[session]++;
      }
    });

    return jsonResponse(counts);
  }

  return jsonResponse({ error: 'Unknown action' });
}

// POST — 新增報名
function doPost(e) {
  try {
    const raw = JSON.parse(e.postData.contents);
    const name = decodeURIComponent(raw.name);
    const phone = raw.phone;
    const unit = decodeURIComponent(raw.unit);
    const identity = decodeURIComponent(raw.identity);
    const session = raw.session;
    const sessionLabel = raw.sessionLabel ? decodeURIComponent(raw.sessionLabel) : session;
    const timestamp = raw.timestamp ? decodeURIComponent(raw.timestamp) : null;

    // Validate required fields
    if (!name || !phone || !unit || !identity || !session) {
      return jsonResponse({ success: false, error: 'Missing required fields' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      // Auto-create sheet if not exists
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const newSheet = ss.insertSheet(SHEET_NAME);
      newSheet.appendRow(['時間戳記', '姓名', '電話', '單位', '身份分類', '場次', '場次名稱']);
    }

    const targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Check capacity
    if (targetSheet.getLastRow() > 1) {
      const sessions = targetSheet.getRange(2, 6, targetSheet.getLastRow() - 1, 1).getValues();
      const count = sessions.filter(r => r[0] === session).length;
      if (count >= MAX_PER_SESSION) {
        return jsonResponse({ success: false, error: 'Session full' });
      }
    }

    // Append row
    targetSheet.appendRow([
      timestamp || new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' }),
      name,
      phone,
      unit,
      identity,
      session,
      sessionLabel || session
    ]);

    return jsonResponse({ success: true });

  } catch (err) {
    return jsonResponse({ success: false, error: err.message });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
