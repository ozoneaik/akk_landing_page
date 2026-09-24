import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { default: "หลังบ้าน", template: "%s | หลังบ้าน ออฟ กิจเกษตร" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh bg-[#f4f6f3]">{children}</div>;
}
