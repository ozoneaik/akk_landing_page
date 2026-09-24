import type { Metadata } from "next";
import Logo from "@/components/Logo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "เข้าสู่ระบบ" };

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-3xl bg-white p-7 shadow-[0_20px_50px_-24px_rgba(17,66,42,0.35)] ring-1 ring-brand-100">
          <h1 className="text-xl font-bold text-brand-950">เข้าสู่ระบบหลังบ้าน</h1>
          <p className="mt-1 text-sm text-brand-900/60">จัดการสินค้า ช่องทางติดต่อ และข้อมูลร้าน</p>
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-sm">
          <a href="/" className="text-brand-700 hover:underline">
            ← กลับหน้าเว็บไซต์
          </a>
        </p>
      </div>
    </main>
  );
}
