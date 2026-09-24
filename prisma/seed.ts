// ใส่ข้อมูลเริ่มต้น: npm run db:seed
// รันซ้ำได้ — จะไม่เขียนทับข้อมูลที่แก้ไขไว้ในหลังบ้าน
import "dotenv/config";
import bcrypt from "bcryptjs";
import { createClient } from "../lib/db-client";

const db = createClient();

async function main() {
  await db.siteSetting.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "ออฟ กิจเกษตร",
      tagline: "ครบเรื่องเกษตร ของแท้ ราคาเป็นกันเอง",
      description:
        "ออฟ กิจเกษตร ร้านขายอุปกรณ์การเกษตรและเคมีภัณฑ์ทางการเกษตรครบวงจร ยากำจัดวัชพืช ยากำจัดศัตรูพืช ปุ๋ย ฮอร์โมนพืช และเครื่องมือการเกษตร ของแท้ ราคาเป็นกันเอง พร้อมให้คำปรึกษาและจัดส่งทั่วประเทศ",
      phone: "08x-xxx-xxxx",
      address: "ที่อยู่ร้าน ตำบล อำเภอ จังหวัด",
      hours: "เปิดทุกวัน 07:00 – 18:00 น.",
    },
  });

  if ((await db.product.count()) === 0) {
    await db.product.createMany({
      data: [
        {
          category: "ยากำจัดวัชพืชและศัตรูพืช",
          name: "ยากำจัดวัชพืช & ยาฆ่าแมลง",
          description:
            "คัดสรรสูตรที่ได้ผลจริง ทั้งยาคุม ยาฆ่าหญ้า และยากำจัดเพลี้ย หนอน แมลงศัตรูพืช ปลอดภัยเมื่อใช้ตามฉลาก",
          price: 180,
          unit: "ขวด",
          tag: "ขายดี",
          theme: "chemical",
          sortOrder: 1,
        },
        {
          category: "ฮอร์โมนและปุ๋ยบำรุงพืช",
          name: "ปุ๋ย & ฮอร์โมนพืช",
          description:
            "ปุ๋ยเคมี ปุ๋ยอินทรีย์ และฮอร์โมนเร่งราก เร่งดอก ขยายผล ช่วยให้พืชแข็งแรง ผลผลิตเพิ่มขึ้น",
          price: 250,
          unit: "ถุง",
          tag: "แนะนำ",
          theme: "fertilizer",
          sortOrder: 2,
        },
        {
          category: "เครื่องมือและอุปกรณ์การเกษตร",
          name: "เครื่องมือ & อุปกรณ์การเกษตร",
          description:
            "ถังพ่นยา หัวฉีด สายยาง จอบ เสียม กรรไกรตัดแต่งกิ่ง และอุปกรณ์จำเป็นสำหรับสวนและไร่นา",
          price: 350,
          unit: "ชิ้น",
          tag: "คุ้มค่า",
          theme: "tools",
          sortOrder: 3,
        },
      ],
    });
    console.log("✔ เพิ่มสินค้าตัวอย่าง 3 รายการ");
  }

  if ((await db.channel.count()) === 0) {
    await db.channel.createMany({
      data: [
        { platform: "shopee", name: "Shopee", label: "ช้อปผ่าน Shopee", detail: "สั่งง่าย มีโค้ดส่วนลดและส่งฟรี", href: "https://shopee.co.th/", sortOrder: 1 },
        { platform: "lazada", name: "Lazada", label: "ช้อปผ่าน Lazada", detail: "ชำระเงินปลายทางได้ ส่งไว", href: "https://www.lazada.co.th/", sortOrder: 2 },
        { platform: "line", name: "LINE", label: "แชท & ดู LINE LIVE", detail: "สอบถาม สั่งซื้อ และดูไลฟ์ขายสินค้า", href: "https://line.me/R/ti/p/@example", badge: "LIVE", sortOrder: 3 },
        { platform: "facebook", name: "Facebook", label: "เพจ Facebook", detail: "อัปเดตโปรโมชันและความรู้การเกษตร", href: "https://www.facebook.com/", sortOrder: 4 },
        { platform: "tiktok", name: "TikTok", label: "ติดตามบน TikTok", detail: "คลิปสาธิตการใช้งานและไลฟ์สด", href: "https://www.tiktok.com/@example", sortOrder: 5 },
      ],
    });
    console.log("✔ เพิ่มช่องทางติดต่อตัวอย่าง 5 ช่องทาง");
  }

  if ((await db.adminUser.count()) === 0) {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    if (!username || !password || password === "change-me") {
      throw new Error("ตั้ง ADMIN_USERNAME และ ADMIN_PASSWORD ใน .env ก่อนรัน seed");
    }
    await db.adminUser.create({
      data: { username, passwordHash: await bcrypt.hash(password, 12) },
    });
    console.log(`✔ สร้างบัญชีแอดมิน "${username}"`);
  }
}

main()
  .then(() => db.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
