import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";

// เลือก driver ตาม DATABASE_URL — เปลี่ยนฐานข้อมูลได้โดยแก้ .env อย่างเดียว
function createAdapter(url: string) {
  if (url.startsWith("file:")) return new PrismaBetterSqlite3({ url });
  if (/^postgres(ql)?:\/\//.test(url)) return new PrismaPg({ connectionString: url });
  if (/^(mysql|mariadb):\/\//.test(url)) {
    // MySQL: npm i @prisma/adapter-mariadb แล้วแทนบรรทัดนี้ด้วย
    //   return new PrismaMariaDb(url);   (import { PrismaMariaDb } from "@prisma/adapter-mariadb")
    throw new Error("ยังไม่ได้ติดตั้ง adapter สำหรับ MySQL — ดูคำแนะนำใน lib/db.ts");
  }
  throw new Error(`ไม่รองรับ DATABASE_URL รูปแบบนี้: ${url.split(":")[0]}:`);
}

export function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("ไม่พบ DATABASE_URL ใน .env");
  return new PrismaClient({ adapter: createAdapter(url) });
}
