import "server-only";
import { db } from "./db";
import { PLATFORMS, isPlatformId, isProductTheme } from "./platforms";
import { uploadUrl, type ChannelView, type ProductView, type SiteInfo } from "./site";

export const DEFAULT_SITE: SiteInfo = {
  name: "ออฟ กิจเกษตร",
  tagline: "ครบเรื่องเกษตร ของแท้ ราคาเป็นกันเอง",
  description:
    "ออฟ กิจเกษตร ร้านขายอุปกรณ์การเกษตรและเคมีภัณฑ์ทางการเกษตรครบวงจร ยากำจัดวัชพืช ยากำจัดศัตรูพืช ปุ๋ย ฮอร์โมนพืช และเครื่องมือการเกษตร ของแท้ ราคาเป็นกันเอง พร้อมให้คำปรึกษาและจัดส่งทั่วประเทศ",
  phone: "08x-xxx-xxxx",
  address: "ที่อยู่ร้าน ตำบล อำเภอ จังหวัด",
  hours: "เปิดทุกวัน 07:00 – 18:00 น.",
};

export async function getSiteInfo(): Promise<SiteInfo> {
  const row = await db.siteSetting.findUnique({ where: { id: 1 } });
  if (!row) return DEFAULT_SITE;
  const { name, tagline, description, phone, address, hours } = row;
  return { name, tagline, description, phone, address, hours };
}

export async function getActiveProducts(): Promise<ProductView[]> {
  const rows = await db.product.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  return rows.map((p) => ({
    id: p.id,
    category: p.category,
    name: p.name,
    description: p.description,
    price: p.price,
    unit: p.unit,
    tag: p.tag,
    theme: isProductTheme(p.theme) ? p.theme : "chemical",
    image: p.imageId ? uploadUrl(p.imageId) : p.imageUrl,
    orderUrl: p.orderUrl,
    detailUrl: p.detailUrl,
  }));
}

export async function getActiveChannels(): Promise<ChannelView[]> {
  const rows = await db.channel.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });
  return rows.flatMap((c) =>
    isPlatformId(c.platform)
      ? [
          {
            id: c.id,
            platform: c.platform,
            name: c.name,
            label: c.label,
            detail: c.detail,
            href: c.href,
            color: PLATFORMS[c.platform].color,
            badge: c.badge,
          },
        ]
      : [],
  );
}
