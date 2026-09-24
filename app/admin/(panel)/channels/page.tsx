import type { Metadata } from "next";
import Link from "next/link";
import { LuPencil, LuPlus } from "react-icons/lu";
import BrandIcon from "@/components/BrandIcon";
import { DeleteButton, ToggleButton } from "@/components/admin/buttons";
import { Notice, PageHeader, StatusBadge, primaryButtonClass } from "@/components/admin/ui";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { PLATFORMS, isPlatformId } from "@/lib/platforms";
import { deleteChannel, toggleChannel } from "./actions";

export const metadata: Metadata = { title: "ช่องทางติดต่อ" };

const savedMessages: Record<string, string> = {
  created: "เพิ่มช่องทางเรียบร้อยแล้ว",
  updated: "บันทึกการแก้ไขเรียบร้อยแล้ว",
  deleted: "ลบช่องทางเรียบร้อยแล้ว",
};

export default async function ChannelsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const channels = await db.channel.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });

  return (
    <>
      <PageHeader
        title="ช่องทางสั่งซื้อ & ติดต่อ"
        description="ลิงก์ Shopee, Lazada, LINE, Facebook, TikTok ฯลฯ ที่แสดงบนหน้าเว็บและท้ายเว็บ"
        actions={
          <Link href="/admin/channels/new" className={primaryButtonClass}>
            <LuPlus className="h-4 w-4" aria-hidden />
            เพิ่มช่องทาง
          </Link>
        }
      />
      {saved && savedMessages[saved] && <Notice>{savedMessages[saved]}</Notice>}

      {channels.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center text-brand-900/60 ring-1 ring-brand-100">ยังไม่มีช่องทาง</div>
      ) : (
        <ul className="divide-y divide-brand-100 overflow-hidden rounded-2xl bg-white ring-1 ring-brand-100">
          {channels.map((c) => {
            const platform = isPlatformId(c.platform) ? c.platform : "website";
            return (
              <li key={c.id} className="flex items-center gap-4 p-4">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: PLATFORMS[platform].color }}
                >
                  <BrandIcon id={platform} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/admin/channels/${c.id}`} className="font-semibold text-brand-950 hover:text-brand-700">
                      {c.name}
                    </Link>
                    {c.badge && <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">{c.badge}</span>}
                  </div>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="block truncate text-sm text-brand-900/55 hover:text-brand-700 hover:underline">
                    {c.href}
                  </a>
                  <div className="mt-1 sm:hidden">
                    <StatusBadge active={c.isActive} />
                  </div>
                </div>
                <div className="hidden w-16 sm:block">
                  <StatusBadge active={c.isActive} />
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <ToggleButton action={toggleChannel.bind(null, c.id)} active={c.isActive} />
                  <Link
                    href={`/admin/channels/${c.id}`}
                    aria-label={`แก้ไข ${c.name}`}
                    className="ml-2 grid h-9 w-9 place-items-center rounded-lg text-brand-700 transition hover:bg-brand-50"
                  >
                    <LuPencil className="h-4 w-4" aria-hidden />
                  </Link>
                  <DeleteButton action={deleteChannel.bind(null, c.id)} label={c.name} compact />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
