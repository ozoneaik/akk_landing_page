import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // มี lockfile อื่นอยู่ใน home directory — ระบุ root ให้ชัดเจน
  turbopack: { root: __dirname },
  experimental: {
    // รองรับการอัปโหลดรูปสินค้าไม่เกิน 5MB จากหลังบ้าน
    serverActions: { bodySizeLimit: "6mb" },
  },
};

export default nextConfig;
