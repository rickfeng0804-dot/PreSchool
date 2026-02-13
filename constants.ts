import { Grade, ClassName, ContentType } from './types';

export const GRADES: Grade[] = ['幼幼班', '小班', '中班', '大班'];

export const CLASSES: ClassName[] = ['蘋果', '香蕉', '櫻桃', '葡萄', '草莓', '檸檬'];

export const CONTENT_TYPES: ContentType[] = ['Word', 'PPT', 'Canva', 'Excel', '照片', '影片'];

export const ADMIN_PASSWORD = "AISchool";

export const MOCK_GAS_CODE = `
// ----------------------------------------------------
// Google Apps Script (Code.gs) for 
// 愛愛幼兒園學習歷程系統 (Love Love Kindergarten)
// ----------------------------------------------------

// 1. Setup global variables
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Students';

// 2. Serve the Web App (GET Request)
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setTitle('愛愛幼兒園學習歷程系統')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// 3. Handle Form Submission (POST Request)
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    
    // Add timestamp
    const timestamp = new Date();
    
    sheet.appendRow([
      timestamp,
      data.id,
      data.name,
      data.grade,
      data.className,
      data.gender,
      data.contentType,
      data.link,
      data.description
    ]);

    return ContentService.createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// 4. Helper function to setup sheet headers (Run once)
function setupSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'ID', 'Name', 'Grade', 'Class', 'Gender', 'Type', 'Link', 'Description']);
  }
}
`;