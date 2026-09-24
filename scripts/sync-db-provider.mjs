// ตั้งค่า provider ใน prisma/schema.prisma ให้ตรงกับ DATABASE_URL อัตโนมัติ
// ทำให้การย้ายฐานข้อมูลทำได้โดยเปลี่ยนแค่ DATABASE_URL ในไฟล์ .env
import "dotenv/config";
import { readFileSync, writeFileSync } from "node:fs";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✖ ไม่พบ DATABASE_URL — คัดลอก .env.example เป็น .env ก่อน");
  process.exit(1);
}

const provider = url.startsWith("file:")
  ? "sqlite"
  : /^postgres(ql)?:\/\//.test(url)
    ? "postgresql"
    : /^(mysql|mariadb):\/\//.test(url)
      ? "mysql"
      : null;

if (!provider) {
  console.error(`✖ ไม่รู้จักรูปแบบ DATABASE_URL: ${url.split(":")[0]}:`);
  process.exit(1);
}

const path = new URL("../prisma/schema.prisma", import.meta.url);
const schema = readFileSync(path, "utf8");
const next = schema
  .replace(/(datasource db \{[^}]*provider\s*=\s*)"[^"]*"/, `$1"${provider}"`)
  // MySQL เก็บ String เป็น VARCHAR(191) — ฟิลด์ข้อความยาว ("// long") ต้องเป็น TEXT
  .replace(
    /^(\s+\w+\s+String\??)(?: @db\.Text)?(\s+\/\/ long\b.*)$/gm,
    `$1${provider === "sqlite" ? "" : " @db.Text"}$2`,
  );

if (next !== schema) {
  writeFileSync(path, next);
  console.log(`✔ ปรับ prisma/schema.prisma สำหรับ "${provider}"`);
}
