// แพลตฟอร์มที่เลือกได้ในหลังบ้าน (ไอคอนอยู่ที่ components/BrandIcon.tsx)
export const PLATFORMS = {
  shopee: { name: "Shopee", color: "#EE4D2D" },
  lazada: { name: "Lazada", color: "#0F146D" },
  line: { name: "LINE", color: "#06C755" },
  facebook: { name: "Facebook", color: "#1877F2" },
  tiktok: { name: "TikTok", color: "#111111" },
  youtube: { name: "YouTube", color: "#FF0000" },
  instagram: { name: "Instagram", color: "#E1306C" },
  website: { name: "เว็บไซต์", color: "#16643b" },
} as const;

export type PlatformId = keyof typeof PLATFORMS;

export const PLATFORM_IDS = Object.keys(PLATFORMS) as [PlatformId, ...PlatformId[]];

export function isPlatformId(value: string): value is PlatformId {
  return value in PLATFORMS;
}

// ภาพจำลองสินค้า (ใช้เมื่อไม่มีรูปจริง)
export const PRODUCT_THEMES = {
  chemical: "ขวดยา / เคมีภัณฑ์",
  fertilizer: "กระสอบปุ๋ย",
  tools: "เครื่องมือ / อุปกรณ์",
} as const;

export type ProductTheme = keyof typeof PRODUCT_THEMES;

export const PRODUCT_THEME_IDS = Object.keys(PRODUCT_THEMES) as [ProductTheme, ...ProductTheme[]];

export function isProductTheme(value: string): value is ProductTheme {
  return value in PRODUCT_THEMES;
}
