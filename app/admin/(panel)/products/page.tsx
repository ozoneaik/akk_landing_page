import type { Metadata } from "next";
import Link from "next/link";
import { LuPencil, LuPlus } from "react-icons/lu";
import ProductImage from "@/components/ProductImage";
import { DeleteButton, ToggleButton } from "@/components/admin/buttons";
import { Notice, PageHeader, StatusBadge, primaryButtonClass } from "@/components/admin/ui";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { isProductTheme } from "@/lib/platforms";
import { uploadUrl } from "@/lib/site";
import { deleteProduct, toggleProduct } from "./actions";

export const metadata: Metadata = { title: "สินค้า" };

const savedMessages: Record<string, string> = {
  created: "เพิ่มสินค้าเรียบร้อยแล้ว",
  updated: "บันทึกการแก้ไขเรียบร้อยแล้ว",
  deleted: "ลบสินค้าเรียบร้อยแล้ว",
};

const priceFormat = new Intl.NumberFormat("th-TH");

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  await requireAdmin();
  const { saved } = await searchParams;
  const products = await db.product.findMany({ orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });

  return (
    <>
      <PageHeader
        title="สินค้าแนะนำ"
        description="สินค้าที่แสดงในส่วน “สินค้าแนะนำ” ของหน้าเว็บ"
        actions={
          <Link href="/admin/products/new" className={primaryButtonClass}>
            <LuPlus className="h-4 w-4" aria-hidden />
            เพิ่มสินค้า
          </Link>
        }
      />
      {saved && savedMessages[saved] && <Notice>{savedMessages[saved]}</Notice>}

      {products.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-brand-100">
          <p className="text-brand-900/60">ยังไม่มีสินค้า</p>
          <Link href="/admin/products/new" className={`${primaryButtonClass} mt-4`}>
            เพิ่มสินค้าชิ้นแรก
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-brand-100 overflow-hidden rounded-2xl bg-white ring-1 ring-brand-100">
          {products.map((p) => (
            <li key={p.id} className="flex items-center gap-4 p-4">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg ring-1 ring-brand-100">
                <ProductImage
                  theme={isProductTheme(p.theme) ? p.theme : "chemical"}
                  label={p.name}
                  image={p.imageId ? uploadUrl(p.imageId) : p.imageUrl}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/admin/products/${p.id}`} className="truncate font-semibold text-brand-950 hover:text-brand-700">
                    {p.name}
                  </Link>
                  {p.tag && <span className="rounded-full bg-harvest-400/20 px-2 py-0.5 text-xs text-amber-800">{p.tag}</span>}
                </div>
                <p className="truncate text-sm text-brand-900/60">
                  {p.category} · ฿{priceFormat.format(p.price)} / {p.unit}
                </p>
                <div className="mt-1 sm:hidden">
                  <StatusBadge active={p.isActive} />
                </div>
              </div>
              <div className="hidden w-16 sm:block">
                <StatusBadge active={p.isActive} />
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <ToggleButton action={toggleProduct.bind(null, p.id)} active={p.isActive} />
                <Link
                  href={`/admin/products/${p.id}`}
                  aria-label={`แก้ไข ${p.name}`}
                  className="ml-2 grid h-9 w-9 place-items-center rounded-lg text-brand-700 transition hover:bg-brand-50"
                >
                  <LuPencil className="h-4 w-4" aria-hidden />
                </Link>
                <DeleteButton action={deleteProduct.bind(null, p.id)} label={p.name} compact />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
