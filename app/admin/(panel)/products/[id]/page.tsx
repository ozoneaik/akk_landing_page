import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/admin/buttons";
import { PageHeader } from "@/components/admin/ui";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { isProductTheme } from "@/lib/platforms";
import { uploadUrl } from "@/lib/site";
import ProductForm from "../ProductForm";
import { deleteProduct, saveProduct } from "../actions";

export const metadata: Metadata = { title: "แก้ไขสินค้า" };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id <= 0) notFound();

  const p = await db.product.findUnique({ where: { id } });
  if (!p) notFound();

  return (
    <>
      <PageHeader
        title="แก้ไขสินค้า"
        description={p.name}
        actions={<DeleteButton action={deleteProduct.bind(null, p.id)} label={p.name} />}
      />
      <ProductForm
        action={saveProduct.bind(null, p.id)}
        defaults={{
          name: p.name,
          category: p.category,
          description: p.description,
          price: String(p.price),
          unit: p.unit,
          tag: p.tag ?? "",
          theme: isProductTheme(p.theme) ? p.theme : "chemical",
          imageUrl: p.imageUrl ?? "",
          orderUrl: p.orderUrl ?? "",
          detailUrl: p.detailUrl ?? "",
          sortOrder: String(p.sortOrder),
          isActive: p.isActive,
          currentImage: p.imageId ? uploadUrl(p.imageId) : null,
        }}
      />
    </>
  );
}
