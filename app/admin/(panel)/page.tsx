import Link from "next/link";
import { LuArrowRight, LuPackage, LuShare2, LuStore } from "react-icons/lu";
import { PageHeader } from "@/components/admin/ui";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { getSiteInfo } from "@/lib/data";

export default async function DashboardPage() {
  const user = await requireAdmin();
  const [productTotal, productActive, channelTotal, channelActive, site] = await Promise.all([
    db.product.count(),
    db.product.count({ where: { isActive: true } }),
    db.channel.count(),
    db.channel.count({ where: { isActive: true } }),
    getSiteInfo(),
  ]);

  const cards = [
    {
      href: "/admin/products",
      icon: LuPackage,
      title: "สินค้าแนะนำ",
      stat: `${productActive} / ${productTotal}`,
      note: "แสดงอยู่ / ทั้งหมด",
    },
    {
      href: "/admin/channels",
      icon: LuShare2,
      title: "ช่องทางติดต่อ",
      stat: `${channelActive} / ${channelTotal}`,
      note: "แสดงอยู่ / ทั้งหมด",
    },
    {
      href: "/admin/settings",
      icon: LuStore,
      title: "ข้อมูลร้าน",
      stat: site.phone,
      note: site.hours,
    },
  ];

  return (
    <>
      <PageHeader title={`สวัสดี ${user.username} 👋`} description={`จัดการเว็บไซต์ ${site.name}`} />
      <ul className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ href, icon: Icon, title, stat, note }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-2xl bg-white p-5 ring-1 ring-brand-100 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-900/5"
            >
              <span className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <LuArrowRight className="h-4 w-4 text-brand-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600" aria-hidden />
              </span>
              <span className="mt-4 text-sm text-brand-900/60">{title}</span>
              <span className="mt-0.5 truncate text-2xl font-bold text-brand-950">{stat}</span>
              <span className="mt-0.5 truncate text-xs text-brand-900/50">{note}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 rounded-2xl bg-white p-5 text-sm leading-relaxed text-brand-900/70 ring-1 ring-brand-100">
        💡 แก้ไขแล้วหน้าเว็บจะอัปเดตทันที — กด <strong>ดูหน้าเว็บไซต์</strong> ที่เมนูเพื่อตรวจสอบ
      </p>
    </>
  );
}
