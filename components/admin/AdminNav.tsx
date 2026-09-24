"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard, LuPackage, LuShare2, LuStore } from "react-icons/lu";

const items = [
  { href: "/admin", label: "ภาพรวม", icon: LuLayoutDashboard, exact: true },
  { href: "/admin/products", label: "สินค้า", icon: LuPackage },
  { href: "/admin/channels", label: "ช่องทางติดต่อ", icon: LuShare2 },
  { href: "/admin/settings", label: "ข้อมูลร้าน", icon: LuStore },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-1 overflow-x-auto lg:flex-col">
      {items.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <li key={href} className="shrink-0">
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-white/12 text-white" : "text-brand-100/70 hover:bg-white/6 hover:text-white"
              }`}
            >
              <Icon className="h-4.5 w-4.5" aria-hidden />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
