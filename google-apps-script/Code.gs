const SHEET_NAME = "Leads";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const payload = JSON.parse(e.postData.contents || "{}");

    if (payload.website) {
      return jsonResponse({ ok: true, skipped: true });
    }

    const sheet = getLeadsSheet_();
    sheet.appendRow([
      new Date(),
      payload.submittedAt || "",
      payload.dentistName || "",
      payload.name || "",
      payload.phone || "",
      payload.service || "",
      payload.city || "",
      payload.preferredTime || "",
      payload.message || "",
      payload.consent || "",
      payload.source || "",
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function getLeadsSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Received At",
      "Submitted At",
      "Dentist",
      "Name",
      "Phone",
      "Service",
      "City",
      "Preferred Time",
      "Message",
      "Consent",
      "Source",
    ]);
  }

  return sheet;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
