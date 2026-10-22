# Compressive Strength Test

เว็บคำนวณผลทดสอบกำลังอัดปูนซีเมนต์ เปิดใช้งานได้จากเบราว์เซอร์โดยไม่ต้องติดตั้งโปรแกรม

## เผยแพร่ด้วย GitHub Pages

1. สร้าง GitHub repository แล้วอัปโหลดไฟล์ในโฟลเดอร์นี้
2. ไปที่ **Settings → Pages** และตั้ง **Build and deployment → Source** เป็น **GitHub Actions**
3. หลังจาก push ไปยัง branch `main` หรือ `master` workflow จะเผยแพร่เว็บให้อัตโนมัติ
4. เปิดลิงก์ที่แสดงใน **Settings → Pages** หรือในรายการ workflow run

`index.html`, `app.js` และ `styles.css` เป็นไฟล์เว็บทั้งหมด ส่วน workflow อยู่ใน `.github/workflows/deploy-pages.yml`
