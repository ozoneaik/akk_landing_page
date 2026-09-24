import Image from "next/image";
import type { ProductTheme } from "@/lib/platforms";

// รูปสินค้าจำลอง (SVG) — ใช้เมื่อยังไม่ได้อัปโหลดรูปในหลังบ้าน
const backgrounds: Record<ProductTheme, string> = {
  chemical: "from-brand-100 via-brand-50 to-white",
  fertilizer: "from-harvest-400/35 via-[#fdf6e3] to-white",
  tools: "from-[#d6ece9] via-[#eef7f5] to-white",
};

type ProductImageProps = {
  theme: ProductTheme;
  label: string;
  image?: string | null;
};

export default function ProductImage({ theme, label, image }: ProductImageProps) {
  if (image) {
    return (
      <Image
        src={image}
        alt={label}
        fill
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
        // รูปจากลิงก์ภายนอกแสดงตรงๆ ไม่ผ่านระบบย่อรูปของ Next.js
        unoptimized={/^https?:\/\//.test(image)}
      />
    );
  }

  return (
    <div className={`relative h-full w-full bg-gradient-to-br ${backgrounds[theme]}`}>
      <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label={`ภาพจำลอง ${label}`}>
        <ellipse cx="160" cy="212" rx="110" ry="12" fill="#11422a" opacity="0.08" />
        {theme === "chemical" && <Chemical />}
        {theme === "fertilizer" && <Fertilizer />}
        {theme === "tools" && <Tools />}
      </svg>
    </div>
  );
}

function Chemical() {
  return (
    <g>
      {/* ขวดใหญ่ */}
      <rect x="112" y="54" width="36" height="22" rx="4" fill="#145031" />
      <path d="M100 86 Q100 74 116 74 H144 Q160 74 160 86 V200 Q160 210 150 210 H110 Q100 210 100 200Z" fill="#1a7d47" />
      <rect x="108" y="110" width="44" height="62" rx="6" fill="#fff" />
      <rect x="114" y="120" width="32" height="6" rx="3" fill="#289b5a" />
      <rect x="114" y="132" width="24" height="4" rx="2" fill="#b3e6c3" />
      <path d="M130 144 c0 -8 8 -14 16 -14 c0 8 -7 14 -16 14Z" fill="#4bb777" />
      <rect x="114" y="158" width="32" height="4" rx="2" fill="#d8f3df" />
      {/* ขวดเล็ก */}
      <rect x="182" y="96" width="26" height="16" rx="3" fill="#b45309" />
      <path d="M172 122 Q172 112 184 112 H206 Q218 112 218 122 V200 Q218 210 208 210 H182 Q172 210 172 200Z" fill="#eaa92b" />
      <rect x="178" y="138" width="34" height="44" rx="5" fill="#fff" />
      <rect x="183" y="146" width="24" height="5" rx="2.5" fill="#eaa92b" />
      <rect x="183" y="156" width="16" height="4" rx="2" fill="#fde9b8" />
      {/* ละอองสเปรย์ */}
      <g fill="#4bb777">
        <circle cx="72" cy="80" r="5" opacity="0.7" />
        <circle cx="58" cy="100" r="3.5" opacity="0.5" />
        <circle cx="80" cy="112" r="4" opacity="0.6" />
        <circle cx="244" cy="70" r="4" opacity="0.5" />
        <circle cx="258" cy="92" r="6" opacity="0.35" />
      </g>
    </g>
  );
}

function Fertilizer() {
  return (
    <g>
      {/* กระสอบปุ๋ย */}
      <path d="M96 64 Q160 50 224 64 L232 196 Q160 214 88 196Z" fill="#fff" stroke="#e8dcb8" strokeWidth="2" />
      <path d="M96 64 Q160 50 224 64 L222 80 Q160 68 98 80Z" fill="#16643b" />
      <circle cx="160" cy="128" r="30" fill="#effaf2" />
      <path d="M160 150 V122" stroke="#16643b" strokeWidth="4" strokeLinecap="round" />
      <path d="M160 126 c0 -14 10 -22 24 -22 c0 14 -10 22 -24 22Z" fill="#4bb777" />
      <path d="M160 136 c0 -12 -9 -19 -21 -19 c0 12 9 19 21 19Z" fill="#80d29f" />
      <rect x="120" y="170" width="80" height="8" rx="4" fill="#eaa92b" />
      <rect x="132" y="182" width="56" height="5" rx="2.5" fill="#f5c451" opacity="0.6" />
      {/* เม็ดปุ๋ย */}
      <g fill="#eaa92b">
        <circle cx="246" cy="196" r="5" />
        <circle cx="258" cy="202" r="4" opacity="0.8" />
        <circle cx="240" cy="206" r="3.5" opacity="0.7" />
      </g>
      <g fill="#4bb777">
        <circle cx="72" cy="200" r="4" />
        <circle cx="62" cy="192" r="3" opacity="0.7" />
      </g>
    </g>
  );
}

function Tools() {
  return (
    <g>
      {/* ถังพ่นยา */}
      <rect x="92" y="70" width="84" height="130" rx="18" fill="#16643b" />
      <rect x="100" y="80" width="68" height="14" rx="7" fill="#289b5a" />
      <rect x="104" y="112" width="60" height="50" rx="8" fill="#fff" />
      <path d="M134 150 c0 -10 7 -16 16 -16 c0 10 -7 16 -16 16Z" fill="#4bb777" />
      <rect x="112" y="122" width="30" height="5" rx="2.5" fill="#1a7d47" />
      <rect x="120" y="58" width="28" height="14" rx="5" fill="#11422a" />
      {/* สายและหัวฉีด */}
      <path d="M176 176 C 214 176 214 110 238 92" stroke="#11422a" strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="232" y="72" width="10" height="36" rx="4" transform="rotate(38 237 90)" fill="#eaa92b" />
      <g fill="#80d29f">
        <circle cx="262" cy="64" r="3.5" />
        <circle cx="272" cy="76" r="3" opacity="0.7" />
        <circle cx="258" cy="50" r="2.5" opacity="0.6" />
      </g>
      {/* เสียม */}
      <rect x="208" y="120" width="8" height="70" rx="4" fill="#b45309" transform="rotate(-18 212 155)" />
      <path d="M216 180 l24 8 l-6 22 q-16 4 -26 -8Z" fill="#94a3b8" transform="rotate(-18 224 195)" />
    </g>
  );
}
