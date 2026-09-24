import { SiShopee } from "react-icons/si";
import { FaLine, FaFacebookF, FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import { LuGlobe } from "react-icons/lu";
import type { ReactNode, SVGProps } from "react";
import type { PlatformId } from "@/lib/platforms";

// Lazada ไม่มีใน react-icons จึงวาดเป็น SVG เอง
function LazadaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.2 2.6 7.6v8.8L12 21.8l9.4-5.4V7.6L12 2.2Zm0 2.3 7.4 4.2v2.6L12 15.6 4.6 11.3V8.7L12 4.5Zm-7.4 9.1L12 17.9l7.4-4.3v1.6L12 19.5l-7.4-4.3v-1.6Z" />
    </svg>
  );
}

type IconComponent = (props: { className?: string; "aria-hidden"?: boolean }) => ReactNode;

const icons: Record<PlatformId, IconComponent> = {
  shopee: SiShopee,
  lazada: LazadaIcon,
  line: FaLine,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  instagram: FaInstagram,
  website: LuGlobe,
};

type BrandIconProps = { id: PlatformId; className?: string };

export default function BrandIcon({ id, className }: BrandIconProps) {
  const Icon = icons[id];
  return <Icon className={className} aria-hidden />;
}
