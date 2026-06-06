# 📋 Deployment Guide: Multi-Year Dashboard (2563-2568)

---

## **PART 1: Google Apps Script Setup**

### **Step 1: Create Google Apps Script Project**

1. ไปที่ **script.google.com**
2. Click **"New project"**
3. ชื่อ project: `สพด Multi-Year Data`

### **Step 2: Copy Code**

1. ลบ code เดิม ทั้งหมด
2. Copy-paste code จากไฟล์ `GoogleAppsScript.gs` (ส่งให้แล้ว)
3. **Save** (Ctrl+S)

### **Step 3: Test Script**

1. Click **"Run"** (หรือ play button)
2. ให้ permission แรกครั้ง
3. ดู **Execution log** ด้านล่าง ควรเห็น:
   ```
   Loaded XXX records from sheet 2563
   Loaded XXX records from sheet 2564
   ...
   Total combined records: XXXXX
   ```

✅ **ถ้า error:** ตรวจสอบ:
- Sheet names ถูกไหม (ต้องเป็น "2563", "2564", etc.)
- Spreadsheet ID ถูกไหม (line 1 ของ code)

### **Step 4: Deploy as Web App**

1. Click **"Deploy"** → **"New deployment"**
2. เลือก Type: **"Web app"**
3. ตั้งค่า:
   - Execute as: **Your email**
   - Who has access: **Anyone**
4. Click **"Deploy"**
5. **Copy URL** (สำคัญ!)
   ```
   https://script.google.com/macros/s/ABC123DEF456/usercontent
   ```

✅ **เก็บ URL นี้ไว้** - ใช้ใน Dashboard

---

## **PART 2: Update Dashboard**

### **Step 5: Edit Dashboard HTML**

1. เปิดไฟล์ `dashboard-3tab.html`
2. ค้นหา: `const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'`
3. เปลี่ยนเป็น:
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/ABC123DEF456/usercontent';
   ```
   (ใช้ URL จาก Step 4)

4. **Save** ไฟล์

### **Step 6: Test Locally (Optional)**

1. Double-click ไฟล์ `dashboard-3tab.html` เปิดใน Browser
2. ควรเห็น data load + charts แสดง
3. Test 3 tabs

✅ **ถ้า error "No data found":**
- ตรวจสอบ SCRIPT_URL ถูกไหม
- ตรวจสอบ permissions (ต้องเป็น "Anyone")

---

## **PART 3: Upload to GitHub**

### **Step 7: Update GitHub Repo**

1. ไปที่ repo: `https://github.com/dental-oralhealth/development-center`

2. **Upload/Replace files:**
   - ✅ `index.html` → เปลี่ยนเป็น `dashboard-3tab.html`
   - ✅ ลบ `data-min.json` (ไม่ต้องใช้แล้ว)
   - ✅ ลบ `pako-inline.js` (ไม่ต้องใช้แล้ว)

3. **Commit changes** + Push

### **Step 8: GitHub Pages Settings**

1. ไปที่ **Settings** → **Pages**
2. ตรวจสอบ:
   - Source: **main branch**
   - Folder: **root (/)**
3. Save

---

## **PART 4: Test Dashboard**

### **Step 9: Open Live Dashboard**

1. ไปที่:
   ```
   https://dental-oralhealth.github.io/development-center/dashboard-3tab.html
   ```

2. ควรเห็น:
   - ✅ 3 tabs: Overview, Comparison, Current Year
   - ✅ Data load + charts
   - ✅ Responsive ในทุก device

### **Step 10: Test Responsive**

**ทดสอบในทุก device:**

#### **Desktop (1200px+):**
- [ ] Charts แสดงสมบูรณ์
- [ ] Tabs อยู่แนว horizontal
- [ ] ไม่ scroll ไม่ได้

#### **Tablet (768px-1000px):**
- [ ] Charts responsive
- [ ] Tabs ยังสะดวก
- [ ] Scroll ได้ปกติ

#### **Smartphone (480px):**
- [ ] Charts resize ได้ดี
- [ ] Tabs stack หรือ scroll horizontal
- [ ] Input fields สะดวก
- [ ] Table scrollable ได้

**ใช้ DevTools (F12) ทดสอบ:**
- Tablet: เปลี่ยน viewport เป็น 768x1024
- Mobile: เปลี่ยน viewport เป็น 375x667

---

## **PART 5: Future Updates (ปีต่อๆไป)**

### **เมื่อปีใหม่มาข้อมูล (เช่น 2569):**

1. **เพิ่ม Sheet ใหม่** ใน Google Sheets:
   - Sheet name: `2569`
   - Copy headers จากปี 2568
   - Paste data จริง

2. **Google Apps Script จะ auto-detect** 
   - ไม่ต้องแก้ code เลย
   - ไม่ต้องทำอะไร

3. **Dashboard จะ auto-update**
   - Tabs จะเพิ่ม 2569 โดยอัตโนมัติ
   - Trend chart จะยาวขึ้น

✅ **ไม่ต้องมา GitHub เลย!**

---

## **Troubleshooting**

### **❌ "No data found" or blank page:**

1. ตรวจสอบ SCRIPT_URL ใน dashboard HTML:
   - Copy-paste ได้ถูก?
   - ต้องเป็น `usercontent` (ไม่ใช่ `/usercontent`)

2. ตรวจสอบ Google Apps Script permissions:
   - Deploy → ต้องเป็น "Anyone"
   - ไม่ใช่ "Only me"

3. ตรวจสอบ Sheet names:
   - ต้องเป็น "2563", "2564", etc. (ตรงกับ code)
   - ไม่มี spaces หรือ special characters

### **❌ Charts ไม่แสดง:**

1. Open Browser Console (F12)
2. ดู error message
3. ลอง refresh (Ctrl+F5)

### **❌ Responsive ไม่ทำงาน:**

1. ตรวจสอบ viewport meta tag ใน HTML:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. ลอง DevTools → toggle device toolbar (Ctrl+Shift+M)

---

## **Checklist Before Go-Live**

- [ ] Google Apps Script deployed ✅
- [ ] SCRIPT_URL ถูก ✅
- [ ] Data load ได้ ✅
- [ ] 3 tabs ทำงาน ✅
- [ ] Charts แสดง ✅
- [ ] Responsive: Desktop ✅
- [ ] Responsive: Tablet ✅
- [ ] Responsive: Mobile ✅
- [ ] Upload GitHub ✅
- [ ] Pages setting ถูก ✅
- [ ] Live URL ทำงาน ✅

---

## **Support URLs**

- 🎯 Live Dashboard: `https://dental-oralhealth.github.io/development-center/dashboard-3tab.html`
- 📊 Google Apps Script: `https://script.google.com/`
- 📁 GitHub Repo: `https://github.com/dental-oralhealth/development-center`

---

## **ติดตรงไหน?**

1. บอกพอแตก error message
2. ส่ง screenshot
3. ผมช่วยแก้ให้ 👍

---

**Good luck! 🚀**
