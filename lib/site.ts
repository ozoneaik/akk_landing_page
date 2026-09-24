import type { PlatformId, ProductTheme } from "./platforms";

// ข้อมูลร้าน สินค้า และช่องทางติดต่อ แก้ได้ที่หลังบ้าน /admin
// ค่าในไฟล์นี้คือส่วนที่ไม่เปลี่ยนบ่อย

export const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export type SiteInfo = {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  address: string;
  hours: string;
};

export type ProductView = {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  tag: string | null;
  theme: ProductTheme;
  image: string | null;
  orderUrl: string | null;
  detailUrl: string | null;
};

export type ChannelView = {
  id: number;
  platform: PlatformId;
  name: string;
  label: string;
  detail: string;
  href: string;
  color: string;
  badge: string | null;
};

export type NavLink = { href: `#${string}`; label: string };

export const navLinks: NavLink[] = [
  { href: "#home", label: "หน้าแรก" },
  { href: "#products", label: "สินค้าแนะนำ" },
  { href: "#channels", label: "ช่องทางสั่งซื้อ" },
  { href: "#contact", label: "ติดต่อเรา" },
];

// "08x-xxx-xxxx" → "tel:+668xxxxxxxx"
export function toTelHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("0")) return `tel:+66${digits.slice(1)}`;
  return `tel:${digits}`;
}

export function uploadUrl(id: number): string {
  return `/api/uploads/${id}`;
}
