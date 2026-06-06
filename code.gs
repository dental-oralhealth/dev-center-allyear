// ====================================
// Google Apps Script for Multi-Year Data Combination
// Spreadsheet ID: 1Ny51WfA5yox-x9uNAhtYQYioyA9NQHJT
// Sheets: 2563, 2564, 2565, 2566, 2567, 2568
// ====================================

const SPREADSHEET_ID = "1yDcebhpG1ok0AfE3JlK2T0AtG1PWuGtEz1O2b7olLzw";
const SHEET_YEARS = ["2563", "2564", "2565", "2566", "2567", "2568"];

function doGet(e) {
  try {
    // Get combined data
    const allData = getCombinedData();
    
    if (!allData || allData.length === 0) {
      return ContentService.createTextOutput(JSON.stringify({error: "No data found"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Return as JSON
    return ContentService.createTextOutput(JSON.stringify(allData))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getCombinedData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const allData = [];
  
  // Loop through each year sheet
  for (const year of SHEET_YEARS) {
    try {
      const sheet = spreadsheet.getSheetByName(year);
      if (!sheet) {
        console.log(`Sheet ${year} not found`);
        continue;
      }
      
      // Get all data from sheet
      const range = sheet.getDataRange();
      const values = range.getValues();
      
      if (values.length === 0) continue;
      
      // First row = headers
      const headers = values[0].map(h => String(h).trim().toLowerCase()
        .replace(/\s+/g, '')
        .replace(/\./g, '_'));
      
      // Process data rows (skip header)
      for (let i = 1; i < values.length; i++) {
        const row = values[i];
        
        // Skip empty rows
        if (!row || row.every(cell => cell === "" || cell === null)) continue;
        
        // Create object from row
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = row[j] || "";
        }
        
        // Add/override year
        obj.year = year;
        
        allData.push(obj);
      }
      
      console.log(`Loaded ${values.length - 1} records from sheet ${year}`);
      
    } catch (error) {
      console.log(`Error processing sheet ${year}: ${error.message}`);
    }
  }
  
  console.log(`Total combined records: ${allData.length}`);
  return allData;
}

// Test function (run this to test)
function testGetData() {
  console.log('Testing data retrieval...');
  const data = getCombinedData();
  
  if (!data || data.length === 0) {
    console.log('❌ No data found');
    return;
  }
  
  console.log('✅ Data loaded successfully');
  console.log('Total records: ' + data.length);
  console.log('Sample record: ' + JSON.stringify(data[0]));
  
  // Check by year
  const years = [...new Set(data.map(r => r.year))];
  console.log('Years found: ' + years.join(', '));
}

function authorizeAndTest() {
  try {
    // This will trigger authorization
    const ss = SpreadsheetApp.openById("1yDcebhpG1ok0AfE3JlK2T0AtG1PWuGtEz1O2b7olLzw");
    console.log('✅ Spreadsheet authorized');
    console.log('Spreadsheet name: ' + ss.getName());
    
    // List all sheet names
    const sheets = ss.getSheets();
    console.log('Available sheets:');
    sheets.forEach(s => console.log('  - ' + s.getName()));
    
  } catch (error) {
    console.log('❌ Error: ' + error.message);
  }
}
// Deploy as web app:
// 1. Save this script
// 2. Click "Deploy" → "New deployment"
// 3. Type: "Web app"
// 4. Execute as: Your account
// 5. Who has access: "Anyone"
// 6. Copy the URL
// 7. Use in Dashboard as: fetch(URL + '?v=' + Date.now())
