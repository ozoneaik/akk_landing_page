# ออฟ กิจเกษตร — เว็บไซต์ + หลังบ้าน

Next.js 16 · TypeScript · Tailwind CSS 4 · Framer Motion · Prisma 7

## เริ่มใช้งานครั้งแรก

```bash
cp .env.example .env        # แล้วแก้ AUTH_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD
npm install
npm run db:setup            # สร้างตาราง + ใส่ข้อมูลตัวอย่าง + สร้างบัญชีแอดมิน
npm run dev
```

- หน้าเว็บ: http://localhost:3000
- หลังบ้าน: http://localhost:3000/admin

## หลังบ้าน (/admin)

| เมนู | ทำอะไรได้ |
|---|---|
| สินค้า | เพิ่ม / แก้ไข / ลบ / ซ่อนสินค้า, อัปโหลดรูป, ตั้งราคา, ลิงก์ปุ่มสั่งซื้อรายสินค้า, ลำดับการแสดง |
| ช่องทางติดต่อ | Shopee, Lazada, LINE, Facebook, TikTok, YouTube, Instagram, เว็บไซต์ — แก้ลิงก์ ข้อความ ป้าย LIVE และลำดับ |
| ข้อมูลร้าน | ชื่อร้าน เบอร์โทร ที่อยู่ เวลาเปิด-ปิด คำอธิบายสำหรับ Google, เปลี่ยนรหัสผ่าน |

แก้แล้วหน้าเว็บอัปเดตทันที

## เปลี่ยนฐานข้อมูล (SQLite → PostgreSQL / MySQL)

1. แก้ `DATABASE_URL` ใน `.env`
   ```
   DATABASE_URL="postgresql://user:password@host:5432/off_kitkaset"
   ```
2. สร้างตารางและข้อมูลเริ่มต้นในฐานข้อมูลใหม่
   ```bash
   npm run db:setup
   ```

สคริปต์ `scripts/sync-db-provider.mjs` จะปรับ `prisma/schema.prisma` ให้ตรงกับ `DATABASE_URL` อัตโนมัติ
(ชนิดฐานข้อมูล และคอลัมน์ข้อความยาวเป็น `TEXT`) — ไม่ต้องแก้ schema เอง

**MySQL / MariaDB** ต้องติดตั้ง driver เพิ่ม: `npm i @prisma/adapter-mariadb` แล้วทำตามคอมเมนต์ใน `lib/db-client.ts`

> ข้อมูลเดิมใน SQLite จะไม่ถูกย้ายไปอัตโนมัติ `db:setup` จะใส่ข้อมูลตัวอย่างให้ใหม่
> ถ้าต้องการย้ายข้อมูลจริง ให้ export/import หรือกรอกใหม่ในหลังบ้าน

## คำสั่งที่ใช้บ่อย

| คำสั่ง | ใช้ทำอะไร |
|---|---|
| `npm run dev` | รันเว็บสำหรับพัฒนา |
| `npm run build` / `npm start` | build และรันแบบ production |
| `npm run db:setup` | สร้าง/อัปเดตตาราง + ใส่ข้อมูลเริ่มต้น (รันซ้ำได้ ไม่ทับข้อมูลเดิม) |
| `npm run db:push` | อัปเดตตารางหลังแก้ `prisma/schema.prisma` |
| `npm run db:studio` | เปิดดู/แก้ข้อมูลในฐานข้อมูลโดยตรง |
| `npm run typecheck` | ตรวจ TypeScript |

## ขึ้นเว็บจริง

- ตั้ง `SITE_URL` เป็นโดเมนจริง (ใช้กับ SEO, sitemap)
- ตั้ง `AUTH_SECRET` ใหม่ (`openssl rand -base64 32`) และใช้รหัสผ่านแอดมินที่เดายาก
- ใช้ HTTPS (cookie ล็อกอินตั้งเป็น `secure` ใน production)
- ถ้ารันหลัง reverse proxy (nginx, Caddy, Cloudflare) ให้ตั้ง `TRUST_PROXY="true"` เพื่อจำกัดการล็อกอินผิดต่อ IP ด้วย (ไม่ตั้ง = จำกัดต่อชื่อผู้ใช้อย่างเดียว)
- รูปสินค้าที่อัปโหลดเก็บในฐานข้อมูล — ย้ายเซิร์ฟเวอร์/ย้ายฐานข้อมูลแล้วรูปไม่หาย
- SQLite เหมาะกับเซิร์ฟเวอร์เครื่องเดียว (VPS) — ถ้าใช้ Vercel หรือ serverless ให้เปลี่ยนเป็น PostgreSQL
