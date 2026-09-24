import type { ReactNode } from "react";
import { LuExternalLink, LuLogOut } from "react-icons/lu";
import Logo from "@/components/Logo";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const user = await requireAdmin();

  return (
    <div className="lg:flex">
      <aside className="bg-brand-950 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-64 lg:shrink-0 lg:flex-col">
        <div className="flex items-center justify-between px-4 pt-4 lg:px-5 lg:pt-6">
          <Logo light />
        </div>
        <nav aria-label="เมนูหลังบ้าน" className="px-3 py-3 lg:mt-6 lg:flex-1">
          <AdminNav />
        </nav>
        <div className="hidden space-y-1 border-t border-white/10 p-3 lg:block">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-brand-100/70 transition hover:bg-white/6 hover:text-white"
          >
            <LuExternalLink className="h-4.5 w-4.5" aria-hidden />
            ดูหน้าเว็บไซต์
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-brand-100/70 transition hover:bg-white/6 hover:text-white"
            >
              <LuLogOut className="h-4.5 w-4.5" aria-hidden />
              ออกจากระบบ ({user.username})
            </button>
          </form>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* แถบบนสำหรับมือถือ */}
        <div className="flex items-center justify-end gap-2 border-b border-brand-100 bg-white px-4 py-2 lg:hidden">
          <a href="/" target="_blank" className="rounded-lg px-3 py-1.5 text-sm text-brand-700 hover:bg-brand-50">
            ดูหน้าเว็บ
          </a>
          <form action={logout}>
            <button type="submit" className="rounded-lg px-3 py-1.5 text-sm text-brand-700 hover:bg-brand-50">
              ออกจากระบบ
            </button>
          </form>
        </div>
        <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:py-10">{children}</main>
      </div>
    </div>
  );
}
